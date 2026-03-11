import { Router } from "express";

export const analyticsRouter = Router();

analyticsRouter.get("/progress", (_req, res) => {
  res.json({
    cardsReviewedToday: 47,
    studyStreak: 12,
    accuracy: 86,
    masteryLevel: 68,
    weakTopics: ["Cryptography", "Web Exploitation"],
    strongTopics: ["Linux", "Networking"],
    weeklyReviews: [12, 19, 26, 33, 30, 42, 47]
  });
});
