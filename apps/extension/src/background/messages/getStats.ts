/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-empty-interface */
import type { RouterOutputs } from "@linked-out/api";
import type { PlasmoMessaging } from "@plasmohq/messaging";
import { trpc } from "..";
// import type { RouterInputs, RouterOutputs } from "@linked-out/api";

export interface GetStatsRequest {
	// reaction: RouterInputs["post"]["react"];
}

export interface GetStatsResponse {
  data: RouterOutputs["post"]["getPolkadotStats"] | null;
}

/**
 * This handles the request from the CS
 */
const handler: PlasmoMessaging.MessageHandler<GetStatsRequest, GetStatsResponse> = async (req, res) => {

  const data = await trpc.post.getPolkadotStats.query();
  
  res.send({
    data,
  });
};

export default handler;
