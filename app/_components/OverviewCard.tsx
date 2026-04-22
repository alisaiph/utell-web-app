import React from "react";

export default function OverviewCard({
  text,
  amount,
  bg,
  children,
}: {
  text: string;
  amount: number;
  bg: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col border-3 border-bg gap-2 p-5 rounded-xl`}>
      <div className="flex items-center gap-2">
        {children}
        <h3>{text}</h3>
      </div>
      <hr className={`border-0 h-1 ${bg} rounded-2xl`} />
      <p className="text-3xl font-semibold text-center">{amount}</p>
    </div>
  );
}
