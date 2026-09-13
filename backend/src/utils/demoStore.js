// In-memory fallback store used whenever MongoDB isn't connected.
// Mirrors the shape of the Mongoose models closely enough that
// controllers can use either interchangeably.
export const demoStore = {
  problems: [],
  users: [],
  notifications: [],
};
