import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://be.chunmedia.vn";

export async function POST(request: NextRequest) {
  try {
    console.log("API Url:", API_URL);

    const formData = await request.formData();

    // Lấy token từ header (FE gửi lên khi gọi /api/upload)
    const authHeader = request.headers.get("authorization") || "";

    // Forward nguyên formData sang .NET Backend
    const response = await fetch(`${API_URL}/api/upload`, {
      method: "POST",
      body: formData,
      headers: {
        ...(authHeader && { Authorization: authHeader }),
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Upload proxy error:", error);
    return NextResponse.json(
      { success: false, message: "Upload failed" },
      { status: 500 }
    );
  }
}