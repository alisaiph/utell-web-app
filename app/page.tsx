import RoomCard from "./_components/RoomCard";
import PropertyFilter from "./_components/PropertyFilter";
import PropertyNav from "./_components/PropertyNav";
import { getRooms } from "./_lib/data-service";
import { redirect } from "next/navigation";
import getServerSession from "./_lib/get-session";

export default async function Home() {
  const session = await getServerSession();
  const rooms = await getRooms();

  // if default username is not changed, redirect
  if (session?.user?.onboardCompleted === false) {
    redirect("/onboarding/username");
  }

  return (
    <div className="flex flex-col gap-10">
      <PropertyNav />

      <PropertyFilter />

      <div className="flex justify-start w-full flex-wrap gap-8">
        {rooms?.map((room) => (
          <RoomCard room={room} key={room.id} />
        ))}
      </div>
    </div>
  );
}
