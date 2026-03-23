import { Router } from "express";
import { z } from "zod";
import { query } from "../../lib/db.js";
import { requireAuth, AuthenticatedRequest } from "../../middleware/auth.js";

export const decksRouter = Router();

const createDeckSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional()
});

decksRouter.get("/", async (_req, res) => {
  const result = await query(
    `
    SELECT
      d.id,
      d.name,
      d.description,
      d.published,
      u.display_name AS owner
    FROM decks d
    LEFT JOIN users u ON u.id = d.owner_id
    ORDER BY d.created_at DESC
    `
  );

  res.json(result.rows);
});

decksRouter.post("/", requireAuth, async (req: AuthenticatedRequest, res) => {
  const parsed = createDeckSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json(parsed.error.flatten());
  }

  const result = await query(
    `
    INSERT INTO decks (owner_id, name, description, published)
    VALUES ($1, $2, $3, false)
    RETURNING id, name, description, published
    `,
    [req.user?.userId, parsed.data.name, parsed.data.description || null]
  );

  res.status(201).json({
    message: "Deck created",
    deck: result.rows[0]
  });
});
