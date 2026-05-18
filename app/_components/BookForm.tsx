"use client";

import { useState } from "react";
import { BookCalendar } from "./BookCalendar";
import { DateRange } from "react-day-picker";

export default function BookForm({ price }: { price: string }) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const formatDate = (date: Date | undefined) =>
    date ? date.toLocaleDateString("en-GB").replace(/\//g, ".") : "-";

  return (
    <aside className="bg-bg-light hidden min-w-90 flex-2 flex-col gap-3 rounded-2xl px-15 pt-15 pb-10 md:flex">
      <h2 className="text-2xl font-semibold">
        <span className="font-normal">MVR</span>
        {` ${price}`}
        <span className="text-xl font-normal">/night</span>
      </h2>

      <hr className="border-bg w-full border" />

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

      <hr className="border-bg w-full border" />

      <h2 className="text-lg font-semibold">Extra Service</h2>
      <div className="flex justify-between text-lg">
        <p>Breakfast</p>
        <p>MVR 200</p>
      </div>

      <hr className="border-bg w-full border" />

      <div className="flex justify-between text-lg font-semibold">
        <p>Total cost:</p>
        <p>MVR 200.00</p>
      </div>

      <hr className="border-bg w-full border" />

      <div className="my-5 flex w-full justify-center">
        <BookCalendar dateRange={dateRange} onDateRangeChange={setDateRange} />
      </div>

      <button className="bg-utell-yellow hover:bg-utell-yellow/80 cursor-pointer rounded-lg p-5 text-xl font-semibold text-white transition-colors">
        Book Now
      </button>
    </aside>
  );
}
