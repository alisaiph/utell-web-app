import AddRoomDialog from "@/app/_components/AddRoomDialog";
import OverviewCard from "@/app/_components/OverviewCard";
import PropertyList from "@/app/_components/PropertyList";
import RoomList from "@/app/_components/RoomList";
import {
  getPropertiesByUserId,
  getProperty,
  getPropertyByOwner,
  getRoomsByPropertyId,
} from "@/app/_lib/data-service";
import getServerSession from "@/app/_lib/get-session";
import {
  BedDouble,
  CalendarCheck,
  CalendarPlus2,
  CalendarX,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function page({
  params,
}: {
  params: { propertyId: string };
}) {
  const { propertyId } = await params;

  const session = await getServerSession();
  const user = session?.user;

  if (!user?.id) {
    throw new Error("User not authenticated");
  }

  const property = await getPropertyByOwner(propertyId, user.id);

  if (!property) {
    notFound();
  }

  const { name: propertyName } = property;

  const allRooms = await getRoomsByPropertyId(propertyId);

  return (
    <div className="flex flex-col gap-10 md:flex-row">
      <div className="flex basis-2/3 flex-col gap-5">
        <h2 className="text-xl font-semibold">{propertyName} Rooms</h2>

        <div className="bg-bg-light/50 flex flex-col gap-5 rounded-2xl px-4 py-2">
          <div className="grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr] items-center font-semibold md:grid-cols-[150px_1fr_1fr_1fr_1fr_1fr]">
            <p></p>
            <p className="ml-5">Name</p>
            <p>Amenities</p>
            <p>Price</p>
            <p>Guests</p>
          </div>
        </div>

        {allRooms.length > 0 ? (
          allRooms?.map((room) => (
            <div
              className="bg-bg-light border-bg hover:border-bg-dark rounded-2xl border-2 p-4 transition-colors"
              key={room.name}
            >
              <RoomList room={room} propertyId={propertyId} key={room.name} />
            </div>
          ))
        ) : (
          <p className="text-text-muted">No rooms in this property yet 🥲</p>
        )}

        {/* GUESTS */}
        {/* <div className="bg-bg-light flex flex-col gap-5 p-8 rounded-2xl">
          <h2 className="text-xl font-semibold">Guests</h2>

          <p>
            All the bookings for the properties owned by this user here, or
            specific property bookings can be displayed here.
          </p>
        </div> */}
      </div>

      {/* SIDE MENU */}
      <aside className="bg-bg-light flex flex-1 flex-col gap-5 rounded-2xl p-8">
        <h2 className="text-xl font-semibold">Actions</h2>

        <div className="flex gap-2">
          <AddRoomDialog propertyId={propertyId} />

          <button className="border-bg-dark hover:bg-bg text-text-muted flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-3 border-dashed px-5 py-8 transition-colors">
            <span>
              <Plus size={20} />
            </span>
            Add Booking
          </button>
        </div>
      </aside>
    </div>
  );
}
