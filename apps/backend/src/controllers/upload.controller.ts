import { Request, Response } from "express";
import { randomUUID } from "node:crypto";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../config/s3.js";

const bucketName = process.env.S3_BUCKET_NAME;

export async function createUploadUrl(req: Request, res: Response) {
    try {
        if (!bucketName) {
            return res.status(500).json({
                message: "S3 bucket configuration is missing",
            });
        }

        const { contentType } = req.body;

        if (
            typeof contentType !== "string" ||
            !contentType.startsWith("video/")
        ) {
            return res.status(400).json({
                message: "A valid video contentType is required",
            });
        }

        const videoKey = `videos/${randomUUID()}`;

        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: videoKey,
            ContentType: contentType,
        });

        const presignedUrl = await getSignedUrl(s3Client, command, {
            expiresIn: 900,
        });

        return res.status(200).json({
            presignedUrl,
            videoKey
        });
    } catch (error) {
        console.error("Failed to generate upload URL: ", error);

        return res.status(500).json({
            message: "Failed to generate upload URL",
        });
    }
}
