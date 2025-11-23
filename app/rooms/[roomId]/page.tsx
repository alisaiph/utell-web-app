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
    max_capacity,
    price,
    discount,
    images,
    property_id,
  } = room;

  const property = await getProperty(property_id);
  const {
    name: propertyName,
    area,
    city,
    type,
    contact_phone,
    contact_email,
    user_id,
  } = property;

  return (
    <div className="flex items-start w-full gap-15 my-8">
      <section className="flex flex-col flex-5 gap-15">
        <PropertyPics />

        {/* ROOM DETAILS */}
        <div>
          <h1 className="font-bold text-3xl mb-3">
            {`${propertyName} | `}
            <span className="font-normal">{roomName}</span>
          </h1>

          <div className="flex items-center text-xl text-utell-text-lgray gap-1">
            <MapPin color="#848484" size={22} />
            <h2>
              {`${city}, ${area} | `}
              <span className="font-bold">{type}</span>
            </h2>
          </div>
        </div>

        {/* CONTACT & DESCRIPTION */}
        <div className="flex gap-10">
          <UserCard
            owner={user_id}
            contactPhone={contact_phone}
            contactEmail={contact_email}
          />

          <p className="text-lg">{description}</p>
        </div>

        {/* ALL ROOMS */}
        <div className="my-8">
          <h2 className="text-2xl font-bold">{`More rooms from ${propertyName}`}</h2>
        </div>
      </section>

      <BookForm price={price} />
    </div>
  );
}
