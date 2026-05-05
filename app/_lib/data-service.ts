import { db } from "@/db";
import {
  roomsTable,
  propertiesTable,
  bookingsTable,
  propertyImagesTable,
  roomImagesTable,
  roomAmenitiesTable,
} from "@/schema";
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

export async function getUser(id: string) {
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

export async function getRoom(id: string) {
  const room = await db
    .select()
    .from(roomsTable)
    .where(eq(roomsTable.id, id))
    .then((result) => result[0]);

  return room ?? null;
}

export async function getRoomsByPropertyId(propertyId: string) {
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

export async function getImagesByRoomId(roomId: string) {
  try {
    const roomImages = await db
      .select()
      .from(roomImagesTable)
      .where(eq(roomImagesTable.roomId, roomId));
    return roomImages ?? null;
  } catch (error) {
    console.error("Error fetching room images:", error);
    throw new Error("Failed to fetch room images");
  }
}

export async function getAmenitiesByRoomId(roomId: string) {
  try {
    const amenities = await db
      .select()
      .from(roomAmenitiesTable)
      .where(eq(roomAmenitiesTable.roomId, roomId));
    return amenities ?? null;
  } catch (error) {
    console.error("Error fetching amenities:", error);
    throw new Error("Failed to fetch amenities");
  }
}

export async function getProperty(id: string) {
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

export async function getImagesByPropertyId(propertyId: string) {
  try {
    const propertyImages = await db
      .select()
      .from(propertyImagesTable)
      .where(eq(propertyImagesTable.propertyId, propertyId));
    return propertyImages ?? null;
  } catch (error) {
    console.error("Error fetching property images:", error);
    throw new Error("Failed to fetch property images");
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
