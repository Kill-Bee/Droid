import { getProfileApi } from "../api/profile.api";

export async function getMyProfile() {
  return await getProfileApi();
}
