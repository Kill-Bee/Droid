import { loginApi, registerApi } from "../api/auth.api.js";

export async function login(username, password) {
  return loginApi(username, password);
}

export async function register(username, password) {
  return registerApi(username, password);
}

export async function logout() {
  localStorage.removeItem("token");
}

export async function isAuthenticated() {
  return !!localStorage.getItem("token");
}