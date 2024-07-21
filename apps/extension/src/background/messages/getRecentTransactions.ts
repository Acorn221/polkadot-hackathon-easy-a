/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
 import type { PlasmoMessaging } from "@plasmohq/messaging";
import { trpc } from "..";
import type { RouterInputs, RouterOutputs } from "@linked-out/api";
import { assert } from "../../lib/utils";

export interface GetRecentTransactionsRequest {
	data: RouterInputs["post"]["getRecentTransactions"];
}

export interface GetRecentTransactionsResponse {
  data: RouterOutputs["post"]["getRecentTransactions"];
}

/**
 * This handles the request from the CS
 */
const handler: PlasmoMessaging.MessageHandler<GetRecentTransactionsRequest, GetRecentTransactionsResponse> = async (req, res) => {
	assert(!!req.body, 'body is required');
	
	const { address } = req.body.data;

  const data = await trpc.post.getRecentTransactions.query({
		address,
		currency: "native",
	});
  
  res.send({
    data,
  });
};

export default handler;
