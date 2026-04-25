import { db } from "@/db";
import { roomsTable, propertiesTable, bookingsTable } from "@/schema";
import { user as userTable } from "@/auth-schema";
import { eq } from "drizzle-orm";

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

const animals = [
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
  // reddit-like pattern: adjective + noun + 3-4 base36 chars (eg: cozykittyx7g)
  const suffix = Math.floor(Math.random() * 36 ** 3)
    .toString(36)
    .padStart(3, "0");
  return `${rand(adjectives)}${rand(animals)}${suffix}`;
}

// GET

export async function getUser(id: number) {
  const user = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, id))
    .then((result) => result[0]);

  return user ?? null;
}

export async function getUserByUsername(username: string) {
  const user = await db
    .select()
    .from(userTable)
    .where(eq(userTable.username, username))
    .then((result) => result[0]);

  return user ?? null;
}

export async function getRooms() {
  try {
    const rooms = await db.select().from(roomsTable);
    return rooms ?? null;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw new Error("Failed to fetch rooms");
  }
}

export async function getRoom(id: number) {
  const room = await db
    .select()
    .from(roomsTable)
    .where(eq(roomsTable.id, id))
    .then((result) => result[0]);

  return room ?? null;
}

export async function getRoomsByPropertyId(propertyId: number) {
  try {
    const rooms = await db
      .select()
      .from(roomsTable)
      .where(eq(roomsTable.propertyId, propertyId));
    return rooms ?? null;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw new Error("Failed to fetch rooms");
  }
}

export async function getProperty(id: number) {
  const property = await db
    .select()
    .from(propertiesTable)
    .where(eq(propertiesTable.id, id))
    .then((result) => result[0]);

  return property ?? null;
}

export async function getPropertiesByUserId(userId: string) {
  try {
    const properties = await db
      .select()
      .from(propertiesTable)
      .where(eq(propertiesTable.ownerId, userId));
    return properties ?? null;
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw new Error("Failed to fetch properties");
  }
}

export async function getBookingsByUserId(guestId: string) {
  try {
    const bookings = await db
      .select()
      .from(bookingsTable)
      .where(eq(bookingsTable.guestId, guestId));
    return bookings ?? null;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw new Error("Failed to fetch bookings");
  }
}
