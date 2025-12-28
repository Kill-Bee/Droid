import { login, register } from "../services/authService.js";

export async function loginController(req, res, next) {
  try {
    const { username, password } = req.body;
    const result = await login(username, password);
    res.json({ result });
  } catch (err) {
    next(err);
  }
}

export async function registerController(req, res, next) {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) return res.status(400).json({ message: "Username and password are required" });
    
    const user = await register(username, password);
    
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    next(err);
  }
}
