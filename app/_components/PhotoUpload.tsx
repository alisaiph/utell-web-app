"use client";

import { Image, X } from "lucide-react";
import { optimizeImage } from "../_lib/image-optimize";
import { useImageUpload } from "../_hooks/useImageUpload";
import { useMemo } from "react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function PhotoUpload({ propertyId }: { propertyId: string }) {
  const {
    selectedFiles,
    setSelectedFiles,
    uploadedFiles,
    uploading,
    upload,
    deleteImage,
  } = useImageUpload(propertyId);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
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

    if (files.length > 0) {
      await upload(files);
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
                  className="w-full h-32 object-cover rounded-md border-4 border-bg-dark"
                />

                {uploading && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 text-white">
                    <div className="animate-spin h-8 w-8 border-2 border-white border-t-transparent rounded-full" />
                  </div>
                )}

                {!uploading && (
                  <button
                    type="button"
                    onClick={() => deleteImage(index)}
                    className="absolute top-0 right-0 bg-red-700 text-white w-6 h-6 flex items-center justify-center text-xs rounded-sm cursor-pointer"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2">
            <Image size={50} />
            <p className="text-text-muted">
              {uploading ? "Uploading..." : "Click to upload photos"}
            </p>
          </div>
        )}
      </label>

      {/* ONLY ONE hidden input */}
      <input
        type="hidden"
        name="uploadedImages"
        value={JSON.stringify(uploadedFiles)}
      />
    </div>
  );
}
