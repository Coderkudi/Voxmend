import "dotenv/config";
import dotenv from "dotenv";
console.log("DATABASE_URL =", process.env.DATABASE_URL);
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
