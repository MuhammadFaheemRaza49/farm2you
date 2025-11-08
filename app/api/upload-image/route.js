import cloudinary from "../../../lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "No file received" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Convert buffer upload to Promise style for Cloudinary
  const uploadPromise = () =>
    new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "farm2you" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(buffer); // IMPORTANT
    });

  const uploadResult = await uploadPromise();
  return NextResponse.json(uploadResult);
}
