import { CircleDollarSign, MapPin, UsersRound } from "lucide-react";

export default function PropertyFilter() {
  return (
    <div className="self-start bg-white rounded-full w-98 h-12 flex items-center justify-center">
      <ul className="flex justify-around w-full text-md">
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
