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
    <div className="flex w-full gap-15 my-15">
      <section className="flex items-center justify-center flex-col flex-5 gap-15">
        <div className="w-[70%]">
          <PropertyPics images={images} />
        </div>

        {/* PROPERTY DETAILS */}
        <div className="text-center">
          <h1 className="font-semibold text-3xl mb-3">{name}</h1>

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
            owner={ownerId}
            contactPhone={contactPhone}
            contactEmail={contactEmail}
          />

          <p className="text-lg">{description}</p>
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
