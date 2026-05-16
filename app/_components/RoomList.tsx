import Image from "next/image";
import { Room } from "../_types/types";
import Link from "next/link";
import { getAmenitiesByRoomId, getImagesByRoomId } from "../_lib/data-service";
import RoomActionButton from "./RoomActionButton";

export default async function RoomList({
  room,
  propertyId,
}: {
  room: Room;
  propertyId: string;
}) {
  const { id, name, price, guests } = room;

  const amenities = await getAmenitiesByRoomId(id);
  const currImages = await getImagesByRoomId(id);
  const imageUrl = currImages?.[0]?.url || "/placeholder.jpg";

  return (
    <div className="grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr] items-center md:grid-cols-[150px_1fr_1fr_1fr_1fr_1fr]">
      <Link href={`/rooms/${id}`}>
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

      <div>
        {amenities.map((amenity) => (
          <p key={amenity.amenityId}>{amenity.amenityId}</p>
        ))}
      </div>

      <p>{price}</p>
      <p>{guests}</p>

      <RoomActionButton
        room={room}
        propertyId={propertyId}
        currImages={currImages}
        amenities={amenities}
      />
    </div>
  );
}
