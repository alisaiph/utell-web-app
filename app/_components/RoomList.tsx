import Image from "next/image";
import { Property } from "../_types/types";
import Link from "next/link";
import { getImagesByPropertyId } from "../_lib/data-service";
import FormActionButton from "./FormActionButton";

export default async function RoomList({ room }: { room: Room }) {
  const { id, name, facilities, price, capacity } = room;

  const image = await getImagesByPropertyId(id);
  const imageUrl = image?.[0]?.imageUrl || "/placeholder.jpg";

  return (
    <div className="grid grid-cols-[150px_1fr_1fr_1fr_1fr_1fr] items-center">
      <Link href={`/rooms/${id}`}>
        <div className=" relative w-35 h-25 rounded-md overflow-hidden">
          <Image
            src="/images/property-card-img.webp"
            alt="property pic"
            fill
            className="object-cover"
          />
        </div>
      </Link>

      <p className="truncate ml-5">{name}</p>
      <p>{facilities}</p>
      <p className="truncate">{price}</p>
      <p className="truncate">{capacity}</p>
      <FormActionButton />
    </div>
  );
}
