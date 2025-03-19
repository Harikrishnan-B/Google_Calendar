import express from "express";
import axios from "axios";
import User from "../models/User.js";

const router = express.Router();

router.post("/google", async (req, res) => {
  try {
    const { credential } = req.body;

    const response = await axios.get("https://www.googleapis.com/oauth2/v1/userinfo", {
      headers: {
        Authorization: `Bearer ${credential}`,
      },
    });

    const payload = response.data;

    let user = await User.findOne({ email: payload.email });
    if (!user) {
      user = new User({
        googleId: payload.id,
        email: payload.email,
        displayName: payload.name,
        profilePicture: payload.picture,
      });
      await user.save();
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        googleId: payload.id,
        email: payload.email,
        displayName: payload.name,
        profilePicture: payload.picture,
      },
    });
  } catch (error) {
    console.error("Google auth error:", error);
    res.status(400).json({ success: false, message: "Authentication failed" });
  }
});

export default router;