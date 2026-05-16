import { CircleDollarSign, MapPin, UsersRound } from "lucide-react";

export default function PropertyFilter() {
  return (
    <div className="bg-bg-light flex h-12 w-98 items-center justify-center self-center rounded-full md:self-start">
      <ul className="text-md flex w-full justify-around">
        <li className="flex items-center gap-1">
          <MapPin size={18} />
          Location
        </li>
        <li className="flex items-center gap-1">
          <CircleDollarSign size={18} />
          Price
        </li>
        <li className="flex items-center gap-1">
          <UsersRound size={18} />
          Guests
        </li>
      </ul>
    </div>
  );
}
