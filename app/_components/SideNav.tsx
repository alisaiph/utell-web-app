import { CircleUser, Heart, Home, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function SideNav() {
  return (
    <nav className="col-start-1 col-end-2 bg-white h-full w-20 fixed flex justify-center">
      <ul className="flex flex-col gap-10 mt-20">
        <li className="p-1 rounded-lg hover:bg-background-secondary transition-colors">
          <Link href={"/"}>
            <Home color="#FCBF49" size={45} />
          </Link>
        </li>

        <li className="p-1 rounded-lg hover:bg-background-secondary transition-colors">
          <Link href={"/user/username"}>
            <CircleUser color="#FCBF49" size={45} />
          </Link>
        </li>

        <li className="p-1 rounded-lg hover:bg-background-secondary transition-colors">
          <Link href={"/"}>
            <Heart color="#FCBF49" size={45} />
          </Link>
        </li>

        <li className="p-1 rounded-lg hover:bg-background-secondary transition-colors">
          <Link href={"/"}>
            <MessageSquare color="#FCBF49" size={45} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
