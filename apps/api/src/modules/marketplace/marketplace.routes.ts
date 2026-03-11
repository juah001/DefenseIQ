import { Router } from "express";

export const marketplaceRouter = Router();

const publishedDecks = [
  { id: 1, title: "Security+ Master Deck", rating: 4.9, downloads: 10234, author: "Community" },
  { id: 2, title: "Linux Command Mastery", rating: 4.8, downloads: 8021, author: "Community" },
  { id: 3, title: "SOC Analyst Triage Scenarios", rating: 4.7, downloads: 4099, author: "DefenseIQ" }
];

marketplaceRouter.get("/decks", (_req, res) => res.json(publishedDecks));

marketplaceRouter.post("/publish", (req, res) => {
  res.json({
    message: "Deck published",
    listing: {
      id: Date.now(),
      title: req.body.title || "Untitled Deck",
      author: req.body.author || "Anonymous",
      rating: 5.0,
      downloads: 0
    }
  });
});
