import Image from "next/image";
import { Room } from "../_types/types";
import Link from "next/link";

export default function RoomList({ room }: { room: Room }) {
  return (
    <tr className="border-b-2 border-background-secondary last:border-b-0">
      <td className="py-5">
        <div className="relative w-35 h-25 rounded-xl overflow-hidden">
          <Link href={`/rooms/${room.id}`}>
            <Image
              src="/images/property-card-img.webp"
              alt="room pic"
              fill
              className="object-cover"
            />
          </Link>
        </div>
      </td>

      <td className="py-5">{room.name}</td>
      <td className="py-5">{room.maxCapacity}</td>
      <td className="py-5">{room.price}</td>
      <td className="py-5">Available</td>
    </tr>
  );
}
