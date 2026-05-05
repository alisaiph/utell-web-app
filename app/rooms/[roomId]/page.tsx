import BookForm from "@/app/_components/BookForm";
import PropertyPics from "@/app/_components/PropertyPics";
import RoomList from "@/app/_components/RoomList";
import UserCard from "@/app/_components/UserCard";
import {
  getImagesByPropertyId,
  getProperty,
  getRoom,
  getRoomsByPropertyId,
} from "@/app/_lib/data-service";
import { MapPin } from "lucide-react";

export default async function page({ params }: { params: { roomId: string } }) {
  const { roomId } = await params;
  const room = await getRoom(roomId);

  const {
    id,
    name: roomName,
    description,
    price,
    discount,
    guests,
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
    ownerId,
  } = property;

  const allRooms = await getRoomsByPropertyId(propertyId);

  const images = await getImagesByPropertyId(propertyId);

  return (
    <div className="flex flex-col gap-10 my-15">
      <div className="flex w-full gap-15">
        <section className="flex flex-col flex-5 gap-15">
          <PropertyPics images={images} />

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
              owner={ownerId}
              contactPhone={contactPhone}
              contactEmail={contactEmail}
            />

            <p className="text-lg">{description}</p>
          </div>
        </section>

        <BookForm price={price} />
      </div>

      <div className="flex flex-col gap-5 basis-2/3">
        <h2 className="text-xl font-semibold">
          More rooms from {propertyName}
        </h2>

        <div className="bg-bg-light/50 flex flex-col gap-5 px-4 py-2 rounded-2xl">
          <div className="grid grid-cols-[150px_1fr_1fr_1fr_1fr_1fr] items-center font-semibold">
            <p></p>
            <p className="ml-5">Name</p>
            <p>Amenities</p>
            <p>Price</p>
            <p>Guests</p>
          </div>
        </div>

        {allRooms.length > 0 ? (
          allRooms?.map((room) => (
            <div
              className="bg-bg-light border-2 border-bg hover:border-bg-dark transition-colors rounded-2xl p-4"
              key={room.name}
            >
              <RoomList room={room} key={room.name} />
            </div>
          ))
        ) : (
          <p className="text-text-muted">No rooms in this property yet 🥲</p>
        )}

        {/* GUESTS */}
        {/* <div className="bg-bg-light flex flex-col gap-5 p-8 rounded-2xl">
                <h2 className="text-xl font-semibold">Guests</h2>
      
                <p>
                  All the bookings for the properties owned by this user here, or
                  specific property bookings can be displayed here.
                </p>
              </div> */}
      </div>
    </div>
  );
}
