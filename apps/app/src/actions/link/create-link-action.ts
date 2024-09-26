"use server";

import { authActionClient } from "@/actions/safe-action";
import { getRandomKey } from "@/lib/key";
import { createLink } from "@v1/supabase/mutations";
import { createLinkSchema } from "./schema";

export const createLinkAction = authActionClient
  .schema(createLinkSchema)
  .metadata({
    name: "create-link",
  })
  .action(async ({ parsedInput: input, ctx: { user } }) => {
    const randomKey = await getRandomKey({ prefix: "ee" });
    const linkPayment = {
      ...input,
      currency: "USD",
      key: randomKey,
    };

    const result = await createLink(linkPayment);
    return result;
  });
