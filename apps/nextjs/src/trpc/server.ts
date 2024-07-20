import { cache } from "react";
import { headers } from "next/headers";

import { createCaller, createTRPCContext } from "@linked-out/api";
import { env } from "../env";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rsc");
  // if(env.NODE_ENV === "development") {
    heads.set("Access-Control-Allow-Origin", "*");

  // } else {
  //   heads.set("Access-Control-Allow-Origin", "chrome-extension://dlcpbhmggchfghnagkpifgddnhgolgfg");

  // }

  return createTRPCContext({
    // session: await auth(),
    headers: heads,
  });
});

export const api = createCaller(createContext);
