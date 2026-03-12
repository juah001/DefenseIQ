# Deployment Guide

## Recommended deployment targets

- Frontend: Vercel
- Backend API: Render Web Service
- Worker: Render Background Worker
- Database: Render Postgres

## Backend deployment

Root directory:
`apps/api`

Build command:
`npm install && npm run build`

Start command:
`npm run start`

Environment variables:
- DATABASE_URL
- JWT_SECRET
- OPENAI_API_KEY
- FRONTEND_URL

## Frontend deployment

Root directory:
`apps/web`

Environment variables:
- NEXT_PUBLIC_API_URL

## Database setup

Run:

```bash
psql "YOUR_DATABASE_URL" -f database/schema.sql
psql "YOUR_DATABASE_URL" -f database/seeds/sample-data.sql
