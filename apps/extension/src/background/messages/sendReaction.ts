import type { PlasmoMessaging } from "@plasmohq/messaging";
import { getReactionManager } from "..";
import type { RouterInputs, RouterOutputs } from "@linked-out/api";
import { AnalyticsEvent } from "../../misc/GA";

export interface SendReactionRequest {
	reaction: RouterInputs["post"]["react"];
}

export interface SendReactionResponse {
  data: RouterOutputs["post"]["react"] | null;
}

/**
 * This handles the request from the CS
 */
const handler: PlasmoMessaging.MessageHandler<SendReactionRequest, SendReactionResponse> = async (req, res) => {
  if(!req.body?.reaction) {
    return res.send({
      data: null,
    });
  }

	const { reaction } = req.body;

  const reactionManager = await getReactionManager();

  const data = await reactionManager.handleReaction(reaction);

  AnalyticsEvent([
    {
      name: "reaction",
      params: {
        action: "send",
        label: reaction.reaction,
      },
    },
  ]).catch((e) => {
    console.error("Error sending analytics event", e);
  });
  
  res.send({
    data,
  });
};

export default handler;
