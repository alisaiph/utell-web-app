import BookForm from "@/app/_components/BookForm";
import MapPickerWrapper from "@/app/_components/MapPickerWrapper";
import PropertyPics from "@/app/_components/PropertyPics";
import RoomCard from "@/app/_components/RoomCard";
import UserCard from "@/app/_components/UserCard";
import {
  getAmenitiesByRoomId,
  getImagesByRoomId,
  getProperty,
  getRoom,
  getRoomsByPropertyId,
} from "@/app/_lib/data-service";
import { Dot, MapPin, Tv, Utensils, WashingMachine, Wifi } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import AmenitiesList from "@/app/_components/AmenitiesList";

export default async function page({ params }: { params: { roomId: string } }) {
  const { roomId } = await params;
  const room = await getRoom(roomId);
  const amenities = await getAmenitiesByRoomId(roomId);

  const {
    name: roomName,
    description,
    price,
    discount,
    guests,
    bedrooms,
    beds,
    baths,
    propertyId,
  } = room;

  const property = await getProperty(propertyId);
  const {
    name: propertyName,
    area,
    city,
    type,
    location,
    contactPhone,
    contactEmail,
    ownerId,
  } = property;

  const allRooms = await getRoomsByPropertyId(propertyId);

  const images = await getImagesByRoomId(roomId);

  return (
    <div className="flex flex-col gap-10 my-15">
      <div className="flex w-full gap-15">
        <section className="flex flex-col flex-5 gap-15">
          <PropertyPics images={images} />

          {/* ROOM DETAILS */}
          <div>
            <h1 className="font-semibold text-2xl mb-3">
              {`${propertyName} | `}
              <span className="font-normal">{roomName}</span>
            </h1>

            <div className="flex items-center text-lg text-utell-text-lgray gap-1">
              <MapPin size={22} />
              <h2 className="flex items-center justify-center">
                {`${city}, ${area}`}
                <Dot />
                <span>{type}</span>
                <Dot />
                <span>{bedrooms} Bedroom</span>
                <Dot />
                <span>{beds} Bed</span>
                <Dot />
                <span>{baths} Bath</span>
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

            <Separator />

            <p className="text-lg">{description}</p>

            <Separator />

            {/* AMENITIES */}
            <div className="flex flex-col gap-8">
              <h2 className="text-2xl font-semibold">Amenities</h2>
              <AmenitiesList amenities={amenities} />
            </div>

            <Separator />

            {/* LOCATION */}
            <div className="flex flex-col gap-8">
              <h2 className="text-2xl font-semibold">Location</h2>
              <MapPickerWrapper />
            </div>
          </div>

          <Separator />
        </section>

        <BookForm price={price} />
      </div>

      <div className="flex flex-col gap-8">
        <h2 className="text-2xl font-semibold">
          More rooms from {propertyName}
        </h2>

        <div className="bg-bg-light p-6 w-full rounded-2xl">
          {allRooms.length > 0 ? (
            allRooms?.map((room) => <RoomCard room={room} key={room.name} />)
          ) : (
            <p className="text-text-muted">No rooms in this property yet 🥲</p>
          )}
        </div>
      </div>
    </div>
  );
}
