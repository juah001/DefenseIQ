import { Router } from "express";
import { z } from "zod";
import { query } from "../../lib/db.js";
import { requireAuth, AuthenticatedRequest } from "../../middleware/auth.js";

export const cardsRouter = Router();

const createCardSchema = z.object({
  deckId: z.number(),
  type: z.string().min(1),
  question: z.string().min(1),
  answer: z.string().min(1)
});

cardsRouter.get("/due", async (_req, res) => {
  const result = await query(
    `
    SELECT id, deck_id AS "deckId", type, question, answer
    FROM cards
    ORDER BY id ASC
    LIMIT 20
    `
  );

  res.json(result.rows);
});

cardsRouter.post("/", requireAuth, async (req: AuthenticatedRequest, res) => {
  const parsed = createCardSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json(parsed.error.flatten());
  }

  const result = await query(
    `
    INSERT INTO cards (deck_id, type, question, answer)
    VALUES ($1, $2, $3, $4)
    RETURNING id, deck_id AS "deckId", type, question, answer
    `,
    [
      parsed.data.deckId,
      parsed.data.type,
      parsed.data.question,
      parsed.data.answer
    ]
  );

  res.status(201).json({
    message: "Card created",
    card: result.rows[0]
  });
});
