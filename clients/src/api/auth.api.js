import { apiFetch } from "./client.js";

export function loginApi(username, password) {
  return apiFetch("/users/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export function registerApi(username, email, password) {
  return apiFetch("/users/register", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
  });
}
