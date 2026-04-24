import { redirect } from "next/navigation";
import ProfileNav from "../_components/ProfileNav";
import getServerSession from "../_lib/get-session";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (!session?.user) {
    redirect("/login");
  }
  return (
    <div className="flex flex-col gap-15 my-15">
      <ProfileNav />

      {/* REVIEWS (move this to property manage dashboard)*/}
      <section>
        {children}

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
      </section>
    </div>
  );
}
