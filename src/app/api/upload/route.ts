// src/app/api/upload/route.ts

import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const slug = formData.get("slug") as string || "images";

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file uploaded" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: "Invalid file type" },
        { status: 400 }
      );
    }

    // Validate file size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: "File too large (max 2MB)" },
        { status: 400 }
      );
    }

    // Generate path: {slug}/{year}/{month}/{day}
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    // Generate unique filename: timestamp_originalname
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_"); // Sanitize filename
    const fileName = `${timestamp}_${originalName}`;

    // Full directory path
    const dirPath = path.join(process.cwd(), "public", "upload", slug, String(year), month, day);
    
    // Create directory if not exists
    await mkdir(dirPath, { recursive: true });

    // Full file path
    const filePath = path.join(dirPath, fileName);

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Return relative path for DB storage
    const relativePath = `/upload/${slug}/${year}/${month}/${day}/${fileName}`;

    return NextResponse.json({
      success: true,
      message: "Upload successful",
      url: relativePath,
      fileName: fileName,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: "Upload failed" },
      { status: 500 }
    );
  }
}