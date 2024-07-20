import { AnalyticsEvent, getClientId } from "@/misc/GA";
import { Storage } from "@plasmohq/storage";
import browser from "webextension-polyfill";
import type { AppRouter } from "@linked-out/api";
import superjson from "superjson";
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { ReactionManager } from "../misc/reactionManager";

const API_URL = process.env.PLASMO_PUBLIC_API_URL || "https://linkedout.lol/api/trpc";

const storage = new Storage({
  area: "sync",
});

let cachedTRPCClient: Awaited<ReturnType<typeof createTRPCClient<AppRouter>>> | null = null;

export const getTRPCClient = async () => {
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
          'x-trpc-client-id': await getClientId(),
        }
      }),
    ],
  });
  return cachedTRPCClient;
};

export type TRPCtype = Awaited<ReturnType<typeof getTRPCClient>>;

let cachedReactionManager: ReactionManager | null = null;

export const getReactionManager = async () => {
  if(cachedReactionManager){
    return cachedReactionManager;
  }
  cachedReactionManager = new ReactionManager(await getTRPCClient(), storage);
  return cachedReactionManager;
};

/**
 * When the user first installs the extension, open the main page
 */
browser.runtime.onInstalled.addListener((object) => {
  (async () => {
    if (object.reason === "install") {
      const platform = await browser.runtime.getPlatformInfo();
      AnalyticsEvent([
        {
          name: "install",
          params: {
            platform: platform.os,
            version: browser.runtime.getManifest().version,
          },
        },
      ]).catch((e) => console.error('Error in AnalyticsEvent', e));
  
      const trpc = await getTRPCClient();
      
      await trpc.auth.registerUser.mutate({
        clientId: await getClientId(),
      })
    } else if(object.reason === "update") {
      const platform = await browser.runtime.getPlatformInfo();
      AnalyticsEvent([
        {
          name: "update",
          params: {
            platform: platform.os,
            version: browser.runtime.getManifest().version,
          },
        },
      ]).catch((e) => console.error('Error in AnalyticsEvent', e));
    }
    const clientId = await getClientId();
    await browser.runtime.setUninstallURL(
      `https://www.linkedout.lol/uninstall?clientId=${clientId}`,
    );
  })().catch(e => console.error(e));
});
