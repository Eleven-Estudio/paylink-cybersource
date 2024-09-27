"use server";

import { actionClientWithMeta } from "@/actions/safe-action";
import axios from "axios";
import { useRouter } from "next/router";
import { checkoutSchema } from "./schema";

export const createPaymentAction = actionClientWithMeta
  .schema(checkoutSchema)
  .metadata({
    name: "capture-payment",
  })
  .action(async ({ parsedInput: input }) => {
    const {
      link,
      "cc-number": ccNumber,
      "cc-cvv": ccCvv,
      "cc-expiration": ccExpiration,
      email,
      "cc-name": ccName,
    } = input;

    const res = await axios.post(
      `${process.env.NEXT_API_URL}/api/checkout/authorize-payment`,
      {
        link,
        ccNumber,
        ccCvv,
        ccExpiration,
        ccName,
        email,
      },
    );

    return true;
  });
