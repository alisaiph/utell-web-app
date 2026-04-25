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

  const userId = parseInt(session.user.id as string);
  const { username, displayUsername, image } = session.user;
  const properties = await getPropertiesByUserId(userId);

  // if default username is not changed, redirect
  if (session?.user.onboardCompleted === false) {
    redirect("/onboarding/username");
  }
  return (
    <nav className="flex items-center justify-between gap-5 bg-bg-light rounded-xl px-6 py-3">
      <ul className="flex gap-5 font-semibold">
        <li>
          <Link
            href="/profile/bookings"
            className="hover:bg-bg-dark rounded-lg px-3 py-2 transition-colors"
          >
            Bookings
          </Link>
        </li>
        <li>
          <Link
            href="/profile/manage"
            className="bg-utell-yellow text-white hover:bg-bg-dark rounded-lg px-3 py-2 transition-colors"
          >
            Manage
          </Link>
        </li>
      </ul>

      <div className="flex gap-4 items-center justify-center">
        {image && (
          <div className="relative rounded-full w-10 aspect-square overflow-hidden">
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
          className="cursor-pointer hover:bg-bg-dark rounded-lg p-2 transition-colors"
        >
          <Settings />
        </Link>
      </div>
    </nav>
  );
}
