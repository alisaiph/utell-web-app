import BookForm from "@/app/_components/BookForm";
import PropertyPics from "@/app/_components/PropertyPics";
import RoomList from "@/app/_components/RoomList";
import UserCard from "@/app/_components/UserCard";
import {
  getProperty,
  getRoom,
  getRoomsByPropertyId,
} from "@/app/_lib/data-service";
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

  const allRooms = await getRoomsByPropertyId(propertyId);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex w-full gap-15">
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
        </section>

        <BookForm price={price} />
      </div>

      <div className="bg-white flex flex-col gap-5 p-8 rounded-2xl">
        {/* ALL ROOMS */}
        <h2 className="text-xl font-semibold">{`All rooms from ${propertyName}`}</h2>

        <table className="text-left border-collapse">
          <tbody>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Max Capacity</th>
              <th>Price</th>
              <th>Status</th>
            </tr>

            {allRooms?.map((room) => (
              <RoomList room={room} key={room.id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
