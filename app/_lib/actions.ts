"use server";

import { redirect } from "next/navigation";
import getServerSession from "./get-session";
import { db } from "@/db";
import { user as userTable } from "@/auth-schema";
import { eq } from "drizzle-orm";

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

  const type = formData.get("type");
  const name = formData.get("name");
  const description = formData.get("description");
  const city = formData.get("city");
  const area = formData.get("area");
  const address = formData.get("address");
  const location = formData.get("location");
  const contactPhone = formData.get("contactPhone");
  const contactEmail = formData.get("contactEmail");
  const ownerId = session?.user.id;

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

  // Save property and images to database
  console.log({
    type,
    name,
    description,
    address,
    city,
    area,
    location,
    contactPhone,
    contactEmail,
    ownerId,
    imageUrls,
  });
}
