import { Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import getServerSession from "../_lib/get-session";
import { getPropertiesByUserId } from "../_lib/data-service";

export default async function ProfileNav() {
  const session = await getServerSession();
  if (!session?.user) {
    redirect("/login");
  }

  const { username, displayUsername, image } = session.user;

  // if default username is not changed, redirect
  if (session?.user.onboardCompleted === false) {
    redirect("/onboarding/username");
  }
  return (
    <nav className="bg-bg-light flex items-center justify-between gap-5 rounded-xl px-4 py-3">
      <ul className="flex gap-5 font-semibold">
        <li>
          <Link
            href="/profile/bookings"
            className="hover:bg-bg-dark rounded-md px-3 py-2 transition-colors"
          >
            Bookings
          </Link>
        </li>
        <li>
          <Link
            href="/profile/properties"
            className="bg-utell-yellow hover:bg-bg-dark rounded-md px-3 py-2 text-white transition-colors"
          >
            Properties
          </Link>
        </li>
      </ul>

      <div className="flex items-center justify-center gap-4">
        {image && (
          <div className="relative aspect-square w-10 overflow-hidden rounded-full">
            <Image
              src={image}
              fill
              alt="avatar"
              className="object-cover"
            ></Image>
          </div>
        )}

        <div className="text-md">
          <p className="font-semibold">
            {displayUsername ? `${displayUsername} | ` : ""}
            <span className="font-semibold">{username}</span>
          </p>
        </div>

        <Link
          href="/profile/settings"
          className="hover:bg-bg-dark cursor-pointer rounded-md p-2 transition-colors"
        >
          <Settings />
        </Link>
      </div>
    </nav>
  );
}
