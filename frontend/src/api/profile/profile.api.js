import { apiAuth } from "../client/authFetch";

export async function getProfileApi() {
  return apiAuth.get(`/profile`);
}

export async function updateProfileApi(memberData) {
  return apiAuth.put("/profile", memberData);
}
