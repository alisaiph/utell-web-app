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
  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }

  const userId = session.user.id;
  const allProperties = await getPropertiesByUserId(userId);

  return (
    <div className="flex gap-10">
      <div className="flex flex-col gap-5 basis-2/3">
        <div className="bg-bg-light flex flex-col gap-5 p-8 rounded-2xl">
          <h2 className="text-xl font-semibold">Your Properties</h2>

          {allProperties.length > 0 ? (
            <table className="text-left border-collapse">
              <tbody>
                <tr>
                  <th></th>
                  <th>Property</th>
                  <th>Area</th>
                  <th>City</th>
                  <th>Type</th>
                </tr>

                {allProperties?.map((property) => (
                  <PropertyList property={property} key={property.id} />
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-text-muted">You have no properties yet 🥲</p>
          )}

          {/* OVERVIEW CARDS */}
          {/* <div className="flex gap-5 flex-wrap">
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
          </div> */}
        </div>

        {/* GUESTS */}
        <div className="bg-bg-light flex flex-col gap-5 p-8 rounded-2xl">
          <h2 className="text-xl font-semibold">Guests</h2>

          <p>
            All the bookings for the properties owned by this user here, or
            specific property bookings can be displayed here.
          </p>
        </div>
      </div>

      <aside className="bg-bg-light flex flex-1 flex-col gap-5 p-8 rounded-2xl">
        <h2 className="text-xl font-semibold">Actions</h2>
        <div className="flex gap-2">
          <Link href={"/profile/properties/new"}>
            <button className="flex flex-col gap-1 items-center justify-center border-3 border-dashed border-bg-dark hover:bg-bg transition-colors text-text-muted rounded-xl px-5 py-8 cursor-pointer">
              <span>
                <Plus size={20} />
              </span>
              Add Property
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
