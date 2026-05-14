import { CircleUser, Heart, Home, LogOut, MessageSquare } from "lucide-react";
import Link from "next/link";
import getServerSession from "../_lib/get-session";
import SignOutBtn from "./SignOutBtn";
import Image from "next/image";

export default async function SideNav() {
  const session = await getServerSession();

  return (
    <>
      {/* MOBILE */}
      <nav className="bg-bg-light fixed right-0 bottom-0 left-0 z-50 flex h-16 items-center justify-center gap-15 md:hidden">
        <Link href="/">
          <Home color="#FCBF49" size={30} />
        </Link>
        <Link href={!session ? "/login" : "/profile"}>
          <CircleUser color="#FCBF49" size={30} />
        </Link>
        <Link href="/">
          <Heart color="#FCBF49" size={30} />
        </Link>
        <Link href="/">
          <MessageSquare color="#FCBF49" size={30} />
        </Link>
      </nav>

      {/* DESKTOP */}
      <nav className="bg-bg-light fixed hidden h-full w-20 justify-center md:flex">
        <div className="flex flex-col justify-between">
          <ul className="mt-20 flex flex-col gap-8">
            <li className="hover:bg-bg-dark rounded-lg p-1 transition-colors">
              <Link href={"/"}>
                <Home color="#FCBF49" size={45} />
              </Link>
            </li>

            <li className="hover:bg-bg-dark rounded-lg p-1 transition-colors">
              <Link href={!session ? "/login" : `/profile`}>
                <CircleUser color="#FCBF49" size={45} />
              </Link>
            </li>

            <li className="hover:bg-bg-dark rounded-lg p-1 transition-colors">
              <Link href={"/"}>
                <Heart color="#FCBF49" size={45} />
              </Link>
            </li>

            <li className="hover:bg-bg-dark rounded-lg p-1 transition-colors">
              <Link href={"/"}>
                <MessageSquare color="#FCBF49" size={45} />
              </Link>
            </li>
          </ul>

          <ul className="mb-20">
            {session?.user && (
              <>
                <li className="mb-4">
                  <div className="relative aspect-square w-13 overflow-hidden rounded-full">
                    <Image
                      src={session?.user.image}
                      fill
                      alt="avatar"
                      className="object-cover"
                    ></Image>
                  </div>
                </li>

                <li className="hover:bg-bg-dark rounded-lg p-1 transition-colors">
                  <SignOutBtn />
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
