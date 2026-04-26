"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { useState } from "react";

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Component to handle map clicks
function LocationMarker({
  position,
  setPosition,
}: {
  position: [number, number];
  setPosition: (pos: [number, number]) => void;
}) {
  const map = useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position === null ? null : (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const marker = e.target;
          const newPos = marker.getLatLng();
          setPosition([newPos.lat, newPos.lng]);
        },
      }}
    >
      <Popup>
        Location: {position[0].toFixed(6)}, {position[1].toFixed(6)}
      </Popup>
    </Marker>
  );
}

interface MapPickerProps {
  onLocationChange?: (lat: number, lng: number) => void;
  initialPosition?: [number, number];
}

export default function MapPicker({
  onLocationChange,
  initialPosition = [4.174631915331436, 73.51031376202452],
}: MapPickerProps) {
  const [position, setPosition] = useState<[number, number]>(initialPosition);

  // Update hidden inputs when position changes
  const handlePositionChange = (newPosition: [number, number]) => {
    setPosition(newPosition);
    onLocationChange?.(newPosition[0], newPosition[1]);
  };

  return (
    <div className="h-60 w-full rounded-md overflow-hidden">
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png" />
        <LocationMarker position={position} setPosition={handlePositionChange}>
          <Popup>You are here.</Popup>
        </LocationMarker>
      </MapContainer>
    </div>
  );
}
