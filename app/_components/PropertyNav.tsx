import { Building, Hotel, House } from "lucide-react";

export default function PropertyNav() {
  return (
    <div className="flex justify-center mt-5 w-full">
      <ul className="flex text-sm items-end w-full justify-center">
        <li className="flex flex-col items-center gap-2 w-[18%]">
          <House color="#fcbf49" size={40} />
          <h2 className="font-bold">Guest House</h2>
          <span className="inline-block w-full h-1 bg-utell-yellow mt-3"></span>
        </li>

        <li className="flex flex-col items-center gap-2 w-[18%]">
          <Building color="#BEBEBE" size={40} />
          <h2 className="font-bold text-[#BEBEBE]">Apartments</h2>
          <span className="inline-block w-full h-1 bg-[#BEBEBE] mt-3"></span>
        </li>

        <li className="flex flex-col items-center gap-2 w-[18%]">
          <Hotel color="#BEBEBE" size={40} />
          <h2 className="font-bold text-[#BEBEBE]">Hotels</h2>
          <span className="inline-block w-full h-1 bg-[#BEBEBE] mt-3"></span>
        </li>
      </ul>
    </div>
  );
}
