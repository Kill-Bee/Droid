import { getProfile } from "../models/profile.model.js";

export async function getProfileService(userId) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const profile = await getProfile(userId);
  
  if (!profile) {
    throw new Error("User not found");
  }

  return profile;
}
