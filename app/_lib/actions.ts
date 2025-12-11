"use server";

import { redirect } from "next/navigation";
import getServerSession from "./get-session";
import { supabase } from "./supabase";

export async function updateUsernameAction(formData) {
  const session = await getServerSession();
  if (!session) throw new Error("You must be logged in."); // security check

  const username = formData.get("username");

  // update in supabase
  const { error, data, count } = await supabase
    .from("user")
    .update({ username: username, onboardCompleted: true })
    .eq("id", session?.user.id);

  if (error) {
    throw new Error("Username could not be updated, try again.");
  }

  redirect("/");
}
