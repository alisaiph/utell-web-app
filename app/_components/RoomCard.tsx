import Image from "next/image";
import { Room } from "../_types/types";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { getImagesByRoomId, getProperty } from "../_lib/data-service";

export default async function RoomCard({ room }: { room: Room }) {
  const { id, name: roomName, price, propertyId } = room;

  const property = await getProperty(propertyId);
  const { name: propertyName, city, area } = property;

  const images = await getImagesByRoomId(id);
  const imageUrl = images?.[0]?.imageUrl || "/placeholder.jpg";

  return (
    <Link href={`/rooms/${id}`}>
      <div className="flex flex-col bg-bg-light border-2 border-bg hover:border-bg-dark transition-colors w-98 h-120 rounded-3xl p-6 gap-2">
        <div className="relative w-full rounded-xl h-100 overflow-hidden mb-3">
          <Image
            src={imageUrl}
            fill
            alt="Property image"
            className="object-cover"
          />
        </div>

        <h2 className="text-md font-semibold">
          {`${propertyName} | `}
          <span className="font-normal">{roomName}</span>
        </h2>

        <div className="text-sm text-utell-text-lgray">
          <div className="flex items-center gap-1">
            <MapPin size={15} />
            <p>{`${city}, ${area}`}</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <h2 className="text-lg">{`MVR ${price} / night`}</h2>
          <ArrowRight color="#fcbf49" size={30} />
        </div>
      </div>
    </Link>
  );
}
