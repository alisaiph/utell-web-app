import Image from "next/image";
import { Booking } from "../_types/types";
import Link from "next/link";
import { getRoom } from "../_lib/data-service";

export default async function BookingList({ booking }: { booking: Booking }) {
  const {
    userId,
    roomId,
    checkinDate,
    checkoutDate,
    numGuests,
    extrasPrice,
    totalPrice,
    status,
  } = booking;

  const { name: roomName } = await getRoom(roomId);

  return (
    <tr className="border-b-2 border-background-secondary last:border-b-0">
      <td className="py-5">
        <div className="relative w-35 h-25 rounded-xl overflow-hidden">
          <Link href={`/rooms/${roomId}`}>
            <Image
              src="/images/property-card-img.webp"
              alt="room pic"
              fill
              className="object-cover"
            />
          </Link>
        </div>
      </td>

      <td className="py-5">{roomName}</td>
      <td className="py-5">{checkinDate.slice(0, 10)}</td>
      <td className="py-5">{checkoutDate.slice(0, 10)}</td>
      <td className="py-5">{numGuests}</td>
      <td className="py-5">{extrasPrice}</td>
      <td className="py-5">{totalPrice}</td>
      <td className="py-5">{status}</td>
    </tr>
  );
}
