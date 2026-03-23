import { Router } from "express";
import { query } from "../../lib/db.js";

export const cardsRouter = Router();

cardsRouter.get("/due", async (_req, res) => {
  try {
    const result = await query(
      `
      SELECT
        id,
        front,
        back,
        due_date,
        created_at
      FROM cards
      ORDER BY due_date ASC, id ASC
      `
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Failed to fetch due cards:", error);
    res.status(500).json({ error: "Failed to fetch due cards" });
  }
});