import { getProfileService } from "../services/profile.service.js";

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
