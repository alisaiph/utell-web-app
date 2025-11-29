import { Frown } from "lucide-react";
import Link from "next/link";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full mt-30">
      <Frown size={50} />
      <h2 className="text-3xl font-bold">Could not find room</h2>
      <Link
        href="/"
        className="py-3 px-8 bg-utell-yellow rounded-full font-bold hover:bg-utell-laccent transition-colors"
      >
        GO HOME
      </Link>
    </div>
  );
}

export default NotFound;
