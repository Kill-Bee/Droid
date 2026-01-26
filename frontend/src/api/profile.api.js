import { apiFetch } from "./client/index";

export async function getProfileApi() {
  return apiFetch(`/profile/`);
}

export async function updateProfileApi(memberData) {
  return apiFetch(`/profile/`, {
    method: "PUT",
    body: JSON.stringify(memberData),
  });
}