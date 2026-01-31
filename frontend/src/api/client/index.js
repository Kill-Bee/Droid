const BASE_URL = "http://localhost:3000/api";

export async function baseFetch(
  path,
  { method = "GET", body, headers = {} } = {},
) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  
  if (!res.ok) {
    let message = "Request failed";

    try {
      const err = await res.json();
      message = err?.message || err?.error || message;
    } catch {
      //
    }

    throw new Error(message);
  }

  if (res.status === 204) return null;

  return res.json();
}
