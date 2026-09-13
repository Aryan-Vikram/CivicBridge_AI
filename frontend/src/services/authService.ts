import type { Role, User } from "../types";

// Demo auth: mock JWT stored in localStorage. Swappable for POST /api/auth/login
// and POST /api/auth/register against a real backend without changing callers.

const DEMO_USERS: Record<Role, User> = {
  citizen: { id: "user-citizen", name: "Meera Kumari", email: "citizen@civicbridge.ai", role: "citizen", avatarInitials: "MK" },
  university: { id: "user-university", name: "Dr. A. Sharma", email: "university@civicbridge.ai", role: "university", avatarInitials: "AS", organization: "BIT Mesra" },
  government: { id: "user-government", name: "R. Prasad, IAS", email: "government@civicbridge.ai", role: "government", avatarInitials: "RP", organization: "Govt. of Jharkhand" },
  industry: { id: "user-industry", name: "Ananya Singh", email: "industry@civicbridge.ai", role: "industry", avatarInitials: "AN", organization: "Tata Steel Foundation" },
  admin: { id: "user-admin", name: "Platform Admin", email: "admin@civicbridge.ai", role: "admin", avatarInitials: "AD" },
};

const TOKEN_KEY = "civicbridge_session";

function delay<T>(value: T, ms = 500): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export const authService = {
  async loginDemo(role: Role): Promise<User> {
    const user = DEMO_USERS[role];
    localStorage.setItem(TOKEN_KEY, JSON.stringify({ token: `demo.${role}.token`, user }));
    return delay(user, 500);
  },

  async login(email: string, _password: string): Promise<User> {
    const match = Object.values(DEMO_USERS).find((u) => u.email.toLowerCase() === email.toLowerCase());
    const user = match ?? { ...DEMO_USERS.citizen, email, name: email.split("@")[0] };
    localStorage.setItem(TOKEN_KEY, JSON.stringify({ token: "demo.session.token", user }));
    return delay(user, 600);
  },

  async register(name: string, email: string, role: Role): Promise<User> {
    const user: User = { id: `user-${Date.now()}`, name, email, role, avatarInitials: name.slice(0, 2).toUpperCase() };
    localStorage.setItem(TOKEN_KEY, JSON.stringify({ token: "demo.session.token", user }));
    return delay(user, 600);
  },

  getSession(): User | null {
    try {
      const raw = localStorage.getItem(TOKEN_KEY);
      if (!raw) return null;
      return JSON.parse(raw).user as User;
    } catch {
      return null;
    }
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
  },
};
