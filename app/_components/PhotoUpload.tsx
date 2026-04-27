"use client";

import { useState } from "react";
import { Image, X } from "lucide-react";
import { optimizeImage } from "../_lib/image-optimize";

export default function PhotoUpload() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    const files = Array.from(event.target.files || []);

    if (files.length > 3) {
      alert("You can only upload up to 3 photos.");
      return;
    }

    const oversized = files.filter((file) => file.size > MAX_FILE_SIZE);
    if (oversized.length > 0) {
      alert("Each image must be 5MB or smaller.");
      return;
    }

    setSelectedFiles(files);

    if (files.length > 0) {
      await uploadFiles(files);
    }
  };

  const uploadFiles = async (files: File[]) => {
    setUploading(true);
    try {
      // Optimize images to WebP
      const optimizedFiles = await Promise.all(files.map(optimizeImage));

      // Generate unique filenames
      const filenames = optimizedFiles.map(
        (file, index) => `properties/${Date.now()}-${index}-${file.name}`,
      );

      const fileSizes = optimizedFiles.map((file) => file.size);

      // Fetch presigned URLs
      const response = await fetch("/api/generate-presigned-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filenames,
          fileSizes,
        }),
      });

      if (!response.ok) throw new Error("Failed to get presigned URLs");

      const { urls } = await response.json();

      // Upload each file to its presigned URL
      const uploadPromises = optimizedFiles.map(async (file, index) => {
        const url = urls[index];
        const uploadResponse = await fetch(url, {
          method: "PUT",
          body: file,
          headers: { "Content-Type": file.type },
        });

        if (!uploadResponse.ok)
          throw new Error(`Upload failed for ${file.name}`);

        // Return the public URL (construct from bucket and filename)
        return `https://${process.env.NEXT_PUBLIC_R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${filenames[index]}`;
      });

      const publicUrls = await Promise.all(uploadPromises);
      setUploadedUrls(publicUrls);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label htmlFor="photos" className="font-semibold text-lg mb-3 block">
        Photos
      </label>

      <input
        type="file"
        name="photos"
        accept="image/*"
        multiple
        required
        onChange={handleFileChange}
        className="hidden"
        id="photo-input"
      />

      <label
        htmlFor="photo-input"
        className="flex flex-col items-center justify-center gap-2 bg-bg border-3 border-dashed border-bg-dark hover:bg-bg-dark/30 transition-colors rounded-md w-full px-10 py-10 cursor-pointer"
      >
        {selectedFiles.length > 0 ? (
          <div className="flex gap-4">
            {selectedFiles.map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-md border-4 border-bg-dark "
                />

                {uploading && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-md bg-black/50 text-white">
                    <div className="animate-spin rounded-full border-2 border-white border-t-transparent h-8 w-8 mb-2" />
                  </div>
                )}

                {!uploading && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFiles(
                        selectedFiles.filter((_, i) => i !== index),
                      );
                      setUploadedUrls(
                        uploadedUrls.filter((_, i) => i !== index),
                      );
                    }}
                    className="absolute top-0 right-0 bg-red-700 text-white rounded-sm w-6 h-6 flex items-center justify-center text-xs"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2">
            <Image color="var(--bg-dark)" size={50} />
            <p className="text-text-muted">
              {uploading ? "Uploading..." : "Click to upload photos"}
            </p>
          </div>
        )}
      </label>

      {/* Hidden inputs for uploaded URLs */}
      {uploadedUrls.map((url, index) => (
        <input
          key={index}
          type="hidden"
          name={`imageUrl${index}`}
          value={url}
        />
      ))}
    </div>
  );
}
