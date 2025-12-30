import { createContext, useState } from "react";
import * as authService from "../services/auth.service.js";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(authService.isAuthenticated());

  async function login(username, password) {
    await authService.login(username, password);
    setIsAuth(true);
  }

  async function register(username, password) {
    await authService.register(username, password);
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
