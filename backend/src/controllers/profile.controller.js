import { getProfileService, updateProfileService } from "../services/profile.service.js";

export async function getProfileData(req, res) {
  try {
    const userId = req.user.id;
    const profile = await getProfileService(userId);
    res.json(profile);
  } catch (err) {
    console.error(err);

    if (err.message === "User not found") {
      res.status(404).json({ error: err.message });
    }

    res.status(500).json({ error: "Failed to fetch profile" });
  }
}

export async function updateProfileData(req, res) {
  try {
    const userId = req.user.id;
    const { displayName, avatar, badge, banner, bio } = req.body;
    const memberData = { displayName, avatar, badge, banner, bio };
    const updatedMember = await updateProfileService(userId, memberData);
    res.json({
      message: "Profile updated successfully",
      member: updatedMember,
    });
  } catch (err) {
    console.error(err);

    if (err.message === "Failed to update profile") {
      return res.status(400).json({ error: err.message });
    }

    res.status(500).json({ error: "Failed to update profile" });
  }
}
