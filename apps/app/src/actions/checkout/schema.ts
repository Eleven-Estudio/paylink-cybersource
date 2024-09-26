import { z } from "zod";

export const checkoutSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  "cc-number": z
    .string()
    .min(16, { message: "Credit card number is incomplete" })
    .max(16, { message: "Credit card number is invalid" }),
  "cc-expiration": z
    .string()
    .min(1, { message: "Expiration date is required" }),
  "cc-cvv": z
    .string()
    .min(3, { message: "CVV is required" })
    .max(3, { message: "CVV is required" }),
  "cc-name": z.string().min(1, { message: "Cardholder name is required" }),
  link: z.string().optional(),
});
