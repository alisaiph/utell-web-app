import PropertyPics from "@/app/_components/PropertyPics";
import RoomCard from "@/app/_components/RoomCard";
import UserCard from "@/app/_components/UserCard";
import { getProperty, getRoomsByPropertyId } from "@/app/_lib/data-service";
import { MapPin } from "lucide-react";

export default async function page({
  params,
}: {
  params: { propertyId: string };
}) {
  const { propertyId } = await params;
  const property = await getProperty(Number(propertyId));

  const {
    owner,
    name: propertyName,
    city,
    area,
    type,
    contactPhone,
    contactEmail,
  } = property;

  const rooms = await getRoomsByPropertyId(Number(propertyId));

  return (
    <div className="flex w-full gap-15 my-5">
      <section className="flex items-center justify-center flex-col flex-5 gap-15">
        <div className="w-[70%]">
          <PropertyPics />
        </div>

        {/* PROPERTY DETAILS */}
        <div className="text-center">
          <h1 className="font-semibold text-3xl mb-3">{propertyName}</h1>

          <div className="flex items-center text-xl text-utell-text-lgray gap-1">
            <MapPin color="#848484" size={22} />
            <h2>
              {`${city}, ${area} | `}
              <span className="font-semibold">{type}</span>
            </h2>
          </div>
        </div>

        {/* CONTACT & DESCRIPTION */}
        <div className="flex gap-10 w-[70%]">
          <UserCard
            owner={owner}
            contactPhone={contactPhone}
            contactEmail={contactEmail}
          />

          <p className="text-lg">
            Hotel Canary is a modern hotel located in Male', Maldives which was
            founded in 2010 and we have three hundred thousand customers. Hotel
            Canary is a modern hotel located in Male', Maldives which was
            founded in 2010 and we have three hundred thousand customers.
          </p>
        </div>

        {/* ALL ROOMS */}
        <div className="w-full">
          <h2 className="text-2xl font-semibold mb-8">All rooms</h2>
          <div className="flex flex-wrap gap-8 w-full">
            {rooms?.map((room) => (
              <RoomCard room={room} key={room.id} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
