import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/upload-url", uploadRoutes)

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Voxmend Backend Running",
  });
});

export default app;
