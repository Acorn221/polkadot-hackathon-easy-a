import type { TRPCRouterRecord } from "@trpc/server";

import { protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = {
  getPublicMessage: publicProcedure.query(({ ctx }) => {
    return "you can see this public message! " + JSON.stringify(ctx.clientId);
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can see this secret message!";
  }),
} satisfies TRPCRouterRecord;
