"use server";

import { actionClientWithMeta } from "@/actions/safe-action";
import * as Sentry from "@sentry/nextjs";
import axios from "axios";
import { checkoutSchema } from "./schema";

export const generatePaymentAction = actionClientWithMeta
  .schema(checkoutSchema)
  .metadata({
    name: "generate-payment",
    track: {
      event: "generate-payment",
      channel: "checkout",
    },
  })
  .action(async ({ parsedInput: input }) => {
    const {
      link,
      "cc-number": ccNumber,
      "cc-cvv": ccCvv,
      "cc-expiration": ccExpiration,
      email,
      "cc-name": ccName,
      name,
      lastName,
      country,
      state,
      zip,
      city,
      address,
    } = input;

    try {
      const res = await axios.post(
        `${process.env.NEXT_API_URL}/api/checkout/authorize-payment`,
        {
          link,
          ccNumber,
          ccCvv,
          ccExpiration,
          ccName,
          email,
          name,
          lastName,
          country,
          state,
          zip,
          city,
          address,
        },
      );
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Sentry.captureException(error);
        return {
          ...error.response?.data,
          success: false,
        };
      }

      Sentry.captureException(error);
      return {
        success: false,
      };
    }
  });
