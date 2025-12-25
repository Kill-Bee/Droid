import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByUsername } from "../models/authModel.js";

export async function authenticateUser(username, password) {
  const user = await findUserByUsername(username);
  if (!user) throw new Error("User not found");

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) throw new Error("Invalid password");

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
  return { user, token };
}
