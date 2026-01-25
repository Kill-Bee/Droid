const BASE_URL = "http://localhost:3000/api";

export const apiFetch = async (path, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let errorMessage = "Request failed";

    try {
      const errorBody = await res.json();
      errorMessage = errorBody?.message || errorBody?.error || errorMessage;
    } catch {
      // response bukan JSON
    }

    throw new Error(errorMessage);
  }

  return res.json();
};
