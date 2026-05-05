"use server";

import {
  S3Client,
  CopyObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { redirect } from "next/navigation";
import getServerSession from "./get-session";
import { db } from "@/db";
import { user as userTable } from "@/auth-schema";
import { eq } from "drizzle-orm";
import { propertySchema } from "./validation";
import { propertiesTable, propertyImagesTable } from "@/src/schema";

type ActionResponse = {
  success?: boolean;
  errors?: Record<string, string[]>;
};

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

export async function addPropertyAction(
  prevState: ActionResponse,
  formData: FormData,
): Promise<ActionResponse> {
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
  const propertyId = formData.get("propertyId") as string;

  const result = propertySchema.safeParse(data);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const validated = result.data;

  // Collect uploaded URLs from hidden inputs
  const uploadedRaw = formData.get("uploadedImages");

  const uploadedImages: { url: string; key: string }[] = uploadedRaw
    ? JSON.parse(uploadedRaw as string)
    : [];

  // Validate
  if (uploadedImages.length === 0) {
    return { errors: { images: ["At least 1 image required"] } };
  }
  if (uploadedImages.length > 3) {
    return { errors: { images: ["Maximum 3 images allowed"] } };
  }

  await db.transaction(async (tx) => {
    const [property] = await tx
      .insert(propertiesTable)
      .values({
        id: propertyId,
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

    // Save final URLs
    await tx.insert(propertyImagesTable).values(
      uploadedImages.map((img, i) => ({
        id: crypto.randomUUID(),
        propertyId: property.id,
        imageUrl: img.url,
        displayOrder: i,
      })),
    );
  });

  return { success: true };
}
