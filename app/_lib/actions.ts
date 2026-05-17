"use server";

import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { redirect } from "next/navigation";
import getServerSession from "./get-session";
import { db } from "@/app/_lib/db/db";
import { user as userTable } from "@/app/_lib/db/auth-schema";
import { eq } from "drizzle-orm";
import { propertySchema, roomSchema } from "./validation";
import {
  propertiesTable,
  propertyImagesTable,
  roomAmenitiesTable,
  roomImagesTable,
  roomsTable,
} from "@/app/_lib/db/schema";
import { r2client } from "./r2-upload";
import { getImagesByPropertyId, getImagesByRoomId } from "./data-service";

type ActionResponse = {
  success?: boolean;
  errors?: Record<string, string[]>;
};

export async function updateUsernameAction(formData: FormData) {
  const session = await getServerSession();
  if (!session) throw new Error("You must be logged in."); // security check

  const username = formData.get("username") as string;
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

  try {
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
  } catch (err) {
    console.error("Uploading to db failed, cleaning up R2...", err);

    await Promise.all(
      uploadedImages.map((img) =>
        r2client.send(
          new DeleteObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME!,
            Key: img.key,
          }),
        ),
      ),
    );

    return {
      errors: { general: ["Uploading image to db failed, try again."] },
    };
  }
}

export async function updatePropertyAction(
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

  try {
    await db.transaction(async (tx) => {
      await tx
        .update(propertiesTable)
        .set({
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
        .where(eq(propertiesTable.id, propertyId));

      // Delete old, insert new images
      await tx
        .delete(propertyImagesTable)
        .where(eq(propertyImagesTable.propertyId, propertyId));

      await tx.insert(propertyImagesTable).values(
        uploadedImages.map((img, i) => ({
          id: crypto.randomUUID(),
          propertyId,
          imageUrl: img.url,
          displayOrder: i,
        })),
      );
    });

    return { success: true };
  } catch (err) {
    console.error("Uploading to db failed, cleaning up R2...", err);

    // Get existing image keys from DB to know which ones are new
    const existingImages = await getImagesByPropertyId(propertyId);
    const existingKeys = new Set(existingImages.map((img) => img.key));
    const newImages = uploadedImages.filter(
      (img) => !existingKeys.has(img.key),
    );

    await Promise.all(
      newImages.map((img) =>
        r2client.send(
          new DeleteObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME!,
            Key: img.key,
          }),
        ),
      ),
    );

    return {
      errors: { general: ["Uploading image to db failed, try again."] },
    };
  }
}

export async function addRoomAction(
  prevState: ActionResponse,
  formData: FormData,
): Promise<ActionResponse> {
  const session = await getServerSession();
  if (!session) throw new Error("You must be logged in."); // security check

  const data = {
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    discount: formData.get("discount"),
    type: formData.get("type"),
    guests: formData.get("guests"),
    bedrooms: formData.get("bedrooms"),
    beds: formData.get("beds"),
    baths: formData.get("baths"),
  };
  const propertyId = formData.get("propertyId") as string;
  const roomId = formData.get("roomId") as string;
  const amenities = formData.getAll("amenities") as string[];

  const result = roomSchema.safeParse(data);

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

  try {
    await db.transaction(async (tx) => {
      const [room] = await tx
        .insert(roomsTable)
        .values({
          id: roomId,
          name: validated.name,
          description: validated.description,
          price: String(validated.price),
          discount: String(validated.discount) || null,
          type: validated.type,
          guests: validated.guests,
          bedrooms: validated.bedrooms,
          beds: validated.beds,
          baths: validated.baths,
          propertyId: propertyId,
        })
        .returning({ id: roomsTable.id });

      if (amenities.length > 0) {
        await tx.insert(roomAmenitiesTable).values(
          amenities.map((amenityId) => ({
            id: crypto.randomUUID(),
            roomId,
            amenityId,
          })),
        );
      }

      // Save final URLs
      await tx.insert(roomImagesTable).values(
        uploadedImages.map((img, i) => ({
          id: crypto.randomUUID(),
          roomId: room.id,
          imageUrl: img.url,
          displayOrder: i,
        })),
      );
    });

    return { success: true };
  } catch (err) {
    console.error("Uploading to db failed, cleaning up R2...", err);

    await Promise.all(
      uploadedImages.map((img) =>
        r2client.send(
          new DeleteObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME!,
            Key: img.key,
          }),
        ),
      ),
    );

    return {
      errors: { general: ["Uploading image to db failed, try again."] },
    };
  }
}

