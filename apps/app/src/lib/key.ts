import { nanoid } from "nanoid";

export async function getRandomKey({
  prefix,
  long,
}: {
  prefix?: string;
  long?: boolean;
}): Promise<string> {
  let key = long ? nanoid(69) : nanoid();
  if (prefix) {
    key = `${prefix.replace(/^\/|\/$/g, "")}_${key}`;
  }

  return key;
}
