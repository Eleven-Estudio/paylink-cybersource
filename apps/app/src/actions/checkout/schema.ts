import validCreditCard from "card-validator";
import { z } from "zod";

export const checkoutSchema = z.object({
  email: z.string().email({ message: "Required" }),
  "cc-number": z
    .string()
    .min(16, { message: "Required" })
    .refine(
      (value) => {
        const cardValidator = validCreditCard.number(value);
        return cardValidator.isPotentiallyValid;
      },
      {
        message: "Invalid credit card number",
      },
    ),
  "cc-expiration": z
    .string()
    .min(1, { message: "Required" })
    .refine(
      (value) => {
        const cardValidator = validCreditCard.expirationDate(value);
        return cardValidator.isValid;
      },
      {
        message: "Invalid expiration date",
      },
    ),
  "cc-cvv": z
    .string()
    .min(3, { message: "Required" })
    .max(4, { message: "Required" }),
  "cc-name": z.string().min(1, { message: "Required" }),
  link: z.string().optional(),
});
