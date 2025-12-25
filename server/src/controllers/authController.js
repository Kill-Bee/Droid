export async function loginController(req, res, next) {
  try {
    const { username, password } = req.body;
    const result = await login(username, password);
    res.json(result);
  } catch (err) {
    next(err);
  }
}