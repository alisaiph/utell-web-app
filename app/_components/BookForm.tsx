"use client";

import { isPast } from "date-fns";
import { DayPicker, getDefaultClassNames } from "react-day-picker";

export default function BookForm({ price }: { price: number }) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <aside className="flex flex-col bg-white rounded-3xl flex-2 min-w-90 p-15 gap-7">
      <h2 className="text-4xl font-bold">
        <span className="font-normal">MVR</span>
        {` ${price}`}
        <span className="font-normal text-2xl">/night</span>
      </h2>

      <hr className="border border-background-secondary w-full" />

      <div className="flex justify-between text-lg">
        <p>Check In</p>
        <p className="font-bold">19.11.2025</p>
      </div>

      <div className="flex justify-between text-lg">
        <p>Check Out</p>
        <p className="font-bold">25.11.2025</p>
      </div>

      <div className="flex justify-between text-lg">
        <p>Number of Guests</p>
        <p className="font-bold">03</p>
      </div>

      <hr className="border border-background-secondary w-full" />

      <h2 className="font-bold text-lg">Extra Service</h2>
      <div className="flex justify-between text-lg">
        <p>Breakfast</p>
        <p className="font-bold">MVR 200</p>
      </div>

      <hr className="border border-background-secondary w-full" />

      <div className="flex justify-between font-bold text-lg">
        <p>Total cost:</p>
        <p>MVR 200.00</p>
      </div>

      <hr className="border border-background-secondary w-full" />

      <div className="flex justify-center mt-5 h-95">
        <DayPicker
          mode="range"
          navLayout="around"
          disabled={(curDate) => isPast(curDate)}
          classNames={{
            today: "bg-utell-laccent font-bold",
            selected: "bg-background-secondary font-bold",
            chevron: "fill-utell-yellow",
            caption_label: "font-bold",
            day: "text-center rounded-full hover:bg-utell-yellow transition-colors",
            day_button:
              "px-4 py-3 text-center rounded-full hover:bg-utell-yellow transition-colors cursor-pointer",
            range_start: "bg-utell-yellow font-bold",
            range_end: "bg-utell-yellow font-bold",
          }}
        />
      </div>
    </aside>
  );
}
