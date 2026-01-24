import { createContext, useState } from "react";
import * as authService from "../services/auth.service.js";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(authService.isAuthenticated());

  async function login(username, password) {
    const data = await authService.login(username, password);
    if (!data?.token) throw new Error("Invalid login response");
    setIsAuth(true);
  }

  async function register(username, password, avatar) {
    await authService.register(username, password, avatar);
    setIsAuth(true);
  }

  function logout() {
    authService.logout();
    setIsAuth(false);
  }

  return (
    <AuthContext.Provider value={{ isAuth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
