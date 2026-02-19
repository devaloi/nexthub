# N01: nexthub — Full-Stack Next.js 15 Application

**Catalog ID:** N01 | **Size:** M | **Language:** TypeScript / Next.js 15
**Repo name:** `nexthub`
**One-liner:** A full-stack Next.js 15 application with App Router — React 19 server components, server actions for mutations, Prisma ORM with SQLite, NextAuth.js v5 for authentication, optimistic updates, Suspense boundaries, and a polished responsive dashboard UI.

---

## Why This Stands Out

- **App Router mastery** — demonstrates deep understanding of the React Server Component model: server components for data fetching, client components only where interactivity is needed, server actions for mutations
- **Zero API routes for CRUD** — all data mutations go through server actions, showing the modern Next.js pattern rather than the old `/api/` approach
- **NextAuth.js v5** — latest Auth.js with credentials + GitHub OAuth, middleware-based route protection, and session management across server/client boundaries
- **Optimistic updates** — `useOptimistic` hook for instant UI feedback on mutations, with proper rollback on server errors
- **Suspense architecture** — loading.tsx and Suspense boundaries at every level, streaming SSR, and skeleton UI for perceived performance
- **Prisma 7.x with SQLite** — type-safe database access, zero setup required, migrations included
- **Full-stack type safety** — TypeScript strict mode end-to-end, Prisma-generated types flow from DB schema through server actions to client components
- **Responsive dashboard** — sidebar navigation, mobile drawer, dark mode support, built entirely with Tailwind CSS

---

## Architecture

```
nexthub/
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root layout: providers, fonts, metadata
│   │   ├── page.tsx                 # Landing page (public)
│   │   ├── loading.tsx              # Root loading skeleton
│   │   ├── error.tsx                # Root error boundary
│   │   ├── not-found.tsx            # Custom 404 page
│   │   ├── globals.css              # Tailwind imports + custom properties
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx         # Login page: credentials + GitHub OAuth
│   │   │   └── register/
│   │   │       └── page.tsx         # Registration page
│   │   └── (dashboard)/
│   │       ├── layout.tsx           # Dashboard layout: sidebar + main content
│   │       ├── dashboard/
│   │       │   ├── page.tsx         # Dashboard overview: stats, recent activity
│   │       │   └── loading.tsx      # Dashboard skeleton
│   │       ├── projects/
│   │       │   ├── page.tsx         # Projects list (server component)
│   │       │   ├── loading.tsx      # Projects list skeleton
│   │       │   ├── new/
│   │       │   │   └── page.tsx     # Create project form
│   │       │   └── [id]/
│   │       │       ├── page.tsx     # Project detail with tasks
│   │       │       ├── loading.tsx  # Project detail skeleton
│   │       │       └── edit/
│   │       │           └── page.tsx # Edit project form
│   │       ├── tasks/
│   │       │   ├── page.tsx         # All tasks (filterable, sortable)
│   │       │   └── [id]/
│   │       │       └── page.tsx     # Task detail with comments
│   │       ├── activity/
│   │       │   └── page.tsx         # Activity feed (server component with streaming)
│   │       └── settings/
│   │           └── page.tsx         # User settings page
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx           # Button component with variants
│   │   │   ├── input.tsx            # Input with label and error state
│   │   │   ├── card.tsx             # Card container component
│   │   │   ├── badge.tsx            # Status/priority badge
│   │   │   ├── avatar.tsx           # User avatar with fallback
│   │   │   ├── skeleton.tsx         # Skeleton loading placeholder
│   │   │   ├── dropdown.tsx         # Dropdown menu component
│   │   │   └── modal.tsx            # Modal dialog component
│   │   ├── layout/
│   │   │   ├── sidebar.tsx          # Dashboard sidebar navigation
│   │   │   ├── header.tsx           # Top header with user menu
│   │   │   ├── mobile-nav.tsx       # Mobile navigation drawer
│   │   │   └── breadcrumb.tsx       # Breadcrumb navigation
│   │   ├── projects/
│   │   │   ├── project-card.tsx     # Project card for list view
│   │   │   ├── project-form.tsx     # Create/edit project form (client)
│   │   │   └── project-list.tsx     # Project list with optimistic updates
│   │   ├── tasks/
│   │   │   ├── task-card.tsx        # Task card with status badge
│   │   │   ├── task-form.tsx        # Create/edit task form (client)
│   │   │   ├── task-list.tsx        # Task list with optimistic updates
│   │   │   └── task-filters.tsx     # Filter bar (status, priority, assignee)
│   │   ├── comments/
│   │   │   ├── comment-list.tsx     # Comment thread display
│   │   │   └── comment-form.tsx     # Add comment form with optimistic update
│   │   └── activity/
│   │       └── activity-feed.tsx    # Activity feed with streaming
│   ├── actions/
│   │   ├── auth.ts                  # Server actions: signIn, signUp, signOut
│   │   ├── projects.ts             # Server actions: createProject, updateProject, deleteProject
│   │   ├── tasks.ts                # Server actions: createTask, updateTask, deleteTask, assignTask
│   │   └── comments.ts             # Server actions: createComment, deleteComment
│   ├── lib/
│   │   ├── auth.ts                  # NextAuth.js v5 config (providers, callbacks, session)
│   │   ├── prisma.ts               # Prisma client singleton
│   │   ├── utils.ts                # Utility functions (cn, formatDate, etc.)
│   │   └── validations.ts          # Zod schemas for form validation
│   └── types/
│       └── index.ts                 # Shared TypeScript types and interfaces
├── prisma/
│   ├── schema.prisma                # Prisma schema: User, Project, Task, Comment, Activity
│   ├── migrations/                  # Prisma migration files
│   └── seed.ts                      # Database seed script
├── public/
│   └── images/                      # Static assets
├── tests/
│   ├── unit/
│   │   ├── actions/
│   │   │   ├── projects.test.ts     # Server action tests
│   │   │   ├── tasks.test.ts
│   │   │   └── comments.test.ts
│   │   └── lib/
│   │       ├── utils.test.ts
│   │       └── validations.test.ts
│   └── e2e/
│       ├── auth.spec.ts             # Login, register, logout flows
│       ├── projects.spec.ts         # Project CRUD flow
│       ├── tasks.spec.ts            # Task management flow
│       └── dashboard.spec.ts        # Dashboard navigation
├── next.config.ts                   # Next.js configuration
├── tailwind.config.ts               # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript strict config
├── vitest.config.ts                 # Vitest configuration
├── playwright.config.ts             # Playwright E2E config
├── package.json
├── .env.example                     # DATABASE_URL, NEXTAUTH_SECRET, GITHUB_ID, GITHUB_SECRET
├── .gitignore
├── .eslintrc.json                   # ESLint config
├── LICENSE
└── README.md
```

