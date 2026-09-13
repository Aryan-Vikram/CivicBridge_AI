import mongoose from "mongoose";

// The entire backend is designed to run without MongoDB connected.
// If MONGODB_URI is unreachable, every controller falls back to the
// in-memory demo store in services/demoStore.js so the API never 500s
// just because the database isn't provisioned yet.
export let isDbConnected = false;

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn("[db] MONGODB_URI not set — running in demo (in-memory) mode.");
    return;
  }
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
    isDbConnected = true;
    console.log("[db] Connected to MongoDB.");
  } catch (err) {
    console.warn("[db] Could not connect to MongoDB, falling back to demo mode:", err.message);
    isDbConnected = false;
  }
}
