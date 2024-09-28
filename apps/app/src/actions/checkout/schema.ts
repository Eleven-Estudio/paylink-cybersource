import { COUNTRIES_REQUIRED_STATE } from "@/lib/cybersource";
import validCreditCard from "card-validator";
import { z } from "zod";

export const checkoutSchema = z
  .object({
    email: z.string().email({ message: "Required" }),
    "cc-number": z
      .string()
      .min(1, { message: "Required" })
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
    name: z.string().min(1, { message: "Required" }),
    lastName: z.string().min(1, { message: "Required" }),
    country: z
      .string()
      .min(2, { message: "Required" })
      .max(2, { message: "Required" }),
    state: z.string(),
    zip: z.string(),
    address: z.string().min(1, { message: "Required" }),
    city: z.string().min(1, { message: "Required" }),
    link: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (COUNTRIES_REQUIRED_STATE.includes(data.country)) {
      if (data.state === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Required",
          path: ["state"],
        });
      }

      if (data.zip === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Required",
          path: ["zip"],
        });
      }
    }
  });
