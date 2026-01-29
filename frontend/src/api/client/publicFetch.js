import { baseFetch } from "./index";

export const apiPublic = {
  get: (path) => baseFetch(path),

  post: (path, body) =>
    baseFetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    }),

  put: (path, body) =>
    baseFetch(path, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body,
    }),
};
