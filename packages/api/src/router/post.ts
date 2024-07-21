/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
 
 
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { TRPCRouterRecord } from "@trpc/server";
import { publicProcedure } from "../trpc";
import { ApiPromise, WsProvider } from '@polkadot/api';
import { assert } from "./utils";
import { z } from "zod";
import { env } from "../env";

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
        blockHeight: lastBlock.block.header.number.toNumber() as any as number,
        finalizedHeight: finalizedBlockHeader.number.toNumber() as any as number,
        validatorCount: validators.toHuman() as string[],
        totalIssuance: totalIssuance?.toHuman() as string[],
        activeNominators: nominators?.toHuman() as string[],
      };
    }),

    getRecentTransactions: publicProcedure
    .input(z.object({
      address: z.string(),
      page: z.number().optional().default(0),
      row: z.number().optional().default(10),
      direction: z.enum(['all', 'from', 'to']).optional().default('all'),
      currency: z.enum(['token', 'native']).optional().default('token'),
      // Add other optional fields as needed
    }))
    .query(async ({ input }) => {
      const apiKey = env.SUBSCAN_API_KEY; // Make sure to set this in your .env file

      const headers = new Headers({
        values: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        }
      })

      const body = JSON.stringify({
        address: input.address,
        page: input.page,
        row: input.row,
        direction: input.direction,
        currency: input.currency,
        // Add other fields from input as needed
      });

      try {
        const response = await fetch('https://polkadot.api.subscan.io/api/v2/scan/transfers', {
          method: 'POST',
          headers,
          body: body,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching transfers:', error);
        throw new Error('Failed to fetch transfers');
      }
    }),
} satisfies TRPCRouterRecord;