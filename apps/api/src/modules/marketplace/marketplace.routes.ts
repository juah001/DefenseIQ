import { Router } from "express";
import { z } from "zod";
import { query } from "../../lib/db.js";

export const marketplaceRouter = Router();

const publishSchema = z.object({
  deckId: z.number(),
});

marketplaceRouter.get("/decks", async (_req, res) => {
  try {
    const result = await query(
      `
      SELECT
        ml.id,
        d.name AS title,
        ml.rating,
        ml.downloads,
        COALESCE(u.display_name, 'Community') AS author,
        COALESCE(d.description, '') AS description
      FROM marketplace_listings ml
      JOIN decks d ON d.id = ml.deck_id
      LEFT JOIN users u ON u.id = d.owner_id
      ORDER BY ml.published_at DESC
      `
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Failed to fetch marketplace decks:", error);
    res.status(500).json({ error: "Failed to fetch marketplace decks" });
  }
});

marketplaceRouter.post("/publish", async (req, res) => {
  const parsed = publishSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json(parsed.error.flatten());
  }

  try {
    const inserted = await query(
      `
      INSERT INTO marketplace_listings (deck_id, rating, downloads)
      VALUES ($1, 5.0, 0)
      RETURNING id, deck_id
      `,
      [parsed.data.deckId]
    );

    const listingId = inserted.rows[0]?.id;

    const listing = await query(
      `
      SELECT
        ml.id,
        d.name AS title,
        ml.rating,
        ml.downloads,
        COALESCE(u.display_name, 'Community') AS author,
        COALESCE(d.description, '') AS description
      FROM marketplace_listings ml
      JOIN decks d ON d.id = ml.deck_id
      LEFT JOIN users u ON u.id = d.owner_id
      WHERE ml.id = $1
      `,
      [listingId]
    );

    res.status(201).json({
      message: "Deck published",
      listing: listing.rows[0],
    });
  } catch (error) {
    console.error("Failed to publish deck:", error);
    res.status(500).json({ error: "Failed to publish deck" });
  }
});