import ReviewCard from "@/app/_components/ReviewCard";
import UserCard from "@/app/_components/UserCard";
import PropertyCard from "@/app/_components/PropertyCard";
import {
  getPropertiesByUserId,
  getUserByusername,
} from "@/app/_lib/data-service";

export default async function page({
  params,
}: {
  params: { username: string };
}) {
  const { username } = await params;
  const user = await getUserByusername(username);

  const { user_id } = user;

  const properties = await getPropertiesByUserId(user_id);

  return (
    <div className="flex flex-col gap-15 mb-20">
      <header className="flex flex-col w-full items-center gap-15">
        <div className="w-150 ">
          <UserCard
            owner={user_id}
            contactPhone={7777}
            contactEmail="email@email.com"
          />
        </div>

        {/* STATS */}
        <div className="flex ">
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
        </div>
      </header>

      {/* REVIEWS */}
      <section className="flex flex-col gap-8 w-fullrounded-lg">
        <h2 className="text-2xl font-bold">Reviews</h2>

        <div className="flex gap-8">
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </div>

        <h2 className="text-2xl font-bold mt-20">Properties</h2>

        <div className="flex justify-start w-full flex-wrap gap-8">
          {properties?.map((property) => (
            <PropertyCard property={property} key={property.id} />
          ))}
        </div>
      </section>
    </div>
  );
}
