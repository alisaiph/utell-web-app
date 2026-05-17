"use client";

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
      selected={dateRange ?? { from: undefined, to: undefined }}
      onSelect={(range) => range && onDateRangeChange(range)}
      numberOfMonths={1}
      disabled={(date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
      }}
      className="w-full rounded-lg border"
    />
  );
}
