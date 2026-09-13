import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { isDbConnected } from "../utils/db.js";
import { demoStore } from "../utils/demoStore.js";

function sign(user) {
  return jwt.sign({ id: user._id || user.id, role: user.role, name: user.name }, process.env.JWT_SECRET || "dev_secret", { expiresIn: "7d" });
}

export async function register(req, res, next) {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) return res.status(400).json({ error: "name, email, password and role are required" });

    const passwordHash = await bcrypt.hash(password, 10);

    if (isDbConnected) {
      const existing = await User.findOne({ email });
      if (existing) return res.status(409).json({ error: "Email already registered" });
      const user = await User.create({ name, email, passwordHash, role });
      return res.status(201).json({ token: sign(user), user: { id: user._id, name, email, role } });
    }

    const user = { id: `demo-${Date.now()}`, name, email, role, passwordHash };
    demoStore.users.push(user);
    return res.status(201).json({ token: sign(user), user: { id: user.id, name, email, role } });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "email and password are required" });

    const user = isDbConnected ? await User.findOne({ email }) : demoStore.users.find((u) => u.email === email);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    return res.json({ token: sign(user), user: { id: user._id || user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    next(err);
  }
}
