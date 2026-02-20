import { loginApi, registerApi } from "../../api/auth/auth.api.js";

export async function login(username, password) {
  const data = await loginApi(username, password);
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  return data;
}

export async function register(username, password, displayName) {
  const data = await registerApi(username, password, displayName);
  return data;
}

export async function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function isAuthenticated() {
  return !!localStorage.getItem("token");
}

export function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}
