import OverviewCard from "@/app/_components/OverviewCard";
import {
  BedDouble,
  CalendarCheck,
  CalendarPlus2,
  CalendarX,
} from "lucide-react";

export default function page() {
  return (
    <div className="flex gap-10">
      <div className="flex flex-col gap-5">
        <div className="bg-background-accent-dark flex flex-col gap-5 p-8 rounded-2xl">
          <h2 className="text-xl font-semibold">Overview</h2>

          {/* OVERVIEW CARDS */}
          <div className="flex gap-5 flex-wrap">
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
          </div>
        </div>

        {/* GUESTS */}
        <div className="bg-background-accent-dark flex flex-col gap-5 p-8 rounded-2xl">
          <h2 className="text-xl font-semibold">Guests</h2>

          <p>
            All the bookings for the rooms owned by this user here, or specific
            room bookings can be displayed here.
          </p>
        </div>
      </div>

      <aside className="bg-background-accent-dark flex flex-1 flex-col gap-5 p-8 rounded-2xl">
        <h2 className="text-xl font-semibold">Actions</h2>
      </aside>
    </div>
  );
}
