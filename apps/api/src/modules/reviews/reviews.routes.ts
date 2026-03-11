import { Router } from "express";
import { updateReviewState } from "./spaced-repetition.js";

export const reviewsRouter = Router();

reviewsRouter.post("/", (req, res) => {
  const current = req.body.current || { interval: 1, easeFactor: 2.5, repetitions: 0 };
  const rating = req.body.rating || "good";
  const next = updateReviewState(current, rating);

  res.json({
    message: "Review submitted",
    nextReviewInDays: next.interval,
    nextState: next
  });
});
