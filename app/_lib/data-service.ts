import { supabase } from "./supabase";

// GET

export async function getUserById(id: number) {
  let { data: user, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", id)
    .single();

  if (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user");
  }

  return user;
}
export async function getUserByusername(username: string) {
  let { data: user, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user");
  }

  return user;
}

export async function getRooms() {
  let { data: rooms, error } = await supabase.from("rooms").select("*");

  if (error) {
    console.error("Error fetching rooms:", error);
    throw new Error("Failed to fetch rooms");
  }

  return rooms;
}

export async function getRoom(id: number) {
  let { data: room, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching room:", error);
    throw new Error("Failed to fetch room");
  }

  return room;
}

export async function getRoomsByPropertyId(id: number) {
  let { data: room, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("property_id", id);

  if (error) {
    console.error("Error fetching rooms:", error);
    throw new Error("Failed to fetch rooms");
  }

  return room;
}

export async function getProperty(id: number) {
  let { data: property, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching property:", error);
    throw new Error("Failed to fetch property");
  }

  return property;
}

export async function getPropertiesByUserId(id: number) {
  let { data: properties, error } = await supabase
    .from("properties")
    .select("*")
    .eq("user_id", id);

  if (error) {
    console.error("Error fetching properties:", error);
    throw new Error("Failed to fetch properties");
  }

  return properties;
}
