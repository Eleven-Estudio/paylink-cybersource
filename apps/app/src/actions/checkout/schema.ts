import { z } from "zod";

export const checkoutSchema = z.object({
  email: z.string().email({ message: "Required" }),
  "cc-number": z.string().min(16, { message: "Required" }),
  "cc-expiration": z.string().min(1, { message: "Required" }),
  "cc-cvv": z
    .string()
    .min(5, { message: "Required" })
    .max(5, { message: "Required" }),
  "cc-name": z.string().min(1, { message: "Required" }),
  link: z.string().optional(),
});
