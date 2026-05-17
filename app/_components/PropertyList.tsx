import Image from "next/image";
import Link from "next/link";
import { getImagesByPropertyId } from "../_lib/data-service";
import PropertyActionButton from "./PropertyActionButton";
import { InferSelectModel } from "drizzle-orm";
import { propertiesTable } from "../_lib/db/schema";

type Property = InferSelectModel<typeof propertiesTable>;

export default async function PropertyList({
  property,
}: {
  property: Property;
}) {
  const { id, name, type, city, area } = property;

  const images = await getImagesByPropertyId(id);
  const imageUrl = images?.[0]?.url || "/placeholder.jpg";

  return (
    <div className="grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr] items-center md:grid-cols-[150px_1fr_1fr_1fr_1fr_1fr]">
      <Link href={`/profile/properties/manage/${id}`}>
        <div className="relative aspect-5/4 h-15 overflow-hidden rounded-md md:h-25">
          <Image
            src={imageUrl}
            alt="property pic"
            fill
            className="object-cover"
          />
        </div>
      </Link>

      <p className="ml-5 truncate">{name}</p>
      <p>{type}</p>
      <p className="truncate">{city}</p>
      <p className="hidden truncate md:inline-block">{area}</p>
      <PropertyActionButton propertyId={id} />
    </div>
  );
}
