import { loginApi, registerApi } from "../api/auth.api.js";

export async function login(username, password) {
  const data = await loginApi(username, password);
  localStorage.setItem("token", data.token);
  return data;
}

export async function register(username, password, displayName) {
  const data = await registerApi(username, password, displayName);
  return data;
}

export async function logout() {
  localStorage.removeItem("token");
}

export function isAuthenticated() {
  return !!localStorage.getItem("token");
}
