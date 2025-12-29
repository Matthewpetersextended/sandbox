# AI Presentation Maker - Copilot Instructions

## Project Architecture

**Full-stack AI presentation generation platform**: NextJS frontend + FastAPI backend with PostgreSQL and Redis.

### Service Boundaries
- **Backend** (`/backend`): FastAPI REST API serving presentation CRUD, AI generation workflows, Firebase auth
- **Frontend** (`/frontend`): Next.js app with Auth/Dashboard/Website route groups, sidebar navigation, Radix UI components
- **Data Layer**: PostgreSQL (presentations, user data) + Redis (caching) via Docker Compose
- **Auth**: Firebase Authentication (email/password signup, token verification)
- **AI Integration**: Anthropic API for slide content generation

### Data Flow
1. User authenticates via Firebase → receives ID token
2. Frontend sends token in Authorization header to FastAPI
3. FastAPI verifies token via `firebase_admin.auth.verify_id_token()`
4. Authenticated endpoints extract `user_id` from decoded token via `get_current_user_id()` dependency
5. Presentations scoped per user: `.filter(Presentation.user_id == user_id)`

## Critical Developer Workflows

### Local Development
```bash
# Root workspace (runs frontend in watch mode)
npm run dev

# Only frontend
cd frontend && npm run dev

# Services (must be running)
docker-compose up -d
```

### Database Migrations
Using Alembic (configured in `/backend/alembic/`):
```bash
# No migration tool calls yet—schema managed via SQLAlchemy `Base.metadata.create_all()` in `app/database.py:init_db()`
# Manual migration workflow TBD
```

### Configuration
- **Backend**: `backend/app/config.py` uses Pydantic `BaseSettings` reading env vars
  - Key vars: `DATABASE_URL`, `REDIS_URL`, `ANTHROPIC_API_KEY`, `FIREBASE_CREDENTIALS_PATH`
  - CORS: hardcoded to `["http://localhost:3000", "http://localhost:8000"]` (update for production)
- **Frontend**: Next.js env vars in root `/frontend/.env.local` or injected at build
  - Firebase SDK initialized in `lib/firebase/config.ts`

## Code Structure & Patterns

### Backend (FastAPI)
**Entry point**: `backend/app/main.py` → FastAPI app with CORS middleware, startup init
- **Models** (`app/models/`): SQLAlchemy ORM classes (e.g., `Presentation` with UUID id, `user_id` foreign key)
- **Schemas** (`app/schemas/`): Pydantic models for request/response validation (`PresentationCreate`, `PresentationResponse`)
- **API Routes** (`app/api/v1/`): Router modules (presentations.py) with dependency injection
  - Pattern: `@router.get("/{id}", response_model=Schema)` with `db: Session = Depends(get_db)`
- **Auth** (`app/core/auth.py`): Firebase token verification via HTTPBearer security
- **Database** (`app/database.py`): SQLAlchemy engine, SessionLocal factory, Base declarative class
- **Config** (`app/config.py`): Settings class centralizes all env vars with defaults

**API Response Pattern**: Use Pydantic response models with `from_attributes = True` for ORM → dict serialization

### Frontend (Next.js App Router)
**Route Groups**:
- `(auth)/`: Public signup/signin pages
- `(dashboard)/`: Protected user workspace (lessons, activity sheets, settings, home)
- `(website)/`: Public marketing pages (about, pricing, help)

**Layout Convention** (`app/(dashboard)/layout.tsx`):
- Client component managing SidebarProvider state
- Hides sidebar for editor routes (`isEditorRoute` check)
- Toaster (Sonner) at root for toast notifications

**Component Structure** (`components/`):
- `ui/`: Radix UI primitives (button, card, sidebar, form, etc.)
- `auth/`: SignInForm, SignUpForm, GoogleAuthButton components
- `sidebar/`: AppSidebar (navigation), sidebar.tsx (Radix wrapper)
- `layout/`: DashboardLayout, PublicNav, Footer (layout shells)
- `lessons/`, `settings/`, `home/`: Feature-specific components

**Firebase Auth Pattern** (`lib/firebase/auth.ts`):
```typescript
export const signIn = async (email, password) => {
  // Returns { user, error } tuple
}
export const onAuthChange = (callback) => {
  // Subscribe to auth state changes
}
```

**TypeScript**: Strict mode enabled, path alias `@/*` maps to root

## Project-Specific Conventions

### Presentation Model
Stored as JSON blobs in PostgreSQL:
- `slides`: Array of slide objects (structure TBD, likely `[{title, content, layout, notes}]`)
- `status`: enum-like string (`draft`, `generating`, `completed`, `error`)
- `generation_method`: `topic`, `file`, or `standards` (determines AI prompt strategy)
- `learning_objectives`, `standards`: Optional JSON arrays for curriculum alignment

### User Isolation
All queries filter by `user_id`. No cross-user data access—critical for multi-tenant safety.

### Theme/Styling
- **Tailwind CSS** for styling (configured in `frontend/tailwind.config.ts`)
- **Radix UI** + shadcn/ui patterns for accessible components
- Dark mode support via `next-themes` + `@radix-ui` components

## External Dependencies & Integration Points

### Anthropic API
- SDK installed: `@anthropic-ai/sdk` (frontend), `anthropic` (backend)
- Model: Claude Sonnet 4 (configurable in `config.py`: `ANTHROPIC_MODEL`)
- Max tokens: 4096 (increase for longer presentations)
- **Usage**: Likely in slide generation service (not yet visible in provided code)

### Firebase
- **Frontend**: `firebase` SDK for auth, storage, config in `lib/firebase/`
- **Backend**: `firebase-admin` for token verification, initialized in `core/auth.py`
- **Credentials**: Path `./firebase-credentials.json` (must be local file or env-injected)

### Supabase (Installed but Unclear Usage)
- Dependencies present (`@supabase/auth-helpers-nextjs`, `@supabase/supabase-js`)
- May be legacy or planned—verify actual usage before modifications

### LLM Libraries
- **tiktoken** (embedding tokenization)
- **python-pptx** (backend: PowerPoint generation)
- **Celery** (async task queue, likely for long-running AI generation)
- **redis** (Celery broker + caching)

## Testing & Validation

- **Backend**: `pytest==7.4.3` available; tests in `/backend/tests/`
- **Frontend**: No test infrastructure visible; consider adding if new features added
- **Linting**: No explicit linter config found (consider ESLint, Pylint)

## Known Gaps & TODOs

- Slide content generation AI service not yet implemented in provided code
- Alembic migration workflow not activated (schema created via `init_db()` only)
- API client in `frontend/lib/api/clients.ts` is empty—implement request wrapper
- Supabase imports in package.json but unclear if used; may be legacy
- File upload handler for "file" generation method not visible

---

**When adding features**: Maintain user isolation via `user_id` filtering, use Pydantic schemas for validation, ensure Firebase token flow, add Radix UI components to `components/ui/` if new primitives needed.
