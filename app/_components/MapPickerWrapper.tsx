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

export default function MapPickerWrapper({
  currLocation,
}: {
  currLocation?: string;
}) {
  const locationInputRef = useRef<HTMLInputElement>(null);

  // Parse saved location into [lat, lng] tuple
  const initialPosition: [number, number] = currLocation
    ? (currLocation.split(",").map(Number) as [number, number])
    : [4.174631915331436, 73.51031376202452];

  const handleLocationChange = (lat: number, lng: number) => {
    if (locationInputRef.current) {
      locationInputRef.current.value = `${lat},${lng}`;
    }
  };

  return (
    <>
      <MapPicker
        onLocationChange={handleLocationChange}
        initialPosition={initialPosition}
      />

      {/* Hidden inputs for coordinates */}
      <input
        ref={locationInputRef}
        type="hidden"
        name="location"
        defaultValue={currLocation || "4.174631915331436,73.51031376202452"}
      />
    </>
  );
}
