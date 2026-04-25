"use server";

import { redirect } from "next/navigation";
import getServerSession from "./get-session";
import { db } from "@/db";
import { user as userTable } from "@/auth-schema";
import { eq } from "drizzle-orm";

export async function updateUsernameAction(formData) {
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
