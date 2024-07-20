import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";
import { reactionType } from "@linked-out/db/schema";

import { protectedProcedure } from "../trpc";

export const postRouter = {
  react: protectedProcedure
    .input(z.object({ linkedinPostId: z.string(), reaction: z.enum(reactionType.enumValues) }))
    .mutation(({ ctx, _input }) => {
      return ctx.db.transaction(async (_trx) => {
        return true;
      });
    }),
} satisfies TRPCRouterRecord;
