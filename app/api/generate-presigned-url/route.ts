import { NextRequest, NextResponse } from "next/server";
import { generatePresignedUrl } from "@/app/_lib/r2-upload";

export async function POST(request: NextRequest) {
  try {
    const { filenames }: { filenames: string[] } = await request.json();

    if (!filenames || filenames.length === 0) {
      return NextResponse.json(
        { error: "Filenames required" },
        { status: 400 },
      );
    }

    const urls = await Promise.all(
      filenames.map((filename) => generatePresignedUrl(filename)),
    );

    return NextResponse.json({ urls });
  } catch (error) {
    console.error("Error generating presigned URLs:", error);
    return NextResponse.json(
      { error: "Failed to generate URLs" },
      { status: 500 },
    );
  }
}
