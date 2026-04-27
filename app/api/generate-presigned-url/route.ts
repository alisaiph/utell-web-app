import { NextRequest, NextResponse } from "next/server";
import { generatePresignedUrl } from "@/app/_lib/r2-upload";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: NextRequest) {
  try {
    const {
      filenames,
      fileSizes,
    }: { filenames: string[]; fileSizes: number[] } = await request.json();

    if (!filenames || filenames.length === 0) {
      return NextResponse.json(
        { error: "Filenames required" },
        { status: 400 },
      );
    }

    if (!fileSizes || fileSizes.length !== filenames.length) {
      return NextResponse.json(
        { error: "File sizes must match filenames" },
        { status: 400 },
      );
    }

    // Validate all file sizes
    const oversizedIndex = fileSizes.findIndex((size) => size > MAX_FILE_SIZE);
    if (oversizedIndex !== -1) {
      return NextResponse.json(
        { error: `File ${oversizedIndex + 1} exceeds 5MB limit` },
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
