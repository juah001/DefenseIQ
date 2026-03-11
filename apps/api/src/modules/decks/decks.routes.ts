import { Router } from "express";

export const decksRouter = Router();

const decks = [
  { id: 1, name: "Networking Fundamentals", published: true, owner: "Moses" },
  { id: 2, name: "Linux for SOC Analysts", published: false, owner: "Moses" }
];

decksRouter.get("/", (_req, res) => res.json(decks));

decksRouter.post("/", (req, res) => {
  res.json({
    message: "Deck created",
    deck: {
      id: Date.now(),
      name: req.body.name || "Untitled Deck",
      description: req.body.description || "",
      published: false
    }
  });
});
