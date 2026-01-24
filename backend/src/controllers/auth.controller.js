import { login, register } from "../services/auth.service.js";

export async function loginController(req, res, next) {
  try {
    const { username, password } = req.body;
    const result = await login(username, password);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function registerController(req, res, next) {
  try {
    const { username, password, avatar } = req.body;
    const user = await register(username, password, avatar);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    next(err);
  }
}
