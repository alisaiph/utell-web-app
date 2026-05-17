import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { getImagesByPropertyId } from "../_lib/data-service";
import { propertiesTable } from "../_lib/db/schema";
import { InferSelectModel } from "drizzle-orm";

type Property = InferSelectModel<typeof propertiesTable>;

export default async function PropertyCard({
  property,
}: {
  property: Property;
}) {
  const { id, name, city, area, type } = property;
  const images = await getImagesByPropertyId(id);
  const imageUrl = images?.[0]?.url || "/placeholder.jpg";

  return (
    <Link href={`/properties/${id}`}>
      <div className="bg-bg-light border-bg-light hover:border-bg-dark flex h-120 w-98 flex-col gap-2 rounded-3xl border-2 p-5 transition-colors">
        <div className="relative mb-3 h-100 w-full overflow-hidden rounded-xl">
          <Image
            src={imageUrl}
            fill
            alt="Property image"
            className="object-cover"
          />
        </div>

        <h2 className="text-md font-semibold">{name}</h2>

        <div className="text-utell-text-lgray text-sm">
          <div className="flex items-center gap-1">
            <MapPin size={15} />
            <p>{`${city}, ${area}`}</p>
          </div>

          <div className="mt-1 flex items-center justify-between">
            <p className="font-semibold">{type}</p>
            <ArrowRight color="#fcbf49" size={30} />
          </div>
        </div>
      </div>
    </Link>
  );
}
