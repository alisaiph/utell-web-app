import RoomCard from "./_components/RoomCard";
import PropertyFilter from "./_components/PropertyFilter";
import PropertyNav from "./_components/PropertyNav";
import { getRooms } from "./_lib/data-service";
import { Divide } from "lucide-react";

export default async function Home() {
  const rooms = await getRooms();

  return (
    <div className="flex flex-col my-8 gap-10">
      <PropertyNav />

      <PropertyFilter />

      <div className="flex justify-start w-full flex-wrap gap-8">
        {rooms && rooms.length > 0 ? (
          rooms.map((room) => <RoomCard room={room} key={room.id} />)
        ) : (
          <p className="text-text-muted">No rooms available yet 🥲</p>
        )}
      </div>
    </div>
  );
}
