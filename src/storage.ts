import { Devvit } from "@devvit/public-api";
import { DrawingChain } from "./types.js";

const KEYS = {
  CHAIN: (chainId: string) => `chain:${chainId}`,
  USER_SCORE: (userId: string) => `user:${userId}:score`,
  ACTIVE_CHAINS: "active_chains_hash"
};

export async function saveDrawingChain(
  chain: DrawingChain,
  context: Devvit.Context
) {
  // saving the chain data 
  await context.redis.set(KEYS.CHAIN(chain.id), JSON.stringify(chain));
  // track active chains
  if (chain.isActive) {
    await context.redis.hSet(KEYS.ACTIVE_CHAINS, {
      [chain.id]: JSON.stringify({
        themeId: chain.themeId,
        createdAt: chain.createdAt,
      }),
    });
  } else {
    // if chain is no longer active, remove it from active chains
    await context.redis.del(KEYS.CHAIN(chain.id));
  }
}

export async function getActiveChains(context: Devvit.Context): Promise<string[]> {
  const activeChains = await context.redis.hGetAll(KEYS.ACTIVE_CHAINS);
  return Object.keys(activeChains || {});
}

export async function getDrawingChain(
  chainId: string,
  context: Devvit.Context
): Promise<DrawingChain | null> {
  const data = await context.redis.get(KEYS.CHAIN(chainId));
  return data ? JSON.parse(data) : null;
}

export async function updateUserScore(
  userId: string,
  points: number,
  context: Devvit.Context
) {
  const key = KEYS.USER_SCORE(userId);
  const currentScore = await context.redis.get(key);
  const newScore = (parseInt(currentScore || "0") + points).toString();
  await context.redis.set(key, newScore);
}
