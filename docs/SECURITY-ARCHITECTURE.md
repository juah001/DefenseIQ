
## `docs/SECURITY_ARCHITECTURE.md`
```md
# Security Architecture

## Core principles

- Secrets stay in environment variables
- Frontend contains no sensitive credentials
- Backend validates inputs
- JWT used for authenticated routes
- CORS restricted to trusted frontend origins
- Code runner and labs remain scaffolded until hardened

## Recommended hardening

- rate limiting
- structured logging
- sandbox isolation
- auth on sensitive routes
- audit trails
- queue-based background task isolation
