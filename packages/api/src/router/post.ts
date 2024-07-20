 
 
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { TRPCRouterRecord } from "@trpc/server";
import { publicProcedure } from "../trpc";
import { ApiPromise, WsProvider } from '@polkadot/api';
import { assert } from "./utils";

let api: ApiPromise | null = null;

async function connectApi(): Promise<void> {
  if (!api) {
    const provider = new WsProvider('wss://rpc.polkadot.io');
    api = await ApiPromise.create({ provider });
    api.query
  }
}

export const postRouter = {
  getPolkadotStats: publicProcedure
    .query(async () => {
      await connectApi();
      assert(!!api, 'API not connected');
      if(api.query.session == null) {
        throw new Error('API not connected');
      }
      if(!api.query.timestamp) return;

      // const x = await api.query.timestamp.now();
      const [
        lastBlock,
        finalizedBlock,
        validators,
        totalIssuance,
        nominators,
      ] = await Promise.all([
        api.rpc.chain.getBlock(),
        api.rpc.chain.getFinalizedHead(),
                        // @ts-expect-error yeet
        api.query.session.validators(),
                // @ts-expect-error yeet
        api.query.balances?.totalIssuance(),
                // @ts-expect-error yeet
        api.query.staking?.counterForNominators(),
      ]);

      assert(!!finalizedBlock, 'Last block not found');

      const finalizedBlockHeader = await api.rpc.chain.getHeader(finalizedBlock);

      return {
        blockHeight: lastBlock.block.header.number.toNumber(),
        finalizedHeight: finalizedBlockHeader.number.toNumber(),
        validatorCount: validators.toHuman() as string[],
        totalIssuance: totalIssuance?.toHuman() as string[],
        activeNominators: nominators?.toHuman() as string[],
      };
    }),
} satisfies TRPCRouterRecord;