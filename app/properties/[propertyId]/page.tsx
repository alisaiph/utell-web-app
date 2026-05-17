import PropertyPics from "@/app/_components/PropertyPics";
import RoomCard from "@/app/_components/RoomCard";
import UserCard from "@/app/_components/UserCard";
import {
  getImagesByPropertyId,
  getProperty,
  getRoomsByPropertyId,
} from "@/app/_lib/data-service";
import { MapPin } from "lucide-react";

export default async function page({
  params,
}: {
  params: { propertyId: string };
}) {
  const { propertyId } = await params;
  const property = await getProperty(propertyId);

  const {
    ownerId,
    name,
    city,
    area,
    type,
    description,
    contactPhone,
    contactEmail,
  } = property;

  const rooms = await getRoomsByPropertyId(propertyId);

  const images = await getImagesByPropertyId(propertyId);

  return (
    <div className="my-15 flex w-full gap-15">
      <section className="flex flex-5 flex-col items-center justify-center gap-15">
        <div className="w-[70%]">
          <PropertyPics images={images} />
        </div>

        {/* PROPERTY DETAILS */}
        <div className="text-center">
          <h1 className="mb-3 text-3xl font-semibold">{name}</h1>

          <div className="text-utell-text-lgray flex items-center gap-1 text-xl">
            <MapPin color="#848484" size={22} />
            <h2>
              {`${city}, ${area} | `}
              <span className="font-semibold">{type}</span>
            </h2>
          </div>
        </div>

        {/* CONTACT & DESCRIPTION */}
        <div className="flex w-[70%] gap-10">
          <UserCard
            owner={ownerId}
            contactPhone={contactPhone}
            contactEmail={contactEmail ?? undefined}
          />

          <p className="text-lg">{description}</p>
        </div>

        {/* ALL ROOMS */}
        <div className="w-full">
          <h2 className="mb-8 text-2xl font-semibold">All rooms</h2>
          <div className="flex w-full flex-wrap gap-8">
            {rooms?.map((room) => (
              <RoomCard room={room} key={room.id} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
