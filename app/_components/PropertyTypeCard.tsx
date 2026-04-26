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
        className="sr-only peer"
      />
      <div className="flex flex-col gap-1 items-center justify-center p-5 w-35 h-25 border-2 border-bg rounded-md hover:border-utell-yellow transition-colors text-text-muted peer-checked:text-utell-yellow peer-checked:border-utell-yellow peer-checked:bg-utell-yellow/10">
        {icon === "House" && <House size={30} />}
        {icon === "Building" && <Building size={30} />}
        {icon === "Hotel" && <Hotel size={30} />}
        <p className="font-semibold text-sm">{children}</p>
      </div>
    </label>
  );
}
