import { apiPublic } from "../client/publicFetch";

export function loginApi(username, password) {
  return apiPublic.post("/auth/login", {
    username,
    password,
  });
}

export function registerApi(username, password, displayName) {
  return apiPublic.post("/auth/register", {
    username,
    password,
    displayName,
  });
}
