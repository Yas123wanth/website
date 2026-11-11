import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

function getClient() {
  const endpoint = process.env.S3_ENDPOINT;
  return new S3Client({
    region: process.env.AWS_REGION ?? "ap-south-1",
    credentials:
      process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
        ? {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          }
        : undefined,
    ...(endpoint ? { endpoint, forcePathStyle: true } : {}),
  });
}

export async function getSignedDownloadUrl(
  fileKey: string,
  expiresInSeconds = 3600,
): Promise<string | null> {
  const bucket = process.env.S3_BUCKET;
  if (!bucket || !fileKey || !process.env.AWS_ACCESS_KEY_ID) {
    return null;
  }
  const client = getClient();
  const command = new GetObjectCommand({ Bucket: bucket, Key: fileKey });
  return getSignedUrl(client, command, { expiresIn: expiresInSeconds });
}

export async function uploadDesignFile(
  key: string,
  body: Buffer,
  contentType = "application/zip",
): Promise<boolean> {
  const bucket = process.env.S3_BUCKET;
  if (!bucket || !process.env.AWS_ACCESS_KEY_ID) return false;
  const client = getClient();
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    }),
  );
  return true;
}
