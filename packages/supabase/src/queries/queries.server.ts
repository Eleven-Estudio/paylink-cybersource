import { logger } from "@v1/logger";
import { createClient } from "@v1/supabase/server";

export const getLinkPublic = async (key: string) => {
  const supabase = createClient();

  try {
    const result = await supabase
      .from("links")
      .select("title, description, amount, currency, id, key")
      .eq("key", key)
      .eq("active", true)
      .single();

    return result.data;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
