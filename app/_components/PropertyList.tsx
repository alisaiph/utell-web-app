import Image from "next/image";
import { Property } from "../_types/types";
import Link from "next/link";
import { getImagesByPropertyId } from "../_lib/data-service";
import FormActionButton from "./FormActionButton";

export default async function PropertyList({
  property,
}: {
  property: Property;
}) {
  const { id, name, type, city, area } = property;

  const image = await getImagesByPropertyId(id);
  const imageUrl = image?.[0]?.imageUrl || "/placeholder.jpg";

  return (
    <div className="grid grid-cols-[150px_1fr_1fr_1fr_1fr_1fr] items-center">
      <Link href={`/profile/properties/manage/${id}`}>
        <div className=" relative w-35 h-25 rounded-md overflow-hidden">
          <Image
            src={imageUrl}
            alt="property pic"
            fill
            className="object-cover"
          />
        </div>
      </Link>

      <p className="truncate ml-5">{name}</p>
      <p>{type}</p>
      <p className="truncate">{city}</p>
      <p className="truncate">{area}</p>
      <FormActionButton propertyId={id} />
    </div>
  );
}
