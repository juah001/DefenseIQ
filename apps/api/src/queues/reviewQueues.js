import { Queue } from "bullmq";
import { redis } from "../lib/redis.js";

export const reviewQueue = new Queue("reviews", {
  connection: redis
});

await reviewQueue.add("analyze-review", {
  reviewId: id
});