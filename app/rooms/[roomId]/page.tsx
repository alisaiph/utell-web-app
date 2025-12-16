import BookForm from "@/app/_components/BookForm";
import PropertyPics from "@/app/_components/PropertyPics";
import UserCard from "@/app/_components/UserCard";
import { getProperty, getRoom } from "@/app/_lib/data-service";
import { MapPin } from "lucide-react";

export default async function page({ params }: { params: { roomId: string } }) {
  const { roomId } = await params;
  const room = await getRoom(Number(roomId));

  const {
    id,
    name: roomName,
    description,
    facilities,
    maxCapacity,
    price,
    discount,
    images,
    propertyId,
  } = room;

  const property = await getProperty(propertyId);
  const {
    name: propertyName,
    area,
    city,
    type,
    contactPhone,
    contactEmail,
    owner,
  } = property;

  return (
    <div className="flex items-start w-full gap-15 my-8">
      <section className="flex flex-col flex-5 gap-15">
        <PropertyPics />

        {/* ROOM DETAILS */}
        <div>
          <h1 className="font-semibold text-3xl mb-3">
            {`${propertyName} | `}
            <span className="font-normal">{roomName}</span>
          </h1>

          <div className="flex items-center text-xl text-utell-text-lgray gap-1">
            <MapPin color="#848484" size={22} />
            <h2>
              {`${city}, ${area} | `}
              <span className="font-semibold">{type}</span>
            </h2>
          </div>
        </div>

        {/* CONTACT & DESCRIPTION */}
        <div className="flex flex-col gap-10">
          <UserCard
            owner={owner}
            contactPhone={contactPhone}
            contactEmail={contactEmail}
          />

          <p className="text-lg">{description}</p>
        </div>

        {/* ALL ROOMS */}
        <div className="my-8">
          <h2 className="text-2xl font-semibold">{`More rooms from ${propertyName}`}</h2>
        </div>
      </section>

      <BookForm price={price} />
    </div>
  );
}
