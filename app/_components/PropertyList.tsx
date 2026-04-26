import Image from "next/image";
import { Property } from "../_types/types";
import Link from "next/link";
import { getProperty } from "../_lib/data-service";

export default async function PropertyList({
  property,
}: {
  property: Property;
}) {
  const { id, area, city, type } = property;

  const { name: propertyName } = await getProperty(id);

  return (
    <tr className="border-b-2 border-bg-dark last:border-b-0">
      <td className="py-5">
        <div className="relative w-35 h-25 rounded-xl overflow-hidden">
          <Link href={`/properties/${id}`}>
            <Image
              src="/images/property-card-img.webp"
              alt="property pic"
              fill
              className="object-cover"
            />
          </Link>
        </div>
      </td>

      <td className="py-5">{propertyName}</td>
      <td className="py-5">{area}</td>
      <td className="py-5">{city}</td>
      <td className="py-5">{type}</td>
    </tr>
  );
}
