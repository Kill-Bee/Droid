import { apiFetch } from "./client/index";

export async function getProfileApi() {
  return apiFetch(`/profile/me`);
}
