"use client";

import { useState } from "react";
import { BookCalendar } from "./BookCalendar";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

export default function BookForm({ price }: { price: string }) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const formatDate = (date: Date | undefined) =>
    date ? date.toLocaleDateString("en-GB").replace(/\//g, ".") : "-";

  return (
    <aside className="flex flex-col bg-bg-light rounded-2xl flex-2 min-w-90 px-15 pt-15 pb-10 gap-3">
      <h2 className="text-2xl font-semibold">
        <span className="font-normal">MVR</span>
        {` ${price}`}
        <span className="font-normal text-xl">/night</span>
      </h2>

      <hr className="border border-bg w-full" />

      <div className="flex justify-between text-lg">
        <p>Check In</p>
        <p>{formatDate(dateRange?.from)}</p>
      </div>

      <div className="flex justify-between text-lg">
        <p>Check Out</p>
        <p>{formatDate(dateRange?.to)}</p>
      </div>

      <div className="flex justify-between text-lg">
        <p>Number of Guests</p>
        <p>03</p>
      </div>

      <hr className="border border-bg w-full" />

      <h2 className="font-semibold text-lg">Extra Service</h2>
      <div className="flex justify-between text-lg">
        <p>Breakfast</p>
        <p>MVR 200</p>
      </div>

      <hr className="border border-bg w-full" />

      <div className="flex justify-between font-semibold text-lg">
        <p>Total cost:</p>
        <p>MVR 200.00</p>
      </div>

      <hr className="border border-bg w-full" />

      <div className="flex justify-center my-5 w-full">
        <BookCalendar dateRange={dateRange} onDateRangeChange={setDateRange} />
      </div>

      <button className="bg-utell-yellow rounded-lg p-5 cursor-pointer font-semibold text-xl text-white hover:bg-utell-yellow/80 transition-colors">
        Book Now
      </button>
    </aside>
  );
}
