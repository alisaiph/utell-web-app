import Image from "next/image";
import { Property } from "../_types/types";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { getImagesByPropertyId } from "../_lib/data-service";

export default async function PropertyCard({
  property,
}: {
  property: Property;
}) {
  const { id, name, city, area, type } = property;
  const images = await getImagesByPropertyId(id);

  return (
    <Link href={`/properties/${id}`}>
      <div className="flex flex-col bg-bg-light border-2 border-bg-light hover:border-bg-dark w-98 h-120 rounded-3xl p-5 gap-2 transition-colors">
        <div className="relative w-full rounded-xl h-100 overflow-hidden mb-3">
          <Image
            src={images?.[0]?.imageUrl || "/placeholder.jpg"}
            fill
            alt="Property image"
            className="object-cover"
          />
        </div>

        <h2 className="text-md font-semibold">{name}</h2>

        <div className="text-sm text-utell-text-lgray">
          <div className="flex items-center gap-1">
            <MapPin size={15} />
            <p>{`${city}, ${area}`}</p>
          </div>

          <div className="flex justify-between items-center mt-1">
            <p className="font-semibold">{type}</p>
            <ArrowRight color="#fcbf49" size={30} />
          </div>
        </div>
      </div>
    </Link>
  );
}
