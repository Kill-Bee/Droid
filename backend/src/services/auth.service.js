import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByUsername, createUser } from "../models/auth.model.js";

export async function login(username, password) {
  const user = await findUserByUsername(username);
  if (!user) throw new Error("User not found");

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) throw new Error("Invalid password");

  const payload = {
    id: user.id,
    username: user.username,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  return {
    token,
    user: {
      id: user.id,
      username: user.username,
    },
  };
}

export async function register(username, password) {
  const existingUser = await findUserByUsername(username);

  if (existingUser) throw new Error("Username already exists");

  const passwordHash = await bcrypt.hash(password, 10);

  return await createUser(username, passwordHash);
}
