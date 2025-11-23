import Image from "next/image";
import { Property } from "../_types/types";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

export default function PropertyCard({ property }: { property: Property }) {
  const { id, name, city, area, type } = property;

  return (
    <Link href={`/properties/${id}`}>
      <div className="flex flex-col bg-white w-98 h-120 rounded-3xl p-6 gap-2">
        <div className="relative w-full rounded-xl h-100 overflow-hidden mb-3">
          <Image
            src={"/images/property-card-img.webp"}
            fill
            alt="Property image"
            className="object-cover"
          />
        </div>

        <h2 className="text-md font-bold">{name}</h2>

        <div className="text-sm text-utell-text-lgray">
          <div className="flex items-center gap-1">
            <MapPin size={15} />
            <p>{`${city}, ${area}`}</p>
          </div>

          <div className="flex justify-between items-center mt-1">
            <p className="font-bold">{type}</p>
            <ArrowRight color="#fcbf49" size={30} />
          </div>
        </div>
      </div>
    </Link>
  );
}
