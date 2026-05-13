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
    .max(500, "Description must be at most 500 characters")
    .optional()
    .or(z.literal("")),
  price: z.coerce.number().min(1, "Price is required"),
  discount: z.coerce.number().min(0).max(100).optional(),
  type: z.string().min(3).max(30),
  guests: z.coerce
    .number()
    .min(1, "Atleast 1 guest required")
    .max(10, "Max 10 guests"),
  bedrooms: z.coerce
    .number()
    .min(1, "Atleast 1 bedroom required")
    .max(10, "Max 10 bedrooms"),
  beds: z.coerce
    .number()
    .min(1, "Atleast 1 bed required")
    .max(10, "Max 10 beds"),
  baths: z.coerce
    .number()
    .min(1, "Atleast 1 bath required")
    .max(10, "Max 10 baths"),
});
