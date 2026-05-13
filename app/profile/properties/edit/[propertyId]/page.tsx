import { notFound } from "next/navigation";

import {
  getImagesByPropertyId,
  getPropertyByOwner,
} from "@/app/_lib/data-service";
import getServerSession from "@/app/_lib/get-session";
import EditPropertyForm from "@/app/_components/EditPropertyForm";

export default async function page({
  params,
}: {
  params: { propertyId: string };
}) {
  const { propertyId } = await params;
  const session = await getServerSession();
  const user = session?.user;

  if (!user?.id) {
    throw new Error("User not authenticated");
  }

  const property = await getPropertyByOwner(propertyId, user.id);

  if (!property) {
    notFound();
  }

  const currImages = await getImagesByPropertyId(propertyId);

  return (
    <div className="bg-bg-light flex flex-col gap-10 p-8 rounded-2xl">
      <h2 className="text-xl font-semibold">Update Property</h2>

      <EditPropertyForm property={property} currImages={currImages} />
    </div>
  );
}
