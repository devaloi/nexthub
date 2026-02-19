# Build nexthub — Full-Stack Next.js 15 Application

You are building a **portfolio project** for a Senior AI Engineer's public GitHub. It must be impressive, clean, and production-grade. Read these docs before writing any code:

1. **`N01-nextjs-fullstack.md`** — Complete project spec: architecture, Prisma schema, server actions, page rendering strategy, App Router patterns, phased build plan, commit plan. This is your primary blueprint. Follow it phase by phase.
2. **`github-portfolio.md`** — Portfolio goals and Definition of Done (Level 1 + Level 2). Understand the quality bar.
3. **`github-portfolio-checklist.md`** — Pre-publish checklist. Every item must pass before you're done.

---

## Instructions

### Read first, build second
Read all three docs completely before writing a single line of code. Understand the React Server Component model: server components fetch data and render on the server, client components handle interactivity, server actions handle mutations without API routes. Understand NextAuth.js v5 session flow across server/client boundaries, Prisma's type-safe query builder, and how Suspense boundaries enable streaming SSR.

### Follow the phases in order
The project spec has 4 phases. Do them in order:
1. **Foundation** — project scaffold, Prisma schema + migrations, base UI components (Button, Input, Card, Badge, Skeleton), dashboard layout with sidebar/mobile nav, loading.tsx/error.tsx boundaries
2. **Authentication** — NextAuth.js v5 with credentials + GitHub OAuth, login/register pages, middleware for route protection
3. **CRUD with Server Actions** — project CRUD, task CRUD with assignment and filters, comments, activity feed with streaming, optimistic updates with useOptimistic
4. **Polish + Testing** — dashboard overview with stats, responsive design, dark mode, Vitest unit tests, Playwright E2E tests, README

### Commit frequently
Follow the commit plan in the spec. Use **conventional commits** (`feat:`, `test:`, `docs:`, `chore:`). Each commit should be a logical unit.

### Quality non-negotiables
- **Server components by default.** Every page and data-fetching component is a server component. Only add `"use client"` where interactivity is needed (forms, optimistic updates, event handlers). Never fetch data in client components.
- **Server actions for all mutations.** No `/api/` routes for CRUD. Use `"use server"` actions called from client components via form actions or `startTransition`. Every action validates with Zod, checks auth, checks authorization, and calls `revalidatePath`.
- **Optimistic updates.** Use `useOptimistic` for instant UI feedback on mutations. Show the optimistic state immediately, then reconcile when the server action completes. Rollback on error.
- **Suspense everywhere.** Every dynamic page section has a `<Suspense fallback={<Skeleton />}>` wrapper. Use `loading.tsx` for route-level loading. Streaming SSR for the activity feed.
- **TypeScript strict mode.** `"strict": true` in tsconfig. No `any` types. Prisma-generated types flow from schema to actions to components. Zod schemas infer TypeScript types.
- **NextAuth.js v5 patterns.** Use `auth()` in server components and server actions for session access. Use `useSession()` only in client components that need it. Middleware protects dashboard routes.
- **Prisma 7.x with SQLite.** Zero external database setup. `npx prisma migrate dev` creates everything. Seed script populates sample data for development.
- **Accessible UI.** All interactive elements have proper ARIA attributes. Keyboard navigable. Focus management on modals and dropdowns.
- **Tests at both levels.** Vitest for server actions (mock Prisma, verify logic). Playwright for user journeys (auth flow, CRUD operations, navigation).
- **Lint clean.** ESLint with Next.js config must pass. TypeScript compilation with zero errors.

### What NOT to do
- Don't use the Pages Router. This project is App Router only — no `pages/` directory.
- Don't create API routes for CRUD. Use server actions exclusively. API routes are only acceptable for auth callbacks (NextAuth handles this internally).
- Don't fetch data in client components. All data fetching happens in server components or server actions.
- Don't skip Suspense boundaries. Every async server component needs a loading state.
- Don't use a component library (shadcn, MUI, etc.). Build UI components from scratch with Tailwind to show CSS proficiency.
- Don't leave `// TODO` or `// FIXME` comments anywhere.

---

## GitHub Username

The GitHub username is **devaloi**. The repository is `github.com/devaloi/nexthub`. NPM package scope is not applicable — this is a Next.js application, not a library.

## Start

Read the three docs. Then begin Phase 1 from `N01-nextjs-fullstack.md`.
