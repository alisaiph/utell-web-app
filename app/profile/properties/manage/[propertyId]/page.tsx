import OverviewCard from "@/app/_components/OverviewCard";
import PropertyList from "@/app/_components/PropertyList";
import RoomList from "@/app/_components/RoomList";
import { getPropertiesByUserId, getProperty } from "@/app/_lib/data-service";
import getServerSession from "@/app/_lib/get-session";
import {
  BedDouble,
  CalendarCheck,
  CalendarPlus2,
  CalendarX,
  Plus,
} from "lucide-react";
import Link from "next/link";

export default async function page({
  params,
}: {
  params: { propertyId: string };
}) {
  const { propertyId } = await params;

  const session = await getServerSession();
  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }

  const userId = session.user.id;
  const { name: propertyName } = await getProperty(propertyId);
  //   const allRooms = await getPropertiesByUserId(userId);
  const allRooms = [
    {
      name: "Room1",
      facilities: "wifi",
      price: 100.0,
      capacity: 2,
      imageUrl: "/images/room1.jpg",
    },
    {
      name: "Room2",
      facilities: "AC",
      price: 200.0,
      capacity: 3,
      imageUrl: "/images/room1.jpg",
    },
  ];

  return (
    <div className="flex gap-10">
      <div className="flex flex-col gap-5 basis-2/3">
        <div className="bg-bg-light flex flex-col gap-5 p-8 rounded-2xl">
          <h2 className="text-xl font-semibold">{propertyName} — Rooms</h2>
        </div>

        <div className="bg-bg-light/50 flex flex-col gap-5 px-4 py-2 rounded-2xl">
          <div className="grid grid-cols-[150px_1fr_1fr_1fr_1fr_1fr] items-center font-semibold">
            <p></p>
            <p className="ml-5">Name</p>
            <p>Facilities</p>
            <p>Price</p>
            <p>Capacity</p>
          </div>
        </div>

        {allRooms.length > 0 ? (
          allRooms?.map((room) => (
            <div
              className="bg-bg-light border-2 border-bg hover:border-bg-dark transition-colors rounded-2xl p-4"
              key={room.name}
            >
              <RoomList room={room} key={room.name} />
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
      <aside className="bg-bg-light flex flex-1 flex-col gap-5 p-8 rounded-2xl">
        <h2 className="text-xl font-semibold">Actions</h2>
        <div className="flex gap-2">
          <Link href={"/profile/properties/new"}>
            <button className="flex flex-col gap-1 items-center justify-center border-3 border-dashed border-bg-dark hover:bg-bg transition-colors text-text-muted rounded-xl px-5 py-8 cursor-pointer">
              <span>
                <Plus size={20} />
              </span>
              Add Room
            </button>
          </Link>

          <button className="flex flex-col gap-2 items-center justify-center border-3 border-dashed border-bg-dark hover:bg-bg transition-colors text-text-muted rounded-xl px-5 py-8 cursor-pointer">
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
