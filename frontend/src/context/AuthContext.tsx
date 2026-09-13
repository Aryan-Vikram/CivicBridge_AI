import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Role, User } from "../types";
import { authService } from "../services/authService";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  loginDemo: (role: Role) => Promise<User>;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, role: Role) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(authService.getSession());
    setLoading(false);
  }, []);

  const value: AuthContextValue = {
    user,
    loading,
    loginDemo: async (role) => {
      const u = await authService.loginDemo(role);
      setUser(u);
      return u;
    },
    login: async (email, password) => {
      const u = await authService.login(email, password);
      setUser(u);
      return u;
    },
    register: async (name, email, role) => {
      const u = await authService.register(name, email, role);
      setUser(u);
      return u;
    },
    logout: () => {
      authService.logout();
      setUser(null);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
