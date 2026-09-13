import { universities } from "../data/universities";

// Mirrors GET /api/universities, GET /api/universities/:id
function delay<T>(value: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export const universityService = {
  async getAll() {
    return delay(universities, 300);
  },
  async getById(id: string) {
    return delay(universities.find((u) => u.id === id), 200);
  },
};
