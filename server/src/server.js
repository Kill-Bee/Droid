import "dotenv/config";
import { buildApp } from "./app.js";

const app = buildApp();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
