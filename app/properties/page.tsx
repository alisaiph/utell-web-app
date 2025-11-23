import ManageCard from "@/app/_components/ManageCard";
import { PlusIcon } from "lucide-react";

export default function page() {
  return (
    <div className="flex flex-col gap-8 mb-15">
      <h2 className="text-2xl font-bold mb-6">Manage Properties</h2>

      <div className="flex flex-wrap flex-start gap-6">
        <ManageCard />
        <ManageCard />
      </div>

      <div className="w-180">
        <hr className="border border-utell-laccent mb-6" />
        {/* Make this add btn a component later */}
        <button className="flex gap-1 items-center justify-center w-full px-20 py-5 font-bold cursor-pointer hover:bg-utell-laccent transition-colors text-utell-text-lgray border-2 border-dashed border-utell-laccent rounded-lg  ">
          <PlusIcon size={18} />
          <p>Add Property</p>
        </button>
      </div>
    </div>
  );
}
