Root

.gitignore
Tells Git which files and folders not to track, like node_modules, build outputs, and local env files.

README.md
Explains what the project is, what’s included, and how to run it.

package.json
Defines the monorepo root and workspace structure so multiple apps/packages can live in one repo.

docker-compose.yml
Starts local infrastructure services, here mainly PostgreSQL and Redis.

scripts/setup.sh
Convenience script to start the required local dependencies quickly.

Frontend: apps/web

apps/web/package.json
Defines the frontend app dependencies and scripts like npm run dev.

apps/web/next.config.mjs
Holds Next.js configuration.

apps/web/app/globals.css
Global styles shared across the frontend.

apps/web/app/layout.js
The main shared page layout for the app, including navigation and global wrapper.

apps/web/app/page.js
Dashboard homepage showing the top-level overview of the platform.

apps/web/app/study/page.js
Study screen that fetches due cards and displays flashcard review UI.

apps/web/app/marketplace/page.js
Shows published decks from the marketplace.

apps/web/app/analytics/page.js
Displays user progress and learning metrics.

apps/web/app/ai/page.js
UI page for AI flashcard generation from pasted notes or content.

apps/web/app/tutor/page.js
UI page for the AI tutor where users ask questions and get explanations.

apps/web/app/labs/page.js
Lists cybersecurity labs and gives users a way to start them.

Backend: apps/api

apps/api/package.json
Defines backend dependencies and scripts for running the API.

apps/api/tsconfig.json
TypeScript compiler settings for the backend.

apps/api/.env.example
Example environment variables needed for local setup, like DB URL and JWT secret.

apps/api/src/server.ts
The main backend entry point. Starts Express, applies middleware, and mounts all API routes.

Backend shared logic

apps/api/src/lib/auth.ts
Contains auth helper functions, here mainly JWT token signing.

Backend modules
Auth

apps/api/src/modules/auth/auth.routes.ts
Handles registration and login endpoints.

Decks

apps/api/src/modules/decks/decks.routes.ts
Manages deck-related operations like listing and creating decks.

Cards

apps/api/src/modules/cards/cards.routes.ts
Handles card retrieval and creation, including fetching cards due for review.

Reviews / Spaced repetition

apps/api/src/modules/reviews/spaced-repetition.ts
Contains the review scheduling logic that decides when a card should appear again.

apps/api/src/modules/reviews/reviews.routes.ts
API endpoint for submitting review results and getting the next review state.

Analytics

apps/api/src/modules/analytics/analytics.routes.ts
Returns learning metrics like streak, accuracy, and topic strengths/weaknesses.

Marketplace

apps/api/src/modules/marketplace/marketplace.routes.ts
Lists published decks and handles publishing a deck to the marketplace.

AI

apps/api/src/modules/ai/ai.routes.ts
Scaffold endpoints for generating flashcards from notes or video/transcript input.

Tutor

apps/api/src/modules/tutor/tutor.routes.ts
Scaffold endpoint for AI tutoring responses and follow-up quiz prompts.

Code runner

apps/api/src/modules/code-runner/code-runner.routes.ts
Placeholder endpoint for code execution. Later this would connect to a secure sandbox.

Labs

apps/api/src/modules/labs/labs.routes.ts
Lists labs and provides a scaffold endpoint to start a lab session.

Worker: apps/worker

apps/worker/package.json
Defines the worker service metadata and scripts.

apps/worker/src/index.js
Entry point for background jobs such as AI processing, analytics aggregation, or lab provisioning.

Shared package: packages/shared

packages/shared/package.json
Defines the shared internal package.

packages/shared/src/types.ts
Shared TypeScript types that can be reused by frontend and backend.

Database: database

database/schema.sql
Defines the PostgreSQL tables for users, decks, cards, reviews, and marketplace listings.

database/seeds/sample-data.sql
Provides starter data so the app has demo content after setup.

Labs: labs

labs/dvwa/lab-config.json
Configuration for a DVWA-based lab, including image and difficulty.

labs/soc-logs/lab-config.json
Configuration for a SOC log analysis lab.

Infrastructure: infrastructure/docker

infrastructure/docker/api.Dockerfile
Docker build instructions for packaging the backend service.

infrastructure/docker/web.Dockerfile
Docker build instructions for packaging the frontend service.
