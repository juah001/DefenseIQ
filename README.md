# DefenseIQ

DefenseIQ-tech-learning platform is a full-stack cybersecurity/tech related learning platform that combines spaced repetition, AI-assisted study, progress analytics,
and hands-on labs to help students, developers, and security professionals learn technical concepts.

## What this project demonstrates:

- full-stack application architecture
- monorepo organization
- API design with Express and TypeScript
- Next.js frontend structure
- PostgreSQL data modeling
- CI/CD automation with GitHub Actions
- deployment readiness with Vercel and Render
- security-minded engineering decisions
- technical product documentation

## Core features

- Study dashboard
- Flashcard review flow
- Spaced repetition engine scaffold
- Deck marketplace
- Progress analytics
- AI flashcard generator scaffold
- AI tutor scaffold
- Code runner scaffold
- Cybersecurity labs scaffold
- Worker scaffold for background jobs

## Tech stack

### Frontend
- Next.js
- React

### Backend
- Express
- TypeScript
- Node.js

### Database
- PostgreSQL

### Infrastructure
- Docker Compose
- Render
- Vercel

### DevOps
- GitHub Actions CI

## Monorepo structure

```text
apps/
  api/       Express + TypeScript API
  web/       Next.js frontend
  worker/    background job scaffold

packages/
  shared/    shared types

database/
  schema.sql
  seeds/

labs/
  dvwa/
  soc-logs/

docs/
  API.md
  DEPLOYMENT.md
  SECURITY_ARCHITECTURE.md
  diagrams/
  screenshots/

infrastructure/
  docker/

Local setup

1. Start infrastructure
docker compose up -d postgres redis

2. Run backend
cd apps/api
npm install
cp .env.example .env
npm run dev

3. Run frontend
cd apps/web
npm install
npm run dev

4. Run worker
cd apps/worker
npm install
npm run dev

Deployment

Recommended deployment targets:
- Frontend: Vercel
- Backend API: Render Web Service
- Worker: Render Background Worker
- Database: Render Postgres

See:
- docs/DEPLOYMENT.md

API documentation
See:
- docs/API.md

Main routes include:

POST /auth/register
- POST /auth/login
- GET /decks
- POST /decks
- GET /cards/due
- POST /cards
- POST /reviews
- GET /analytics/progress
- GET /marketplace/decks
-  POST /marketplace/publish
- POST /ai/generate-flashcards
- POST /tutor/ask
- POST /code-runner/run
- GET /labs
- POST /labs/start

Security notes

See:
- docs/SECURITY_ARCHITECTURE.md
- Current security-minded design includes:
- environment variable based secrets
- JWT auth scaffolding
- input validation
- CORS restrictions
- basic rate limiting middleware
- separation of frontend, API, worker, and database concerns

CI/CD

GitHub Actions workflow included:
.github/workflows/ci.yml

It validates:
- backend dependency install and build
- frontend dependency install and build
- worker smoke test

Portfolio value

DefenseIQ is intended to showcase:
- product architecture thinking
- backend API design
- frontend integration
- security awareness
- deployable monorepo organization
- documentation discipline

Roadmap
Planned improvements:
- real authentication persistence
- queue-based background workers
- OpenAPI / Swagger API documentation
- hardened sandbox code execution
- multi-user deck publishing
- analytics dashboards
- AI-generated quizzes
- real-time collaborative study rooms

LICENSE:
MIT License

Author

Moses Juah

Cybersecurity
DevOps Engineering
Application Development
