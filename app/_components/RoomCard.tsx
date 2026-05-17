import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { getImagesByRoomId, getProperty } from "../_lib/data-service";
import { InferSelectModel } from "drizzle-orm";
import { roomsTable } from "../_lib/db/schema";

type Room = InferSelectModel<typeof roomsTable>;

export default async function RoomCard({ room }: { room: Room }) {
  const { id, type, price, propertyId } = room;

  const property = await getProperty(propertyId);
  const { name: propertyName, city, area } = property;

  const images = await getImagesByRoomId(id);
  const imageUrl = images?.[0]?.url || "/placeholder.jpg";

  return (
    <Link href={`/rooms/${id}`}>
      <div className="bg-bg-light border-bg hover:border-bg-dark flex aspect-4/5 h-100 flex-col gap-2 rounded-3xl border-2 p-6 transition-colors md:h-120">
        <div className="relative mb-3 h-100 w-full overflow-hidden rounded-xl">
          <Image
            src={imageUrl}
            fill
            alt="Property image"
            className="object-cover"
          />
        </div>

        <h2 className="text-md font-semibold">
          {`${propertyName} | `}
          <span className="font-normal">{type} Room</span>
        </h2>

        <div className="text-utell-text-lgray text-sm">
          <div className="flex items-center gap-1">
            <MapPin size={15} />
            <p>{`${city}, ${area}`}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-lg">{`MVR ${price} / night`}</h2>
          <ArrowRight color="#fcbf49" size={30} />
        </div>
      </div>
    </Link>
  );
}
