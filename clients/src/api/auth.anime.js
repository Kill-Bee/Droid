import { apiFetch } from "./client";

export const getAnimes = async () => {
  const response = await apiFetch("/anime");
  return response.json();
};

export const createAnime = async (title, description, coverImage, releaseYear) => {
  const response = await apiFetch("/anime", {
    method: "POST",
    body: JSON.stringify({ title, description, coverImage, releaseYear }),
  });
  return response.json();
};

export const updateAnime = async (id, title, description, coverImage, releaseYear) => {
  const response = await apiFetch(`/anime/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, description, coverImage, releaseYear }),
  });
  return response.json();
};

export const deleteAnime = async (id) => {
  const response = await apiFetch(`/anime/${id}`, {
    method: "DELETE",
  });
  return response.json();
};