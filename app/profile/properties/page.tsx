import OverviewCard from "@/app/_components/OverviewCard";
import PropertyList from "@/app/_components/PropertyList";
import { getPropertiesByUserId } from "@/app/_lib/data-service";
import getServerSession from "@/app/_lib/get-session";
import {
  BedDouble,
  CalendarCheck,
  CalendarPlus2,
  CalendarX,
  Plus,
} from "lucide-react";
import Link from "next/link";

export default async function page() {
  const session = await getServerSession();
  const user = session?.user;
  if (!user?.id) {
    throw new Error("User not authenticated");
  }

  const allProperties = await getPropertiesByUserId(user.id);

  return (
    <div className="flex flex-col gap-10 md:flex-row">
      <div className="flex basis-2/3 flex-col gap-5">
        <h2 className="text-xl font-semibold">Your Properties</h2>

        <div className="bg-bg-light/50 flex flex-col gap-5 rounded-2xl px-4 py-2">
          <div className="grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr] items-center font-semibold md:grid-cols-[150px_1fr_1fr_1fr_1fr_1fr]">
            <p></p>
            <p className="ml-5">Name</p>
            <p>Type</p>
            <p>City</p>
            <p className="hidden md:inline-block">Area</p>
            <p>Action</p>
          </div>
        </div>

        {allProperties.length > 0 ? (
          allProperties?.map((property) => (
            <div
              className="bg-bg-light border-bg hover:border-bg-dark rounded-2xl border-2 p-4 transition-colors"
              key={property.id}
            >
              <PropertyList property={property} key={property.id} />
            </div>
          ))
        ) : (
          <p className="text-text-muted">You have no properties yet 🥲</p>
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
          <Link href={"/profile/properties/new"}>
            <button className="border-bg-dark hover:bg-bg text-text-muted flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-3 border-dashed px-5 py-8 transition-colors">
              <span>
                <Plus size={20} />
              </span>
              Add Property
            </button>
          </Link>

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

{
  /* OVERVIEW CARDS */
}
{
  /* <div className="flex gap-5 flex-wrap">
            <OverviewCard text="Bookings" amount={5} bg="bg-sky-200">
              <CalendarPlus2 />
            </OverviewCard>
            <OverviewCard text="Rooms Available" amount={10} bg="bg-orange-200">
              <BedDouble />
            </OverviewCard>
            <OverviewCard
              text="Today's Check-Ins"
              amount={3}
              bg="bg-emerald-200"
            >
              <CalendarCheck />
            </OverviewCard>
            <OverviewCard text="Today's Check-Outs" amount={1} bg="bg-red-200">
              <CalendarX />
            </OverviewCard>
          </div> */
}
