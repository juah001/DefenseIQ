import { Router } from "express";

export const tutorRouter = Router();

tutorRouter.post("/ask", (req, res) => {
  const topic = req.body.topic || "general topic";
  const question = req.body.question || "Explain this simply.";

  res.json({
    topic,
    question,
    answer: `Here is a tutor-style explanation for ${topic}. Start with the big idea, then walk through an example, then test understanding with a short question.`,
    followUpQuiz: [
      `What is the main purpose of ${topic}?`,
      `Can you explain ${topic} in your own words?`
    ]
  });
});
