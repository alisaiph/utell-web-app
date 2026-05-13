import { AirVent, Tv, Utensils, WashingMachine, Wifi } from "lucide-react";

export default function AmenitiesList({
  amenities,
}: {
  amenities: { id: string; roomId: string; amenityId: string }[];
}) {
  const amenityIconMap: Record<
    string,
    { icon: React.ElementType; label: string }
  > = {
    ac: { icon: AirVent, label: "Air Conditioning" },
    kitchen: { icon: Utensils, label: "Kitchen" },
    laundry: { icon: WashingMachine, label: "Laundry" },
    tv: { icon: Tv, label: "TV" },
    wifi: { icon: Wifi, label: "WiFi" },
  };

  return (
    <ul className="flex flex-wrap gap-3">
      {amenities.map(({ id, amenityId }) => {
        const entry = amenityIconMap[amenityId];
        if (!entry) return null;

        const Icon = entry.icon;
        return (
          <li
            key={id}
            className="flex items-center justify-center gap-4 border-3 border-bg-light p-4 rounded-md "
          >
            <Icon />
            <span>{entry.label}</span>
          </li>
        );
      })}
    </ul>
  );
}
