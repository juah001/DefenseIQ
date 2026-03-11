import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { authRouter } from "./modules/auth/auth.routes.js";
import { decksRouter } from "./modules/decks/decks.routes.js";
import { cardsRouter } from "./modules/cards/cards.routes.js";
import { reviewsRouter } from "./modules/reviews/reviews.routes.js";
import { analyticsRouter } from "./modules/analytics/analytics.routes.js";
import { marketplaceRouter } from "./modules/marketplace/marketplace.routes.js";
import { aiRouter } from "./modules/ai/ai.routes.js";
import { tutorRouter } from "./modules/tutor/tutor.routes.js";
import { codeRunnerRouter } from "./modules/code-runner/code-runner.routes.js";
import { labsRouter } from "./modules/labs/labs.routes.js";

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ name: "Tech Learning Platform API", status: "ok" });
});

app.use("/auth", authRouter);
app.use("/decks", decksRouter);
app.use("/cards", cardsRouter);
app.use("/reviews", reviewsRouter);
app.use("/analytics", analyticsRouter);
app.use("/marketplace", marketplaceRouter);
app.use("/ai", aiRouter);
app.use("/tutor", tutorRouter);
app.use("/code-runner", codeRunnerRouter);
app.use("/labs", labsRouter);

const port = Number(process.env.PORT || 5000);
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
