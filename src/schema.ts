import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  boolean,
  decimal,
} from "drizzle-orm/pg-core";
import { user as userTable } from "@/auth-schema";

// Properties table
export const propertiesTable = pgTable("properties", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  address: text("address").notNull(),
  area: text("area").notNull(),
  city: text("city").notNull(),
  type: text("type").notNull(),
  location: text("location").notNull(),
  contactPhone: text("contact_phone").notNull(),
  contactEmail: text("contact_email"),
  ownerId: text("owner_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Property = typeof propertiesTable.$inferSelect;
export type NewProperty = typeof propertiesTable.$inferInsert;

// Property Images table
export const propertyImagesTable = pgTable("property_images", {
  id: text("id").primaryKey(),
  propertyId: text("property_id")
    .notNull()
    .references(() => propertiesTable.id, { onDelete: "cascade" }),
  imageUrl: text("image_url").notNull(),
  displayOrder: integer("display_order").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type PropertyImage = typeof propertyImagesTable.$inferSelect;
export type NewPropertyImage = typeof propertyImagesTable.$inferInsert;

// Rooms table
export const roomsTable = pgTable("rooms", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  facilities: text("facilities"),
  price: decimal("price", { precision: 10, scale: 2 }),
  discount: decimal("discount", { precision: 5, scale: 2 }),
  capacity: integer("capacity").default(1),
  imageUrl: text("image_url"),
  propertyId: text("property_id")
    .notNull()
    .references(() => propertiesTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Room = typeof roomsTable.$inferSelect;
export type NewRoom = typeof roomsTable.$inferInsert;

// Bookings table
export const bookingsTable = pgTable("bookings", {
  id: text("id").primaryKey(),
  numGuests: integer("num_guests").default(1).notNull(),
  extrasPrice: decimal("extras_price", { precision: 10, scale: 2 }),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
  status: text("status").default("pending").notNull(),
  guestId: text("guest_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  roomId: text("room_id")
    .notNull()
    .references(() => roomsTable.id, { onDelete: "cascade" }),
  checkIn: timestamp("check_in").notNull(),
  checkOut: timestamp("check_out").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Booking = typeof bookingsTable.$inferSelect;
export type NewBooking = typeof bookingsTable.$inferInsert;
