import { S3Client } from "@aws-sdk/client-s3";


const endpoint = process.env.S3_ENDPOINT;
const region = process.env.S3_REGION;
const accessKeyId = process.env.S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;

if (!endpoint || !region || !accessKeyId || !secretAccessKey) {
    throw new Error("Missing required S3 environment variables");
}

const credentials = {
    accessKeyId,
    secretAccessKey,
};

export const s3Client = new S3Client({
    endpoint,
    region,
    forcePathStyle: true,
    requestChecksumCalculation: "WHEN_REQUIRED",
    credentials,
});
