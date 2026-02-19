import { Suspense } from "react";
import Link from "next/link";
import { search } from "@/lib/actions/search";
import { Card, CardContent, CardHeader, Badge } from "@/components/ui";
import {
  STATUS_LABELS,
  STATUS_COLORS,
  PRIORITY_LABELS,
  PRIORITY_COLORS,
  type IssueStatus,
  type IssuePriority,
} from "@/lib/utils";

async function SearchResults({ query }: { query: string }) {
  const results = await search(query);
  const hasResults = results.projects.length > 0 || results.issues.length > 0;

  if (!query) {
    return (
      <p className="py-12 text-center text-gray-400">
        Enter a search term to find projects and issues.
      </p>
    );
  }

  if (!hasResults) {
    return (
      <p className="py-12 text-center text-gray-400">
        No results found for &ldquo;{query}&rdquo;
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {results.projects.length > 0 && (
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-900">
              Projects ({results.projects.length})
            </h2>
          </CardHeader>
          <ul className="divide-y divide-gray-100">
            {results.projects.map((project) => (
              <li key={project.id}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="block px-6 py-3 transition-colors hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">
                      {project.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {project._count.issues} issues
                    </span>
                  </div>
                  {project.description && (
                    <p className="mt-0.5 truncate text-sm text-gray-500">
                      {project.description}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {results.issues.length > 0 && (
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-900">
              Issues ({results.issues.length})
            </h2>
          </CardHeader>
          <ul className="divide-y divide-gray-100">
            {results.issues.map((issue) => (
              <li key={issue.id}>
                <Link
                  href={`/projects/${issue.project.slug}/issues/${issue.number}`}
                  className="block px-6 py-3 transition-colors hover:bg-gray-50"
                >
                  <div className="flex items-center gap-2">
                    <Badge
                      color={STATUS_COLORS[issue.status as IssueStatus]}
                    >
                      {STATUS_LABELS[issue.status as IssueStatus]}
                    </Badge>
                    <span className="truncate font-medium text-gray-900">
                      {issue.title}
                    </span>
                    <Badge
                      color={PRIORITY_COLORS[issue.priority as IssuePriority]}
                    >
                      {PRIORITY_LABELS[issue.priority as IssuePriority]}
                    </Badge>
                  </div>
                  <p className="mt-0.5 text-xs text-gray-400">
                    {issue.project.name} #{issue.number}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Search</h1>
        <p className="mt-1 text-sm text-gray-500">
          Search across all projects and issues
        </p>
      </div>

      <form action="/search" method="GET" className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Search projects and issues..."
            className="block w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </form>

      <Suspense
        fallback={<p className="py-12 text-center text-gray-400">Searching...</p>}
      >
        <SearchResults query={q} />
      </Suspense>
    </div>
  );
}
