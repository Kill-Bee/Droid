import { getProfileApi, updateProfileApi } from "../api/profile.api";

export async function getMyProfile() {
  return await getProfileApi();
}

export async function updateMyProfile(memberData) {
  return await updateProfileApi(memberData);
}