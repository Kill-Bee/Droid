import { authenticateUser } from "../services/authService.js";

export async function loginController(req, res, next) {
  try {
    const { username, password } = req.body;
    const result = await authenticateUser(username, password);
    res.json(result);
  } catch (err) {
    next(err);
  }
}