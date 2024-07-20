import type { NextFetchEvent, NextRequest} from "next/server";
import { NextResponse } from "next/server";
 
import { MultiRegionRatelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { env } from "./env";
 
const euRedis = new Redis({
	url: env.UPSTASH_REDIS_REST_URL,
	token: env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new MultiRegionRatelimit({
  redis: [
    euRedis,
		// TODO: setup more regions
  ],
  limiter: MultiRegionRatelimit.slidingWindow(200, "1 h"),
});

export default async function middleware(
  request: NextRequest,
  event: NextFetchEvent,
): Promise<Response | undefined> {
  if (request.method === "OPTIONS") {
    return NextResponse.next();
  }

  const ip = request.ip ?? "127.0.0.1";
  const { success, limit, reset, remaining } =
    await ratelimit.limit(ip);
  return success
    ? NextResponse.next()
    : NextResponse.json({error: "Rate limit exceeded", limit, reset, remaining}, { status: 429, headers: {
      "Retry-After": reset.toString(),
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Request-Method": "*",
      "Access-Control-Allow-Methods": "OPTIONS, GET, POST",
      "Access-Control-Allow-Headers": "*",
    }});
};
 
export const config = {
  matcher: "/api/trpc/post.react",
};