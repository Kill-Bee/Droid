import { createContext, useState } from "react";
import * as authService from "../services/auth/auth.service.js";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(authService.isAuthenticated());
  const [user, setUser] = useState(authService.getUser());

  async function login(username, password) {
    const data = await authService.login(username, password);
    if (!data?.token) throw new Error("Invalid login response");
    setIsAuth(true);
    setUser(data.user);
  }

  async function register(username, password, displayName) {
    await authService.register(username, password, displayName);
  }

  function logout() {
    authService.logout();
    setIsAuth(false);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ isAuth, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
