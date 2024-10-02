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
    .select("*, user:users(name, email, avatar_url)")
    .order("created_at", { ascending: false })
    .throwOnError();
};
