"use client";

import * as React from "react";
import { addDays } from "date-fns";
import { type DateRange } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";

interface BookCalendarProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange) => void;
}

export function BookCalendar({
  dateRange,
  onDateRangeChange,
}: BookCalendarProps) {
  return (
    <Calendar
      mode="range"
      selected={dateRange}
      onSelect={onDateRangeChange}
      numberOfMonths={1}
      disabled={(date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
      }}
      className="rounded-lg border w-full"
    />
  );
}
