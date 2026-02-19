import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, Badge } from "@/components/ui";
import {
  STATUS_LABELS,
  STATUS_COLORS,
  PRIORITY_LABELS,
  PRIORITY_COLORS,
  formatRelativeDate,
  type IssueStatus,
  type IssuePriority,
} from "@/lib/utils";

async function getDashboardData() {
  const [projects, recentIssues, issuesByStatus, totalIssues] =
    await Promise.all([
      prisma.project.findMany({
        include: { _count: { select: { issues: true } } },
        orderBy: { updatedAt: "desc" },
        take: 5,
      }),
      prisma.issue.findMany({
        include: {
          project: true,
          labels: { include: { label: true } },
        },
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
      prisma.issue.groupBy({
        by: ["status"],
        _count: true,
      }),
      prisma.issue.count(),
    ]);

  const statusCounts = Object.fromEntries(
    issuesByStatus.map((g) => [g.status, g._count])
  );

  return { projects, recentIssues, statusCounts, totalIssues };
}

export default async function DashboardPage() {
  const { projects, recentIssues, statusCounts, totalIssues } =
    await getDashboardData();

  const stats = [
    { label: "Total Projects", value: projects.length },
    { label: "Total Issues", value: totalIssues },
    { label: "Open", value: statusCounts["open"] ?? 0 },
    { label: "In Progress", value: statusCounts["in_progress"] ?? 0 },
    { label: "Closed", value: statusCounts["closed"] ?? 0 },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your projects and issues
        </p>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="py-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Recent Projects</h2>
              <Link
                href="/projects"
                className="text-sm text-blue-600 hover:underline"
              >
                View all
              </Link>
            </div>
          </CardHeader>
          <ul className="divide-y divide-gray-100">
            {projects.map((project) => (
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
            {projects.length === 0 && (
              <li className="px-6 py-6 text-center text-gray-400">
                No projects yet
              </li>
            )}
          </ul>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-900">Recent Issues</h2>
          </CardHeader>
          <ul className="divide-y divide-gray-100">
            {recentIssues.map((issue) => (
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
                    {issue.project.name} #{issue.number} · opened{" "}
                    {formatRelativeDate(issue.createdAt)}
                  </p>
                </Link>
              </li>
            ))}
            {recentIssues.length === 0 && (
              <li className="px-6 py-6 text-center text-gray-400">
                No issues yet
              </li>
            )}
          </ul>
        </Card>
      </div>
    </div>
  );
}
