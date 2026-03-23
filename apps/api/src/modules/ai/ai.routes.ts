import { Router } from "express";

export const aiRouter = Router();

aiRouter.post("/generate-flashcards", (req, res) => {
  const text = String(req.body.text || "");
  const lines = text.split(/\n+/).filter(Boolean).slice(0, 5);

  const cards = lines.map((line, index) => ({
    id: index + 1,
    question: `What is a key point from line ${index + 1}?`,
    answer: line
  }));

  res.json({
    message: "Flashcards generated (scaffold mode)",
    cards
  });
});

aiRouter.post("/youtube-flashcards", (req, res) => {
  res.json({
    message: "YouTube transcript parsing scaffold created",
    inputUrl: req.body.url,
    note: "Plug in transcript retrieval + LLM generation here."
  });
});
