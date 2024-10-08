import { logger } from "@v1/logger";
import { createClient } from "@v1/supabase/server";
import type { TablesInsert, TablesUpdate } from "../types";

export async function insertLink(data: TablesInsert<"links">) {
  const supabase = createClient();

  try {
    const result = await supabase.from("links").insert(data).select();

    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

export async function updateLink(linkId: number, data: TablesUpdate<"links">) {
  const supabase = createClient();

  try {
    const result = await supabase.from("links").update(data).eq("id", linkId);

    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

export async function registerView(key: string) {
  const supabase = createClient();

  try {
    const result = await supabase.rpc("increment_view_link", {
      x: 1,
      keylink: key,
    });

    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

export async function updateUser(userId: string, data: TablesUpdate<"users">) {
  const supabase = createClient();

  try {
    const result = await supabase.from("users").update(data).eq("id", userId);

    return result;
  } catch (error) {
    logger.error(error);

    throw error;
  }
}

export async function registerTransaction(data: TablesInsert<"transactions">) {
  const supabase = createClient();

  try {
    const result = await supabase.from("transactions").insert(data);
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}
