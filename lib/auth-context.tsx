"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { AuthContextValue, HRUser, LoginResponse } from "./_types/auth";

export type { HRUser } from "./_types/auth";


const AuthContext = createContext<AuthContextValue | null>(null);
const AUTH_KEY = "kantor_hr_session";
const TOKEN_KEY = "kantor_hr_access_token";
const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL?.replace(/\/$/, "") || "http://localhost:3040";

export function isHRRole(role: unknown): role is "HR" {
  return typeof role === "string" && role.trim().toUpperCase() === "HR";
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<HRUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      const saved = localStorage.getItem(AUTH_KEY);
      if (saved) {
        try {
          const savedUser = JSON.parse(saved) as Partial<HRUser>;
          if (isHRRole(savedUser.role) && savedUser.email && savedUser.name) {
            setUser({
              employeeId: savedUser.employeeId || "",
              name: savedUser.name,
              email: savedUser.email,
              photo: savedUser.photo || null,
              role: "HR",
              phoneNumber: savedUser.phoneNumber || "",
            });
          } else {
            localStorage.removeItem(AUTH_KEY);
            localStorage.removeItem(TOKEN_KEY);
          }
        } catch {
          localStorage.removeItem(AUTH_KEY);
          localStorage.removeItem(TOKEN_KEY);
        }
      }
      setIsLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const isLogin = pathname === "/login";
    if (!user && !isLogin) router.replace("/login");
    if (user && isLogin) router.replace("/employees");
  }, [isLoading, pathname, router, user]);

  const login = async (email: string, password: string) => {
    const response = await fetch(`${GATEWAY_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim(), password }),
    });

    const result = await response.json().catch(() => null) as LoginResponse | null;
    if (!response.ok || !result?.success) {
      throw new Error(result?.message || "Sign in failed.");
    }

    const loginUser = result.data;
    if (!loginUser || !isHRRole(loginUser.role)) {
      throw new Error("Access denied. Only HR users can sign in.");
    }

    const accessToken = loginUser.access_token || result.access_token;
    if (!accessToken) {
      throw new Error("Login succeeded but no access token was returned.");
    }

    const hrUser: HRUser = {
      employeeId: loginUser.employeeId || "",
      name: loginUser.name || "",
      email: loginUser.email || email.trim(),
      photo: loginUser.photo || null,
      role: "HR",
      phoneNumber: loginUser.phoneNumber || "",
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(hrUser));
    localStorage.setItem(TOKEN_KEY, accessToken);
    setUser(hrUser);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    router.replace("/login");
  };

  return <AuthContext.Provider value={{ user, isLoading, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used within AuthProvider");
  return value;
}
