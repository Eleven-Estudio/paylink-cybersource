import "server-only";

import { Ratelimit } from "@upstash/ratelimit";
import { client } from ".";

export type RatelimitResult = {
  success: boolean;
  remaining: number;
};

export type Ratelimiter = {
  limit: (identifier: string) => Promise<RatelimitResult>;
};

// Fail-open limiter used when Upstash isn't configured (e.g. the
// UPSTASH_REDIS_REST_* env vars are missing at runtime). Rate limiting is a
// safeguard, not a hard dependency: if it can't run we let the request through
// instead of taking down the whole server action.
const noopRatelimit: Ratelimiter = {
  limit: async () => ({
    success: true,
    remaining: Number.POSITIVE_INFINITY,
  }),
};

export const ratelimit: Ratelimiter = client
  ? new Ratelimit({
      limiter: Ratelimit.fixedWindow(10, "10s"),
      redis: client,
    })
  : noopRatelimit;
