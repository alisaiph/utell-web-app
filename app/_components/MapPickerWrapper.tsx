"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";

const MapPicker = dynamic(() => import("./MapPicker"), {
  ssr: false,
  loading: () => (
    <div className="h-100 flex items-center justify-center bg-gray-100 rounded-md">
      Loading map...
    </div>
  ),
});

export default function MapPickerWrapper() {
  const locationInputRef = useRef<HTMLInputElement>(null);

  const handleLocationChange = (lat: number, lng: number) => {
    if (locationInputRef.current) {
      locationInputRef.current.value = `${lat},${lng}`;
    }
  };

  return (
    <>
      <MapPicker onLocationChange={handleLocationChange} />

      {/* Hidden inputs for coordinates */}
      <input
        ref={locationInputRef}
        type="hidden"
        name="location"
        defaultValue="4.174631915331436,73.51031376202452"
      />
    </>
  );
}