---

## Data Models (Prisma)

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  password      String?   // null for OAuth users
  role          Role      @default(USER)
  projects      Project[]
  tasks         Task[]    @relation("assignee")
  comments      Comment[]
  activities    Activity[]
  accounts      Account[]
  sessions      Session[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Project {
  id          String   @id @default(cuid())
  name        String
  description String?
  status      ProjectStatus @default(ACTIVE)
  owner       User     @relation(fields: [ownerId], references: [id], onDelete: Cascade)
  ownerId     String
  tasks       Task[]
  activities  Activity[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Task {
  id          String   @id @default(cuid())
  title       String
  description String?
  status      TaskStatus @default(TODO)
  priority    Priority   @default(MEDIUM)
  project     Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
  projectId   String
  assignee    User?    @relation("assignee", fields: [assigneeId], references: [id])
  assigneeId  String?
  comments    Comment[]
  activities  Activity[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Comment {
  id        String   @id @default(cuid())
  body      String
  task      Task     @relation(fields: [taskId], references: [id], onDelete: Cascade)
  taskId    String
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
  createdAt DateTime @default(now())
}

model Activity {
  id        String   @id @default(cuid())
  type      String   // "project_created", "task_assigned", "comment_added", etc.
  message   String
  user      User     @relation(fields: [userId], references: [id])
  userId    String
  project   Project? @relation(fields: [projectId], references: [id], onDelete: Cascade)
  projectId String?
  task      Task?    @relation(fields: [taskId], references: [id], onDelete: Cascade)
  taskId    String?
  createdAt DateTime @default(now())
}

enum Role { USER ADMIN }
enum ProjectStatus { ACTIVE ARCHIVED }
enum TaskStatus { TODO IN_PROGRESS DONE }
enum Priority { LOW MEDIUM HIGH }
```

---

## Server Actions

| Action | File | Description |
|--------|------|-------------|
| `signUp` | `actions/auth.ts` | Create user with hashed password |
| `createProject` | `actions/projects.ts` | Create project, log activity, revalidate path |
| `updateProject` | `actions/projects.ts` | Update project, log activity, revalidate path |
| `deleteProject` | `actions/projects.ts` | Delete project + cascade, revalidate path |
| `createTask` | `actions/tasks.ts` | Create task in project, log activity |
| `updateTask` | `actions/tasks.ts` | Update task fields, log activity |
| `deleteTask` | `actions/tasks.ts` | Delete task, log activity |
| `assignTask` | `actions/tasks.ts` | Assign user to task, log activity |
| `createComment` | `actions/comments.ts` | Add comment to task, log activity |
| `deleteComment` | `actions/comments.ts` | Delete comment (author only) |

All server actions:
- Validate input with Zod schemas
- Check authentication via `auth()` from NextAuth
- Check authorization (ownership/role)
- Call `revalidatePath()` after mutation
- Return `{ success, error? }` for client error handling

---

## Page Rendering Strategy

| Route | Rendering | Data Fetching |
|-------|-----------|---------------|
| `/` | Static (SSG) | None |
| `/login`, `/register` | Static | None (client-side form) |
| `/dashboard` | Dynamic (SSR) | Server component: aggregate stats |
| `/projects` | Dynamic (SSR) | Server component: Prisma query |
| `/projects/[id]` | Dynamic (SSR) | Server component: Prisma query + Suspense for tasks |
| `/projects/new` | Static | None (client-side form) |
| `/tasks` | Dynamic (SSR) | Server component: filtered Prisma query |
| `/tasks/[id]` | Dynamic (SSR) | Server component: task + Suspense for comments |
| `/activity` | Dynamic (Streaming) | Server component with `<Suspense>` + streaming |

---

## Tech Stack

| Component | Choice |
|-----------|--------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5.x (strict mode) |
| React | React 19 (server components, server actions) |
| ORM | Prisma 7.x with SQLite |
| Auth | NextAuth.js v5 (credentials + GitHub OAuth) |
| Styling | Tailwind CSS 4.x |
| Validation | Zod |
| Unit Testing | Vitest |
| E2E Testing | Playwright |
| Linting | ESLint + Prettier |

---

## Phased Build Plan

### Phase 1: Foundation

**1.1 — Project setup**
- `npx create-next-app@latest nexthub --typescript --tailwind --app --src-dir --eslint`
- Enable TypeScript strict mode in `tsconfig.json`
- Install: `prisma`, `@prisma/client`, `next-auth@5`, `zod`, `bcryptjs`
- Dev deps: `vitest`, `@testing-library/react`, `playwright`, `@types/bcryptjs`
- Configure `vitest.config.ts` and `playwright.config.ts`

**1.2 — Prisma setup**
- `prisma/schema.prisma` with User, Project, Task, Comment, Activity models
- Account + Session models for NextAuth adapter
- Configure SQLite datasource
- Generate initial migration: `npx prisma migrate dev`
- Prisma client singleton in `lib/prisma.ts`
- Seed script with sample data
- Tests: Prisma client connects, seed runs

**1.3 — UI components**
- Build base UI components: Button, Input, Card, Badge, Avatar, Skeleton, Dropdown, Modal
- All components with TypeScript props, Tailwind variants, accessible ARIA attributes
- Reusable and composable design
- Tests: components render with props

**1.4 — Layout + navigation**
- Root layout: fonts, metadata, global providers
- Dashboard layout: sidebar with nav links, header with user menu
- Mobile navigation: hamburger menu → drawer
- Breadcrumb component from pathname
- Loading.tsx skeletons at root and dashboard level
- Error.tsx boundaries at root and dashboard level
- Custom 404 page

### Phase 2: Authentication

**2.1 — NextAuth.js v5 configuration**
- Auth config in `lib/auth.ts` with Prisma adapter
- Credentials provider: email + password with bcrypt verification
- GitHub OAuth provider: client ID + secret from env
- Session strategy: JWT
- Callbacks: `jwt` (add role to token), `session` (expose role in session)
- Tests: credentials auth works, session includes role

**2.2 — Auth pages**
- Login page: email/password form + "Sign in with GitHub" button
- Register page: name, email, password with Zod validation
- `signUp` server action: hash password, create user
- Auth error handling and display
- Tests: login flow, register flow, validation errors shown

**2.3 — Middleware + route protection**
- `middleware.ts`: protect `/dashboard/*` routes, redirect unauthenticated to `/login`
- Redirect authenticated users from `/login` to `/dashboard`
- Tests: unauthenticated redirect, authenticated access

### Phase 3: CRUD with Server Actions

**3.1 — Projects**
- Server actions: `createProject`, `updateProject`, `deleteProject`
- Projects list page (server component): fetch user's projects via Prisma
- Create project page: form with Zod validation, server action submission
- Project detail page: project info + tasks list (Suspense boundary)
- Edit project page: pre-filled form, update server action
- Delete with confirmation modal
- Optimistic update: adding project appears instantly in list
- Tests: CRUD actions, authorization checks, validation errors

**3.2 — Tasks**
- Server actions: `createTask`, `updateTask`, `deleteTask`, `assignTask`
- Task list within project detail (server component with Suspense)
- All tasks page: filterable by status, priority, assignee
- Task detail page: task info + comments (Suspense boundary)
- Task form: create/edit with status, priority, assignee dropdowns
- Optimistic update: status change reflects instantly
- Tests: CRUD actions, filters, assignment, optimistic rollback

**3.3 — Comments**
- Server actions: `createComment`, `deleteComment`
- Comment list in task detail (server component)
- Comment form: add comment with optimistic insertion
- Delete own comments (author check in server action)
- Tests: add comment, delete, authorization

**3.4 — Activity feed**
- Activity model populated by all server actions
- Activity feed page: streaming SSR with Suspense
- Dashboard: recent activity widget
- Tests: activity created on each mutation

### Phase 4: Polish + Testing

**4.1 — Dashboard overview**
- Stats cards: total projects, total tasks, tasks by status, recent activity
- Server component: aggregate queries via Prisma
- Suspense boundaries for each section
- Skeleton loading states
- Tests: stats reflect data, loading states render

**4.2 — Responsive design**
- Mobile breakpoints for all pages
- Sidebar collapses to drawer on mobile
- Forms stack vertically on small screens
- Touch-friendly tap targets
- Test: Playwright viewport tests at mobile/tablet/desktop

**4.3 — Dark mode**
- Tailwind dark mode (class strategy)
- Theme toggle in header
- Persist preference in localStorage
- Tests: toggle switches theme, persists on reload

**4.4 — Vitest unit tests**
- Server action tests: mock Prisma, verify CRUD logic
- Validation tests: Zod schemas accept/reject correctly
- Utility tests: formatDate, cn, etc.

**4.5 — Playwright E2E tests**
- Auth flow: register → login → dashboard
- Project flow: create → edit → delete
- Task flow: create → assign → change status → comment
- Navigation: sidebar links, breadcrumbs, mobile nav

**4.6 — README and documentation**
- Badges, install, quick start
- Screenshots (placeholder)
- Architecture overview (App Router, server components, server actions)
- Auth setup (credentials + GitHub OAuth env vars)
- Database setup (Prisma migrate)
- Development commands (dev, test, lint, build)
- Deployment notes

---

## Commit Plan

1. `chore: scaffold Next.js 15 project with TypeScript and Tailwind`
2. `feat: add Prisma schema with User, Project, Task, Comment, Activity models`
3. `feat: add base UI components — Button, Input, Card, Badge, Skeleton`
4. `feat: add dashboard layout with sidebar and mobile navigation`
5. `feat: add loading and error boundaries`
6. `feat: add NextAuth.js v5 with credentials and GitHub OAuth`
7. `feat: add login and register pages with Zod validation`
8. `feat: add middleware for route protection`
9. `feat: add project CRUD server actions`
10. `feat: add projects list and detail pages with Suspense`
11. `feat: add task CRUD server actions with assignment`
12. `feat: add task pages with filters and optimistic updates`
13. `feat: add comment server actions and comment thread UI`
14. `feat: add activity feed with streaming SSR`
15. `feat: add dashboard overview with stats and recent activity`
16. `feat: add responsive design and dark mode`
17. `test: add Vitest unit tests for server actions and validations`
18. `test: add Playwright E2E tests for auth, projects, and tasks`
19. `docs: add README with architecture, setup, and usage guide`
