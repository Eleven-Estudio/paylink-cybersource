"use server";

import { authActionClient } from "@/actions/safe-action";
import { getRandomKey } from "@/lib/key";
import { insertLink } from "@v1/supabase/mutations";
import { createLinkSchema } from "./schema";

export const insertLinkAction = authActionClient
  .schema(createLinkSchema)
  .metadata({
    name: "insert-link",
  })
  .action(async ({ parsedInput: input, ctx: { user } }) => {
    const randomKey = await getRandomKey({ prefix: "ee" });
    const linkPayment = {
      ...input,
      currency: "USD",
      key: randomKey,
      created_by: user.id,
    };

    const result = await insertLink(linkPayment);
    return result;
  });
