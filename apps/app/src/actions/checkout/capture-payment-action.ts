"use server";

import { actionClientWithMeta } from "@/actions/safe-action";
import { checkoutSchema } from "./schema";

export const capturePaymentAction = actionClientWithMeta
  .schema(checkoutSchema)
  .metadata({
    name: "capture-payment",
  })
  .action(async ({ parsedInput: input }) => {
    console.log(input);
    return true;
  });
