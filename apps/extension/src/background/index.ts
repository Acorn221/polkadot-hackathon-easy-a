import type { AppRouter } from "@linked-out/api";
import superjson from "superjson";
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import env from "../misc/env";

const API_URL = env.PLASMO_PUBLIC_API_URL;

let cachedTRPCClient: Awaited<ReturnType<typeof createTRPCClient<AppRouter>>> | null = null;

export const getTRPCClient = () => {
  if(cachedTRPCClient){
    return cachedTRPCClient;
  }
  cachedTRPCClient = createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: API_URL,
        transformer: superjson,
        headers: {
          'x-trpc-source': 'extension',
        }
      }),
    ],
  });
  return cachedTRPCClient;
};

export type TRPCtype = ReturnType<typeof getTRPCClient>;

const trpc: TRPCtype = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: API_URL,
      transformer: superjson,
      headers: {
        'x-trpc-source': 'extension',
      }
    }),
  ],
});

export { trpc };
