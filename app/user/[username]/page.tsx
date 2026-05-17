import ReviewCard from "@/app/_components/ReviewCard";
import UserCard from "@/app/_components/UserCard";
import PropertyCard from "@/app/_components/PropertyCard";
import {
  getPropertiesByUserId,
  getUserByUsername,
} from "@/app/_lib/data-service";

export default async function page({
  params,
}: {
  params: { username: string };
}) {
  const { username } = await params;
  const user = await getUserByUsername(username);
  const { id } = user;

  const properties = await getPropertiesByUserId(id);

  return (
    <div className="my-15 flex flex-col gap-15">
      <header className="flex w-full flex-col items-center gap-15">
        {/* <UserCard owner={id} /> */}

        {/* STATS */}
        <div className="flex">
          <div className="border-utell-daccent border-r-2 px-12 text-center">
            <h2 className="text-5xl font-bold">11</h2>
            <p className="text-lg">Reviews</p>
          </div>

          <div className="border-utell-daccent border-r-2 px-12 text-center">
            <h2 className="text-5xl font-bold">3.95</h2>
            <p className="text-lg">Rating</p>
          </div>

          <div className="px-12 text-center">
            <h2 className="text-5xl font-bold">5</h2>
            <p className="text-lg">Listings</p>
          </div>
        </div>
      </header>

      {/* REVIEWS */}
      <section className="w-fullrounded-lg flex flex-col gap-8">
        <h2 className="text-2xl font-semibold">Reviews</h2>

        <div className="flex gap-8">
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </div>

        <h2 className="mt-20 text-2xl font-semibold">Properties</h2>

        <div className="flex w-full flex-wrap justify-start gap-8">
          {properties?.map((property) => (
            <PropertyCard property={property} key={property.id} />
          ))}
        </div>
      </section>
    </div>
  );
}
