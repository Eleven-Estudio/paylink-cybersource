import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import { logger } from "@v1/logger";
import { createClient } from "@v1/supabase/server";
import type { Link, LinkPublicData } from "../types/links";

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

export async function getLink(key: string): Promise<LinkPublicData | null> {
  const supabase = createClient();

  try {
    const result = await supabase
      .from("links")
      .select("title, description, amount, currency, id")
      .eq("key", key)
      .eq("active", true)
      .single();

    if (!result.data) return null;

    return result?.data;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}
