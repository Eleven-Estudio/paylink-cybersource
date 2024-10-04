"use server";

import { authActionClient } from "@/actions/safe-action";
import { updateLink } from "@v1/supabase/mutations";
import { updateLinkSchema } from "./schema";

export const updateLinkAction = authActionClient
  .schema(updateLinkSchema)
  .metadata({
    name: "update-link",
  })
  .action(async ({ parsedInput: input, ctx: { user } }) => {
    if (!input.id) {
      throw new Error("Id is required");
    }

    const linkPayment = {
      ...input,
      updated_by: user.id,
    };

    const result = await updateLink(input.id, linkPayment);
    return result;
  });
