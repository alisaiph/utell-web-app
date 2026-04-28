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
