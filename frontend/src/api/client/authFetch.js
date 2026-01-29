import { baseFetch } from "./index";

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
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
