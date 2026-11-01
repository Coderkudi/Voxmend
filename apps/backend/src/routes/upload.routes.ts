import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createUploadUrl } from "../controllers/upload.controller.js";

const router = Router();

router.post("/", authMiddleware, createUploadUrl);

export default router;
