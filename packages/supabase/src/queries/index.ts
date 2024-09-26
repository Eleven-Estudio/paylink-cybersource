import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import { logger } from "@v1/logger";
import { createClient } from "@v1/supabase/server";
import type { Link } from "../types/links";

export async function getUser() {
  const supabase = createClient();

  try {
    const result = await supabase.auth.getUser();

    return result;
  } catch (error) {
    logger.error(error);

    throw error;
  }
}

export async function getLinks(): Promise<PostgrestSingleResponse<Link[]>> {
  const supabase = createClient();

  try {
    const result = await supabase.from("links").select("*");

    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}
