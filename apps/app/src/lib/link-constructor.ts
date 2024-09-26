import { punycode } from "./punycode";

export function linkConstructor({
  domain,
  key,
  pretty,
  searchParams,
}: {
  domain?: string;
  key?: string;
  pretty?: boolean;
  searchParams?: Record<string, string>;
}) {
  if (!domain) {
    return "";
  }

  let url = "";
  if (process.env.NODE_ENV === "development") {
    url = `http://localhost:3000${key && key !== "_root" ? `/${key}` : ""}`;
  }

  if (process.env.NODE_ENV === "production") {
    url = `https://${punycode(domain)}${key && key !== "_root" ? `/${punycode(key)}` : ""}`;
  }

  if (searchParams) {
    const search = new URLSearchParams();
    for (const [key, value] of Object.entries(searchParams)) {
      search.set(key, value);
    }
    url += `?${search.toString()}`;
  }

  return pretty ? url.replace(/^https?:\/\//, "") : url;
}
