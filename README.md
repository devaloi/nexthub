[![CI](https://github.com/devaloi/nexthub/actions/workflows/ci.yml/badge.svg)](https://github.com/devaloi/nexthub/actions/workflows/ci.yml)

# NextHub

A fullstack project and issue tracking hub built with Next.js 15, Prisma, and TypeScript.

## Tech Stack

| Component     | Choice                          |
|---------------|---------------------------------|
| Framework     | Next.js 15 (App Router)         |
| Language      | TypeScript 5                    |
| Database      | SQLite via Prisma ORM           |
| Styling       | Tailwind CSS v4                 |
| Validation    | Zod                             |
| Testing       | Vitest + Testing Library        |
| Linting       | ESLint (next/core-web-vitals)   |

## Features

- **Dashboard** — Overview stats (projects, issues by status), recent activity
- **Projects** — Full CRUD with slug-based routing and issue counts
- **Issues** — Create, edit, delete issues with status and priority management
- **Labels** — Color-coded labels with inline editing and issue assignment
- **Search** — Full-text search across projects and issues
- **Server Actions** — All mutations use Next.js server actions with Zod validation
- **Error Handling** — Not-found pages, error boundaries, loading states

## Prerequisites

- Node.js 22+
- npm

## Getting Started

```bash
# Clone the repository
git clone https://github.com/devaloi/nexthub.git
cd nexthub

# Install dependencies
npm install

# Set up the database
npx prisma db push

# Seed with sample data (optional)
npm run db:seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command            | Description                    |
|--------------------|--------------------------------|
| `npm run dev`      | Start development server       |
| `npm run build`    | Production build               |
| `npm run start`    | Start production server        |
| `npm run lint`     | Run ESLint                     |
| `npm run test`     | Run tests                      |
| `npm run db:push`  | Push schema to database        |
| `npm run db:seed`  | Seed database with sample data |
| `npm run db:studio`| Open Prisma Studio             |

## Architecture

```
nexthub/
├── prisma/
│   ├── schema.prisma          # Database schema (Project, Issue, Label)
│   └── seed.ts                # Sample data seeder
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── page.tsx           # Dashboard
│   │   ├── layout.tsx         # Root layout with header
│   │   ├── projects/          # Project CRUD pages
│   │   ├── labels/            # Label management page
│   │   └── search/            # Search page
│   ├── components/
│   │   ├── ui/                # Reusable UI primitives
│   │   ├── layout/            # Layout components (header)
│   │   ├── projects/          # Project-specific components
│   │   ├── issues/            # Issue-specific components
│   │   └── labels/            # Label-specific components
│   └── lib/
│       ├── prisma.ts          # Prisma client singleton
│       ├── utils.ts           # Utility functions and constants
│       ├── validations.ts     # Zod schemas
│       └── actions/           # Server actions
│           ├── projects.ts    # Project CRUD actions
│           ├── issues.ts      # Issue CRUD actions
│           ├── labels.ts      # Label CRUD actions
│           └── search.ts      # Search action
├── __tests__/                 # Test files
└── package.json
```

## Data Model

```
Project 1──* Issue *──* Label
  │              │         │
  ├─ name        ├─ title  ├─ name
  ├─ slug        ├─ number ├─ color
  └─ description ├─ status └─────────
                 └─ priority
```

**Issue Statuses:** Open, In Progress, Closed

**Issue Priorities:** Low, Medium, High, Urgent

## How to Run Tests

```bash
npm run test
```

Tests cover utility functions (slugify, date formatting) and Zod validation schemas (projects, issues, labels) with happy path and error cases.

## License

[MIT](LICENSE)
