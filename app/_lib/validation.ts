import { z } from "zod";

export const propertySchema = z.object({
  type: z.string().min(3).max(30),
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be at most 500 characters"),
  address: z
    .string()
    .min(3, "Address must be at least 3 characters")
    .max(50, "Address must be at most 50 characters"),
  city: z.string().min(3).max(30),
  area: z.string().min(3).max(30),
  contactPhone: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .max(7, "Phone number must be at most 7 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  contactEmail: z.email("Invalid email address").optional().or(z.literal("")),
  location: z.string().min(3).max(1000),
});

export const roomSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be at most 500 characters"),
  price: z
    .string()
    .min(3, "Price must be at least 3 digits")
    .max(4, "Price must be at most 4 digits")
    .regex(/^\d+$/, "Price must contain only digits"),
  discount: z
    .string()
    .min(3, "Discount must be at least 2 digits")
    .max(4, "Discount must be at most 4 digits")
    .regex(/^\d+$/, "Discount must contain only digits"),
  facilities: z.string().min(3).max(30),
  guests: z
    .string()
    .min(1, "Guests must be at least 1 digits")
    .max(2, "Guests must be at most 2 digits")
    .regex(/^\d+$/, "Guests must contain only digits"),
  bedrooms: z
    .string()
    .min(1, "Bedrooms must be at least 1 digits")
    .max(2, "Bedrooms must be at most 2 digits")
    .regex(/^\d+$/, "Bedrooms must contain only digits"),
  beds: z
    .string()
    .min(1, "Beds must be at least 1 digits")
    .max(2, "Beds must be at most 2 digits")
    .regex(/^\d+$/, "Beds must contain only digits"),
  baths: z
    .string()
    .min(1, "Baths must be at least 7 digits")
    .max(2, "Baths must be at most 7 digits")
    .regex(/^\d+$/, "Baths must contain only digits"),
});
