# AI Presentation Maker - Copilot Instructions

Purpose: concise, codebase-specific guidance to onboard AI coding agents.

## Quick Overview

**Stack**: Next.js (`/frontend`) + FastAPI (`/backend`) + Postgres + Redis. Firebase auth; Anthropic (Claude Sonnet 4) for AI generation.

**Key directories**:
- Backend: `backend/app/api/`, `models/`, `schemas/`, `core/` (auth), `services/`, `workers/`
- Frontend: `app/` (routes: auth, dashboard, website), `components/`, `lib/` (Firebase, API)

## Local Development (Commands)

**Infrastructure**:
```bash
docker-compose up -d  # postgres + redis
```

**Backend**:
```bash
cd backend && python -m venv .venv && . .venv/bin/activate && pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
# DB tables auto-created on startup via init_db()
```

**Frontend**:
```bash
cd frontend && npm install && npm run dev
# Or from repo root: npm run dev
```

**Celery worker** (for async tasks):
```bash
# When implemented: celery -A app.workers.worker worker --loglevel=info
# Broker/result backend configured in .env (CELERY_BROKER_URL, CELERY_RESULT_BACKEND)
```

## Environment & Configuration

**Backend** (`backend/.env.*`):
- `DATABASE_URL`, `REDIS_URL`, `FIREBASE_CREDENTIALS_PATH`, `ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL`
- CORS: hardcoded to `["http://localhost:3000", "http://localhost:8000"]` in `settings.BACKEND_CORS_ORIGINS` — update for production
- See `backend/app/config.py` for all defaults and feature flags (FERPA/COPPA, moderation, rate limits)

**Frontend** (`NEXT_PUBLIC_*` env vars):
- Firebase config in `frontend/lib/firebase/config.ts` reads from env
- Backend URL: set `NEXT_PUBLIC_BACKEND_URL` for API calls

## Core Patterns

### User Isolation (Critical)
- Every endpoint filters by `user_id` (extracted from Firebase ID token in `get_current_user()`)
- Example: `db.query(Presentation).filter(Presentation.user_id == user_id)`
- **Rule**: Always scope queries by user — no cross-user data leaks

### Authentication Flow
1. Frontend: Call Firebase `signInWithEmailAndPassword()` → receive `id_token`
2. Frontend: Include `Authorization: Bearer <id_token>` in API requests
3. Backend: `get_current_user()` validates token via `firebase_admin.auth.verify_id_token()`
4. Backend: Extract `user_id` from decoded token; use as filter key

**See**: `backend/app/core/auth.py`, `frontend/lib/firebase/auth.ts`

### API Endpoints & Schemas
- **Router**: `backend/app/api/v1/presentations.py` (CRUD: create, list, get, delete)
- **Schema** (input): `PresentationCreate` with fields: title, generation_method, topic, slide_count, learning_objectives, etc.
- **Schema** (response): `PresentationResponse` (all fields + id, user_id, created_at, updated_at)
- **Model**: `Presentation` (SQLAlchemy ORM) — `slides` is JSON blob; `status` (draft/generating/completed/error); `generation_method` (topic/file/standards)

### Where to Add New Work

**Sync/short tasks**:
- Add endpoints in `backend/app/api/v1/` → call business logic from `backend/app/services/`

**Async generation** (long-running AI tasks):
- Implement Celery tasks in `backend/app/workers/` (framework scaffolding exists)
- Call from API via `apply_async()` or `delay()`

**Frontend API calls**:
- Implement in `frontend/lib/api/clients.ts` (currently empty) — wrap fetch with auth headers
- Example: `const headers = { Authorization: Bearer ${getIdToken()} }`

## Testing

- Backend: `pytest` available; add tests under `backend/tests/`
- Frontend: No test setup yet; consider Jest + React Testing Library for components
- CI: No GitHub Actions configured; add before merging critical changes

## Known Gaps & Quick Tips

1. **Slide generation service** not yet implemented — add to `backend/app/services/`
2. **Celery worker** scaffolding present but no tasks defined
3. **API client** in `frontend/lib/api/clients.ts` is empty — implement fetch wrapper
4. **Supabase** imports in `package.json` are likely legacy — verify usage before relying on them
5. **Alembic migrations** directory exists but is empty — use when schema changes require rollback support
6. If `firebase-credentials.json` missing: backend logs warning; auth will fail. Provide or set env-based credentials.

## Examples

**Create presentation** (POST /api/v1/presentations):
```json
{
  "title": "Photosynthesis 101",
  "generation_method": "topic",
  "topic": "Photosynthesis",
  "slide_count": 5,
  "grade_level": "6-8",
  "subject": "Biology"
}
```

**Request header**:
```
Authorization: Bearer <firebase-id-token>
Content-Type: application/json
```

## Jump-To Files

- Startup: `backend/app/main.py`
- Config: `backend/app/config.py`
- Auth: `backend/app/core/auth.py`, `frontend/lib/firebase/auth.ts`
- Models & Schemas: `backend/app/models/presentation.py`, `backend/app/schemas/presentation.py`
- API: `backend/app/api/v1/presentations.py`
- Frontend Firebase: `frontend/lib/firebase/config.ts`
- Docker: `docker-compose.yml`

---

Feedback? Sections to expand or unclear sections? Let me know.
