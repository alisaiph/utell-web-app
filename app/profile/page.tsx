import ReviewCard from "@/app/_components/ReviewCard";
import UserCard from "@/app/_components/UserCard";
import PropertyCard from "@/app/_components/PropertyCard";
import { getPropertiesByUserId } from "@/app/_lib/data-service";
import getServerSession from "../_lib/get-session";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession();
  const { id } = session?.user;
  const properties = await getPropertiesByUserId(id);

  // if default username is not changed, redirect
  if (session?.user.onboardCompleted === false) {
    redirect("/onboarding/username");
  }

  return (
    <div className="flex flex-col gap-15 mb-20">
      <header className="flex flex-col w-full items-center gap-15">
        <UserCard owner={id} /> {/* change to seperate component later */}
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
      </header>

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

        <h2 className="text-2xl font-semibold">Reservations</h2>
      </section>
    </div>
  );
}
