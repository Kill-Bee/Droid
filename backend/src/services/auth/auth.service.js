import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByUsername, createUser, createMember } from "../../models/auth/auth.model.js";
import {
  ValidationError,
  UnauthorizedError,
  ConflictError,
} from "../../errors/index.js";

export async function login(username, password) {
  // Validasi input
  if (!username || !password) {
    throw new ValidationError("Username dan password harus diisi");
  }

  const user = await findUserByUsername(username);
  if (!user) {
    throw new UnauthorizedError("Username atau password salah");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    throw new UnauthorizedError("Username atau password salah");
  }

  const payload = {
    id: user.id,
    username: user.username,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
  return {
    token,
    user: {
      id: user.id,
      username: user.username,
    },
  };
}

export async function register(username, password, memberData = {}) {
  // Validasi input
  if (!username || !password) {
    throw new ValidationError("Username dan password harus diisi");
  }

  if (username.length < 3) {
    throw new ValidationError("Username minimal 3 karakter");
  }

  if (password.length < 6) {
    throw new ValidationError("Password minimal 6 karakter");
  }

  const existingUser = await findUserByUsername(username);
  if (existingUser) {
    throw new ConflictError("Username sudah digunakan");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await createUser(username, passwordHash);

  const member = await createMember(user.id, {
    displayName: memberData.displayName || username,
    avatar: null,
    badge: null,
    banner: null,
    bio: null,
  });

  return { user, member };
}
