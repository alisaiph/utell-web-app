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
  readOnly = false,
}: {
  position: [number, number];
  setPosition: (pos: [number, number]) => void;
  readOnly?: boolean;
}) {
  const map = useMapEvents({
    click(e) {
      if (!readOnly) setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position === null ? null : (
    <Marker
      key={readOnly ? "readonly" : "editable"} // force remount when readOnly changes
      position={position}
      draggable={!readOnly}
      eventHandlers={
        !readOnly
          ? {
              dragend: (e) => {
                const marker = e.target;
                const newPos = marker.getLatLng();
                setPosition([newPos.lat, newPos.lng]);
              },
            }
          : {}
      }
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
  readOnly?: boolean;
}

export default function MapPicker({
  onLocationChange,
  initialPosition = [4.174631915331436, 73.51031376202452],
  readOnly = false,
}: MapPickerProps) {
  const [position, setPosition] = useState<[number, number]>(initialPosition);

  // Update hidden inputs when position changes
  const handlePositionChange = (newPosition: [number, number]) => {
    setPosition(newPosition);
    onLocationChange?.(newPosition[0], newPosition[1]);
  };

  return (
    <div className="h-80 w-full rounded-md overflow-hidden">
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png" />

        {readOnly ? (
          // Plain static marker — no dragging, no click events
          <Marker position={position}>
            <Popup>You will stay here.</Popup>
          </Marker>
        ) : (
          <LocationMarker
            position={position}
            setPosition={handlePositionChange}
          />
        )}
      </MapContainer>
    </div>
  );
}
