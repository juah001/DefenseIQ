# API Documentation

Base URL:
`http://localhost:5000`

## Routes

### GET /
Health info

### GET /health
Readiness probe

### POST /auth/register
Register a new user

### POST /auth/login
Authenticate user and return JWT

### GET /decks
List decks

### POST /decks
Create deck

### GET /cards/due
List due cards

### POST /cards
Create card

### POST /reviews
Submit review result

### GET /analytics/progress
Return progress summary

### GET /marketplace/decks
List public marketplace decks

### POST /marketplace/publish
Publish a deck

### POST /ai/generate-flashcards
Generate flashcards from notes

### POST /ai/youtube-flashcards
Scaffold endpoint for transcript-based flashcards

### POST /tutor/ask
Get AI tutor response scaffold

### POST /code-runner/run
Safe placeholder for future code sandbox

### GET /labs
List labs

### POST /labs/start
Queue lab start scaffold
