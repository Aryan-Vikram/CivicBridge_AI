import type { Challenge } from "../types";
import { challenges as seedChallenges } from "../data/challenges";

// Mirrors backend routes:
// GET /api/problems, POST /api/problems, GET /api/problems/:id, PUT /api/problems/:id
// Persists newly submitted (demo) challenges to localStorage so the flow feels real
// across a session without requiring MongoDB to be connected.

const STORAGE_KEY = "civicbridge_submitted_challenges";

function loadSubmitted(): Challenge[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Challenge[]) : [];
  } catch {
    return [];
  }
}

function saveSubmitted(list: Challenge[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    /* storage unavailable — fail silently, demo mode continues in-memory */
  }
}

function delay<T>(value: T, ms = 400): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export const problemService = {
  async getAll(): Promise<Challenge[]> {
    return delay([...loadSubmitted(), ...seedChallenges], 300);
  },

  async getById(id: string): Promise<Challenge | undefined> {
    const all = [...loadSubmitted(), ...seedChallenges];
    return delay(all.find((c) => c.id === id || c.displayId === id), 200);
  },

  async create(challenge: Challenge): Promise<Challenge> {
    const list = loadSubmitted();
    list.unshift(challenge);
    saveSubmitted(list);
    return delay(challenge, 300);
  },

  nextDisplayId(): string {
    const n = 10600 + Math.floor(Math.random() * 900);
    return `CB-JH-2026-${n}`;
  },
};
