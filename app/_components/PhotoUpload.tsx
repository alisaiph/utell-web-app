"use client";

import { Image, X } from "lucide-react";
import { useImageUpload } from "../_hooks/useImageUpload";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function PhotoUpload({
  prefix,
  currImages,
}: {
  prefix: string;
  currImages?: { url: string; key: string }[]; // match UploadedFile type
}) {
  const {
    selectedFiles,
    uploadedFiles,
    setUploadedFiles,
    uploading,
    deleting,
    upload,
    deleteImage,
  } = useImageUpload(prefix);

  // Seed current images into the hook's state on mount
  useEffect(() => {
    if (currImages && currImages.length > 0) {
      console.log(currImages);
      setUploadedFiles(currImages);
    }
  }, []);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.target.files || []);
    const totalAfterUpload = uploadedFiles.length + files.length; // check if combined total exceeds limit

    if (totalAfterUpload > 3) {
      alert("You can only upload up to 3 photos.");
      return;
    }

    const oversized = files.filter((file) => file.size > MAX_FILE_SIZE);
    if (oversized.length > 0) {
      alert("Each image must be 5MB or smaller.");
      return;
    }

    if (totalAfterUpload <= 3) {
      await upload(files);
    }
  };

  return (
    <div>
      <label htmlFor="photos" className="font-semibold text-lg mb-3 block">
        Photos
      </label>

      {/* PHOTO UPLOAD AREA */}
      <input
        type="file"
        name="photos"
        accept="image/*"
        multiple
        disabled={
          uploadedFiles.length >= 3 || selectedFiles.length >= 3 || uploading
        }
        onChange={handleFileChange}
        className="hidden"
        id="photo-input"
      />

      <label
        htmlFor="photo-input"
        className="flex flex-col items-center justify-center gap-2 relative bg-bg border-3 border-dashed border-bg-dark hover:bg-bg-dark/30 transition-colors rounded-md w-full px-10 py-10 cursor-pointer"
      >
        {/* LOADING SPINNER */}
        {(uploading || deleting) && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 rounded-md">
            <Spinner />
          </div>
        )}
        {uploadedFiles.length > 0 || selectedFiles.length > 0 ? (
          <div className="flex gap-4 flex-wrap">
            {/* ALL images — existing and newly uploaded, unified in one list */}
            {uploadedFiles.map((file, index) => (
              <div key={file.key ?? index} className="relative">
                <img
                  src={file.url}
                  className="aspect-square h-24 object-cover rounded-md border-4 border-bg-dark"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteImage(index);
                  }}
                  className="absolute top-0 right-0 bg-red-700 text-white w-6 h-6 flex items-center justify-center text-xs rounded-sm cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>
            ))}

            {/* In-progress files (before upload finishes) */}
            {selectedFiles
              .filter((_, i) => i >= uploadedFiles.length) // only truly pending ones
              .map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    className="aspect-square h-24 object-cover rounded-md border-4 border-bg-dark"
                  />
                </div>
              ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2">
            <Image size={50} color="var(--bg-light)" />
            <p className="text-text-muted">Click to upload photos</p>
          </div>
        )}
      </label>

      <input
        type="hidden"
        name="uploadedImages"
        value={JSON.stringify(uploadedFiles)}
      />
    </div>
  );
}
