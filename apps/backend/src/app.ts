import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Voxmend Backend Running",
  });
});

export default app;
