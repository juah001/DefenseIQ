export type ReviewRating = "again" | "hard" | "good" | "easy";

export interface ReviewState {
  interval: number;
  easeFactor: number;
  repetitions: number;
}

export function updateReviewState(current: ReviewState, rating: ReviewRating): ReviewState {
  if (rating === "again") {
    return {
      interval: 1,
      easeFactor: Math.max(1.3, current.easeFactor - 0.2),
      repetitions: 0
    };
  }

  const multiplier =
    rating === "hard" ? 1.2 :
    rating === "easy" ? current.easeFactor + 0.15 :
    current.easeFactor;

  return {
    interval: Math.max(1, Math.round(current.interval * multiplier)),
    easeFactor: rating === "hard" ? Math.max(1.3, current.easeFactor - 0.05) : current.easeFactor,
    repetitions: current.repetitions + 1
  };
}
