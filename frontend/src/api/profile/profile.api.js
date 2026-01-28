import { apiPublic } from "../client/publicFetch";
import { apiAuth } from "../client/authFetch";

export async function getProfileApi() {
  return apiAuth.get(`/profile/`);
}

export async function updateProfileApi(memberData) {
  return apiPublic.put(`/profile/`, {
    body: JSON.stringify(memberData),
  });
}
