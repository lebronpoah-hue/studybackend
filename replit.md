# Study Portal

Game portal built from the supplied HTML, with a status indicator connected to the app's API.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/study-portal/public/portal.html` — supplied portal page shown in the app.
- `artifacts/study-portal/deploy/nginx.conf.example` — standalone Nginx routing example.
- `artifacts/api-server/src/routes/health.ts` — API health endpoint consumed by the frontend.

## Architecture decisions

- The supplied HTML remains a separate page inside the app; the React shell displays API status alongside it.
- Replit's managed router handles `/api` in this project. The Nginx file is only an example for separate hosting.
- The backend serves only fixed application API routes; it does not forward arbitrary URL destinations.

## Product

- Displays the supplied game portal.
- Shows whether the app's API is reachable.

## User preferences

- Use the supplied HTML as the frontend and connect it to the backend through `/api`.

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
