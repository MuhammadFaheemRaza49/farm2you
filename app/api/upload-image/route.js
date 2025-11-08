import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file"); 

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const uploadResult = await cloudinary.uploader.upload_stream(
    { folder: "farm2you" },
    (error, result) => {
      if (error) throw error;
      return result;
    }
  );

  return NextResponse.json(uploadResult);
}
