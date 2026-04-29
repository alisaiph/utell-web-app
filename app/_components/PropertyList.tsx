import Image from "next/image";
import { Property } from "../_types/types";
import Link from "next/link";
import { getImagesByPropertyId } from "../_lib/data-service";
import { EllipsisVertical } from "lucide-react";

export default async function PropertyList({
  property,
}: {
  property: Property;
}) {
  const { id, name, type, city, area } = property;

  const image = await getImagesByPropertyId(id);
  const imageUrl = image?.[0]?.imageUrl || "/placeholder.jpg";

  return (
    <Link href={`/properties/${id}`}>
      <div className="grid grid-cols-[150px_1fr_1fr_1fr_1fr_1fr] items-center">
        <div className=" relative w-35 h-25 rounded-md overflow-hidden">
          <Image
            src={imageUrl}
            alt="property pic"
            fill
            className="object-cover"
          />
        </div>

        <p className="truncate ml-5">{name}</p>
        <p>{type}</p>
        <p className="truncate">{city}</p>
        <p className="truncate">{area}</p>
        <button className="p-2 w-10 rounded-md hover:bg-bg transition-colors cursor-pointer">
          <EllipsisVertical />
        </button>
      </div>
    </Link>
  );
}
