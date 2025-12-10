import { notFound } from "next/navigation";
import { supabase } from "./supabase";

const adjectives = [
  "cozy",
  "brave",
  "quiet",
  "sunny",
  "mellow",
  "swift",
  "urban",
  "rustic",
  "golden",
  "cheerful",
  "adorable",
  "angry",
  "annoying",
  "bright",
  "calm",
  "clumsy",
  "gifted",
  "gleaming",
  "foolish",
  "lucky",
];

const nouns = [
  "bunny",
  "rooster",
  "bird",
  "deer",
  "kitty",
  "goose",
  "fox",
  "lion",
  "rhino",
  "shark",
  "tuna",
  "owl",
  "duck",
  "puppy",
  "chipmunk",
  "snail",
  "lizard",
  "chicken",
  "crab",
  "frog",
];

// fn to pick random element from array
const rand = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

export function generateUsername() {
  // reddit-like pattern: adjective + noun + 3-4 base36 chars (eg: cozycabinx7g)
  const suffix = Math.floor(Math.random() * 36 ** 3)
    .toString(36)
    .padStart(3, "0");
  return `${rand(adjectives)}${rand(nouns)}${suffix}`;
}

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

export async function getUserByEmail(email: string) {
  let { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
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
    notFound();
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
    notFound();
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
    notFound();
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

// INSERT

export async function createUser(newUser: {}) {
  const { data, error } = await supabase
    .from("users")
    .insert([newUser])
    .select();

  if (error) {
    console.error("Error inserting user:", error);
    throw new Error("Failed to insert user");
  }

  return data;
}
