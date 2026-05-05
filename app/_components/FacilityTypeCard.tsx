import { Wifi, AirVent, Tv, WashingMachine, Utensils } from "lucide-react";

export default function PropertyTypeCard({
  children,
  icon,
  name,
  value,
  defaultChecked = false,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  name: string;
  value: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="cursor-pointer">
      <input
        type="checkbox"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        className="sr-only peer"
      />
      <div className="flex flex-col gap-1 items-center justify-center p-2 w-20 h-20 border-2 border-bg rounded-md hover:border-utell-yellow transition-colors text-text-muted peer-checked:text-utell-yellow peer-checked:border-utell-yellow peer-checked:bg-utell-yellow/10">
        {icon === "Wifi" && <Wifi size={20} />}
        {icon === "AC" && <AirVent size={20} />}
        {icon === "TV" && <Tv size={20} />}
        {icon === "Laundry" && <WashingMachine size={20} />}
        {icon === "Kitchen" && <Utensils size={20} />}
        <p className="font-semibold text-sm">{children}</p>
      </div>
    </label>
  );
}
