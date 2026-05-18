import { House, Building, Hotel } from "lucide-react";

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
        type="radio"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        className="peer sr-only"
      />
      <div className="border-bg hover:border-utell-yellow text-text-muted peer-checked:text-utell-yellow peer-checked:border-utell-yellow peer-checked:bg-utell-yellow/10 flex h-20 w-30 flex-col items-center justify-center gap-1 rounded-md border-2 transition-colors md:h-25 md:w-35 md:p-5">
        {icon === "House" && <House size={30} />}
        {icon === "Building" && <Building size={30} />}
        {icon === "Hotel" && <Hotel size={30} />}
        <p className="text-sm font-semibold">{children}</p>
      </div>
    </label>
  );
}
