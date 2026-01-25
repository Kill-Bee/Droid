import { apiFetch } from "./client/index";

export function loginApi(username, password) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export function registerApi(username, password, displayName) {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
      displayName,
    }),
  });
}
