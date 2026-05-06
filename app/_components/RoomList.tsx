import Image from "next/image";
import { Room } from "../_types/types";
import Link from "next/link";
import { getAmenitiesByRoomId, getImagesByRoomId } from "../_lib/data-service";
import FormActionButton from "./FormActionButton";

export default async function RoomList({ room }: { room: Room }) {
  const { id, name, price, guests } = room;

  const amenities = await getAmenitiesByRoomId(id);
  const images = await getImagesByRoomId(id);
  const imageUrl = images?.[0]?.imageUrl || "/placeholder.jpg";

  return (
    <div className="grid grid-cols-[150px_1fr_1fr_1fr_1fr_1fr] items-center">
      <Link href={`/rooms/${id}`}>
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
      <div>
        {amenities.map((amenity) => (
          <p key={amenity.amenityId}>{amenity.amenityId}</p>
        ))}
      </div>
      <p>{price}</p>
      <p>{guests}</p>
      <FormActionButton room={room} />
    </div>
  );
}