export async function updateRoomAction(
  prevState: ActionResponse,
  formData: FormData,
): Promise<ActionResponse> {
  const session = await getServerSession();
  if (!session) throw new Error("You must be logged in."); // security check

  const data = {
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    discount: formData.get("discount"),
    type: formData.get("type"),
    guests: formData.get("guests"),
    bedrooms: formData.get("bedrooms"),
    beds: formData.get("beds"),
    baths: formData.get("baths"),
  };
  const propertyId = formData.get("propertyId") as string;
  const roomId = formData.get("roomId") as string;
  const amenities = formData.getAll("amenities") as string[];

  const result = roomSchema.safeParse(data);

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

  try {
    await db.transaction(async (tx) => {
      await tx
        .update(roomsTable)
        .set({
          name: validated.name,
          description: validated.description,
          price: String(validated.price),
          discount: String(validated.discount) || null,
          type: validated.type,
          guests: validated.guests,
          bedrooms: validated.bedrooms,
          beds: validated.beds,
          baths: validated.baths,
        })
        .where(eq(roomsTable.id, roomId));

      // Delete old, insert new amenities
      await tx
        .delete(roomAmenitiesTable)
        .where(eq(roomAmenitiesTable.roomId, roomId));

      if (amenities.length > 0) {
        await tx.insert(roomAmenitiesTable).values(
          amenities.map((amenityId) => ({
            id: crypto.randomUUID(),
            roomId,
            amenityId,
          })),
        );
      }

      // Delete old, insert new images
      await tx
        .delete(roomImagesTable)
        .where(eq(roomImagesTable.roomId, roomId));

      await tx.insert(roomImagesTable).values(
        uploadedImages.map((img, i) => ({
          id: crypto.randomUUID(),
          roomId,
          imageUrl: img.url,
          displayOrder: i,
        })),
      );
    });

    return { success: true };
  } catch (err) {
    console.error("Uploading to db failed, cleaning up R2...", err);

    // Get existing image keys from DB to know which ones are new
    const existingImages = await getImagesByRoomId(roomId);
    const existingKeys = new Set(existingImages.map((img) => img.key));
    const newImages = uploadedImages.filter(
      (img) => !existingKeys.has(img.key),
    );

    await Promise.all(
      newImages.map((img) =>
        r2client.send(
          new DeleteObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME!,
            Key: img.key,
          }),
        ),
      ),
    );

    return {
      errors: { general: ["Uploading image to db failed, try again."] },
    };
  }
}

export async function deleteRoomAction(roomId: string) {
  try {
    // Delete room images from r2
    const images = await getImagesByRoomId(roomId);

    await Promise.all(
      images.map((img) =>
        r2client.send(
          new DeleteObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME!,
            Key: img.key,
          }),
        ),
      ),
    );

    // Delete room from db
    await db.delete(roomsTable).where(eq(roomsTable.id, roomId));
  } catch (error) {
    console.error("Error deleting room:", error);
    throw new Error("Failed to delete room");
  }
}

export async function deletePropertyAction(propertyId: string) {
  try {
    // Delete property images from r2
    const images = await getImagesByPropertyId(propertyId);

    await Promise.all(
      images.map((img) =>
        r2client.send(
          new DeleteObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME!,
            Key: img.key,
          }),
        ),
      ),
    );

    // Delete the images of all the rooms associated with that property from r2
    const roomImages = await db
      .select({ imageUrl: roomImagesTable.imageUrl })
      .from(roomImagesTable)
      .innerJoin(roomsTable, eq(roomImagesTable.roomId, roomsTable.id))
      .where(eq(roomsTable.propertyId, propertyId));

    await Promise.all(
      roomImages.map((img) => {
        const key = new URL(img.imageUrl).pathname.slice(1); // removes leading "/"
        return r2client.send(
          new DeleteObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME!,
            Key: key,
          }),
        );
      }),
    );

    // Delete property from db
    await db.delete(propertiesTable).where(eq(propertiesTable.id, propertyId));
  } catch (error) {
    console.error("Error deleting property:", error);
    throw new Error("Failed to delete property");
  }
}
