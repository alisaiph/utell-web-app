import { Building, Hotel, House } from "lucide-react";

export default function PropertyNav() {
  return (
    <div className="mt-5 flex w-full justify-center">
      <ul className="flex w-full items-end justify-center text-sm">
        <li className="flex w-[18%] flex-col items-center gap-2">
          <House color="#fcbf49" size={40} />
          <h2 className="text-xs font-bold md:text-base">Guest House</h2>
          <span className="bg-utell-yellow mt-3 inline-block h-1 w-full"></span>
        </li>

        <li className="flex w-[18%] flex-col items-center gap-2">
          <Building color="#BEBEBE" size={40} />
          <h2 className="text-text-muted text-xs font-bold md:text-base">
            Apartments
          </h2>
          <span className="bg-bg-light mt-3 inline-block h-1 w-full"></span>
        </li>

        <li className="flex w-[18%] flex-col items-center gap-2">
          <Hotel color="#BEBEBE" size={40} />
          <h2 className="text-text-muted text-xs font-bold md:text-base">
            Hotels
          </h2>
          <span className="bg-bg-light mt-3 inline-block h-1 w-full"></span>
        </li>
      </ul>
    </div>
  );
}
