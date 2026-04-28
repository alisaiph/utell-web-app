"use server";

import { redirect } from "next/navigation";
import getServerSession from "./get-session";
import { db } from "@/db";
import { user as userTable } from "@/auth-schema";
import { eq } from "drizzle-orm";
import { propertySchema } from "./validation";
import { propertiesTable, propertyImagesTable } from "@/src/schema";

export async function updateUsernameAction(formData: FormData) {
  const session = await getServerSession();
  if (!session) throw new Error("You must be logged in."); // security check

  const username = formData.get("username");
  const userId = session?.user.id;

  try {
    await db
      .update(userTable)
      .set({ username, onboardCompleted: true })
      .where(eq(userTable.id, userId));
  } catch (error) {
    console.error("Error updating username:", error);
    throw new Error("Username could not be updated, try again.");
  }

  redirect("/profile");
}

export async function addPropertyAction(formData: FormData) {
  const session = await getServerSession();
  if (!session) throw new Error("You must be logged in."); // security check

  const data = {
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    city: formData.get("city"),
    area: formData.get("area"),
    address: formData.get("address"),
    location: formData.get("location"),
    contactPhone: formData.get("contactPhone"),
    contactEmail: formData.get("contactEmail"),
  };

  const result = propertySchema.safeParse(data);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const validated = result.data;

  // Collect uploaded URLs from hidden inputs
  const imageUrls: string[] = [];
  let index = 0;
  while (true) {
    const url = formData.get(`imageUrl${index}`);
    if (!url) break;
    imageUrls.push(url as string);
    index++;
  }

  // Validate
  if (imageUrls.length === 0) throw new Error("At least 1 image required");
  if (imageUrls.length > 3) throw new Error("Maximum 3 images allowed");

  await db.transaction(async (tx) => {
    const [property] = await tx
      .insert(propertiesTable)
      .values({
        id: crypto.randomUUID(),
        name: validated.name,
        description: validated.description,
        address: validated.address,
        area: validated.area,
        city: validated.city,
        type: validated.type,
        location: validated.location,
        contactPhone: validated.contactPhone,
        contactEmail: validated.contactEmail || null,
        ownerId: session.user.id,
      })
      .returning({ id: propertiesTable.id });

    await tx.insert(propertyImagesTable).values(
      imageUrls.map((url, i) => ({
        id: crypto.randomUUID(),
        propertyId: property.id,
        imageUrl: url,
        displayOrder: i,
      })),
    );
  });

  return { success: true };
}
