import ReviewCard from "@/app/_components/ReviewCard";
import UserCard from "@/app/_components/UserCard";
import PropertyCard from "@/app/_components/PropertyCard";
import { getPropertiesByUserId } from "@/app/_lib/data-service";
import getServerSession from "../_lib/get-session";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Settings } from "lucide-react";

export default async function page() {
  const session = await getServerSession();
  const { id, username, displayUsername, image } = session?.user;
  const properties = await getPropertiesByUserId(id);

  // if default username is not changed, redirect
  if (session?.user.onboardCompleted === false) {
    redirect("/onboarding/username");
  }

  return (
    <div className="flex flex-col gap-15 mb-20">
      <nav className="flex items-center justify-between gap-5 bg-white rounded-xl px-6 py-3">
        <ul className="flex gap-5 font-semibold">
          <li>
            <Link
              href="/profile/bookings"
              className="hover:bg-background-secondary rounded-lg px-3 py-2 transition-colors"
            >
              Bookings
            </Link>
          </li>
          <li>
            <Link
              href="/profile/manage"
              className="bg-utell-yellow hover:bg-background-secondary rounded-lg px-3 py-2 transition-colors"
            >
              Manage
            </Link>
          </li>
        </ul>

        <div className="flex gap-4 items-center justify-center">
          <div className="relative rounded-full w-10 aspect-square overflow-hidden">
            <Image
              src={image}
              fill
              alt="avatar"
              className="object-cover"
            ></Image>
          </div>

          <div className="text-md">
            <p className="font-semibold">
              {displayUsername ? `${displayUsername} | ` : ""}
              <span className="font-semibold text-utell-daccent">
                {username}
              </span>
            </p>
          </div>

          <Link
            href="/profile/settings"
            className="cursor-pointer hover:bg-background-secondary rounded-lg p-2 transition-colors"
          >
            <Settings />
          </Link>
        </div>
      </nav>

      {/* STATS (move this to property manage dashboard)*/}
      {/* <div className="flex ">
          <div className="text-center border-r-2 border-utell-daccent px-12">
            <h2 className="font-bold text-5xl">11</h2>
            <p className="text-lg">Reviews</p>
          </div>

          <div className="text-center border-r-2 border-utell-daccent px-12">
            <h2 className="font-bold text-5xl">3.95</h2>
            <p className="text-lg">Rating</p>
          </div>

          <div className="text-center px-12">
            <h2 className="font-bold text-5xl">5</h2>
            <p className="text-lg">Listings</p>
          </div>
        </div> */}

      {/* REVIEWS (move this to property manage dashboard)*/}
      <section className="flex flex-col gap-8 w-fullrounded-lg">
        {/* <h2 className="text-2xl font-semibold">Reviews</h2>

        <div className="flex gap-8">
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </div>

        <h2 className="text-2xl font-semibold mt-20">Properties</h2>

        <div className="flex justify-start w-full flex-wrap gap-8">
          {properties?.map((property) => (
            <PropertyCard property={property} key={property.id} />
          ))}
        </div> */}

        <h2 className="text-2xl font-semibold">Bookings</h2>
      </section>
    </div>
  );
}
