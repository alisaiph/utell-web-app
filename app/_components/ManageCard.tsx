import { ArrowRight, SquarePen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ManageCard() {
  return (
    <div className="flex bg-white p-5 rounded-xl gap-5">
      <div className="rounded-md overflow-hidden w-50 h-40 relative">
        <Image
          src={"/images/property-card-img.webp"}
          alt="propertyImg"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col">
        <h3 className="text-xl font-bold mb-2">H. Shabnam Villa</h3>
        <p className=" text-sm">Henveyru, Male', Maldives</p>
        <p className="font-bold text-sm">Guest House</p>
      </div>

      <div className="flex flex-col justify-between items-end">
        <button className="cursor-pointer hover:bg-background-secondary transition-colors p-1 rounded-md">
          <SquarePen color="#BEBEBE" size={25} />
        </button>
        <Link
          href={"/user/1/"}
          className="flex  items-center gap-2 bg-linear-to-r from-utell-yellow to-[#EDDDD6] hover:bg-linear-to-r hover:from-utell-yellow hover:to-utell-yellow transition-colors py-5 px-15 rounded-md font-bold cursor-pointer"
        >
          <p>Manage Rooms</p>
          <ArrowRight size={22} />
        </Link>
      </div>
    </div>
  );
}
