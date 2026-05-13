"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

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
  readOnly = false,
}: {
  currLocation?: string;
  readOnly?: boolean;
}) {
  const defaultCoords = "4.174631915331436,73.51031376202452";
  const [location, setLocation] = useState<string>(
    currLocation || defaultCoords,
  );

  // Parse saved location into [lat, lng] tuple
  const initialPosition: [number, number] = currLocation
    ? (currLocation.split(",").map(Number) as [number, number])
    : [4.174631915331436, 73.51031376202452];

  const handleLocationChange = (lat: number, lng: number) => {
    setLocation(`${lat},${lng}`);
  };

  return (
    <>
      <MapPicker
        onLocationChange={handleLocationChange}
        initialPosition={initialPosition}
        readOnly={readOnly}
      />

      {/* Hidden inputs for coordinates */}
      <input
        type="hidden"
        name="location"
        value={location}
        onChange={() => {}} // suppress React controlled input warning
      />
    </>
  );
}
