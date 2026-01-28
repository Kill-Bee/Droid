import { baseFetch } from "./index";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export const apiAuth = {
  get: (path) =>
    baseFetch(path, {
      headers: getAuthHeaders(),
    }),

  post: (path, body) =>
    baseFetch(path, {
      method: "POST",
      headers: getAuthHeaders(),
      body,
    }),

  put: (path, body) =>
    baseFetch(path, {
      method: "PUT",
      headers: getAuthHeaders(),
      body,
    }),

  delete: (path) =>
    baseFetch(path, {
      method: "DELETE",
      headers: getAuthHeaders(),
    }),
};
