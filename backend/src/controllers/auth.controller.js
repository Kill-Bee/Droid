import { login, register } from "../services/auth.service.js";

export async function loginController(req, res, next) {
  try {
    const { username, password } = req.body;

    const result = await login(username, password);

    if (!result) {
      return res.status(401).json({
        message: "Username atau password salah",
      });
    }

    res.json(result);
  } catch (err) {
    next(err); // hanya error teknis
  }
}

export async function registerController(req, res, next) {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res
        .status(400)
        .json({ message: "Username and password are required" });

    const user = await register(username, password);

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    next(err);
  }
}
