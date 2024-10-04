import type { Client } from "../types";

export const getUser = (client: Client, userId: string) => {
  return client
    .from("users")
    .select("*")
    .eq("id", userId)
    .throwOnError()
    .single();
};

export const getLinks = (client: Client) => {
  return client
    .from("links")
    .select("*, created_by(name, email, avatar_url)")
    .order("created_at", { ascending: false })
    .throwOnError();
};

export const getLink = (client: Client, linkId: number) => {
  return client
    .from("links")
    .select("*")
    .eq("id", linkId)
    .throwOnError()
    .single();
};

export const getTransactions = (client: Client, linkId: number) => {
  return client
    .from("transactions")
    .select("*")
    .eq("link_id", linkId)
    .order("created_at", { ascending: false })
    .throwOnError();
};
