import { apiAuth } from "../client/authFetch";

export function loginApi(username, password) {
  return apiAuth.post("/auth/login", {
    username,
    password,
  });
}

export function registerApi(username, password, displayName) {
  return apiAuth.post("/auth/register", {
    username,
    password,
    displayName,
  });
}
