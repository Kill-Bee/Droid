import { getProfile, updateMember } from "../models/profile.model.js";

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

export async function updateProfileService(userId, memberData) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const updatedMember = await updateMember(userId, memberData);

  if (!updatedMember) {
    throw new Error("Failed to update profile");
  }

  return updatedMember;
}
