import "server-only";

import { Redis } from "@upstash/redis";

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

// `new Redis()` throws synchronously at module load when the url/token are
// missing or empty. Because this module is imported by every server action
// (through the rate-limit middleware), that throw would crash the serverless
// function with FUNCTION_INVOCATION_FAILED before any error handling runs.
// Only instantiate the client when the connection details are actually present.
export const client = url && token ? new Redis({ url, token }) : null;
