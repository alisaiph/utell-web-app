"use client";

import { useState } from "react";
import { optimizeImage } from "../_lib/image-optimize";

type UploadedFile = {
  url: string;
  key: string;
};

export function useImageUpload(propertyId: string) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);

  // UPLOAD
  const upload = async (files: File[]) => {
    setUploading(true);

    try {
      // 1. Optimize images
      const optimizedFiles = await Promise.all(files.map(optimizeImage));

      // 2. Create unique R2 filenames
      const filenames = optimizedFiles.map(
        () => `property-images/${propertyId}/${crypto.randomUUID()}`,
      );

      const fileSizes = optimizedFiles.map((f) => f.size);

      // 3. Get presigned URLs, so we can upload directly
      const res = await fetch("/api/generate-presigned-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filenames,
          fileSizes,
        }),
      });

      if (!res.ok) throw new Error("Failed to get presigned URLs");

      const { urls } = await res.json();

      // 4. Upload to R2
      const uploaded = await Promise.all(
        optimizedFiles.map(async (file, index) => {
          const url = urls[index];

          const uploadRes = await fetch(url, {
            method: "PUT",
            body: file,
            headers: { "Content-Type": file.type },
          });

          if (!uploadRes.ok) {
            throw new Error(`Upload failed: ${file.name}`);
          }

          return {
            url: `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${filenames[index]}`,
            key: filenames[index],
          };
        }),
      );

      // 5. Update state
      setUploadedFiles((prev) => [...prev, ...uploaded]);
      setSelectedFiles((prev) => [...prev, ...files]);
    } catch (err) {
      console.error("Upload error:", err);
      throw err;
    } finally {
      setUploading(false);
    }
  };

  // DELETE
  const deleteImage = async (index: number) => {
    const file = uploadedFiles[index];

    if (file) {
      try {
        await fetch("/api/delete-property-pic", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ key: file.key }),
        });
      } catch (err) {
        console.error("Failed to delete image:", err);
      }
    }

    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));

    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    selectedFiles,
    uploadedFiles,
    uploading,

    setSelectedFiles,
    setUploadedFiles,
    setUploading,

    upload,
    deleteImage,
  };
}
