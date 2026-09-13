import type { Challenge, Milestone } from "../types";
import { problemService } from "./problemService";

// Mirrors GET /api/challenges/:id/timeline, POST /api/challenges/:id/milestones
function delay<T>(value: T, ms = 250): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export const trackingService = {
  async getTimeline(id: string): Promise<Milestone[]> {
    const challenge = await problemService.getById(id);
    return delay(challenge?.milestones ?? [], 200);
  },
  async getChallenge(id: string): Promise<Challenge | undefined> {
    return problemService.getById(id);
  },
};
