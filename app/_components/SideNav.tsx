import { CircleUser, Heart, Home, LogOut, MessageSquare } from "lucide-react";
import Link from "next/link";
import getServerSession from "../_lib/get-session";
import SignOutBtn from "./SignOutBtn";

export default async function SideNav() {
  const session = await getServerSession();

  return (
    <nav className="col-start-1 col-end-2 bg-white h-full w-20 fixed flex justify-center">
      <div className="flex flex-col justify-between">
        <ul className="flex flex-col gap-8 mt-20">
          <li className="p-1 rounded-lg hover:bg-background-secondary transition-colors">
            <Link href={"/"}>
              <Home color="#FCBF49" size={45} />
            </Link>
          </li>

          <li className="p-1 rounded-lg hover:bg-background-secondary transition-colors">
            <Link
              href={!session ? "/login" : `/user/${session?.user.username}`}
            >
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

        <ul className="mb-20">
          {session?.user && (
            <li className="p-1 rounded-lg hover:bg-background-secondary transition-colors">
              <SignOutBtn />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
