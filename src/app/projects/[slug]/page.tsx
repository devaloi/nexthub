import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, deleteProject } from "@/lib/actions/projects";
import { Button, Badge, Card, CardContent } from "@/components/ui";
import {
  STATUS_LABELS,
  STATUS_COLORS,
  PRIORITY_LABELS,
  PRIORITY_COLORS,
  formatRelativeDate,
  type IssueStatus,
  type IssuePriority,
} from "@/lib/utils";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const openCount = project.issues.filter((i) => i.status === "open").length;
  const closedCount = project.issues.filter((i) => i.status === "closed").length;
  const deleteWithId = deleteProject.bind(null, project.id);

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/projects"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to Projects
        </Link>
        <div className="mt-2 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
            {project.description && (
              <p className="mt-1 text-gray-500">{project.description}</p>
            )}
            <div className="mt-2 flex gap-4 text-sm text-gray-400">
              <span>{openCount} open</span>
              <span>{closedCount} closed</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href={`/projects/${slug}/issues/new`}>
              <Button>New Issue</Button>
            </Link>
            <Link href={`/projects/${slug}/edit`}>
              <Button variant="secondary">Edit</Button>
            </Link>
            <form action={deleteWithId}>
              <Button type="submit" variant="danger" size="md">
                Delete
              </Button>
            </form>
          </div>
        </div>
      </div>

      {project.issues.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500">No issues yet.</p>
            <Link
              href={`/projects/${slug}/issues/new`}
              className="mt-2 inline-block text-blue-600 hover:underline"
            >
              Create the first issue
            </Link>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <ul className="divide-y divide-gray-100">
            {project.issues.map((issue) => (
              <li key={issue.id}>
                <Link
                  href={`/projects/${slug}/issues/${issue.number}`}
                  className="block px-6 py-4 transition-colors hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge
                        color={STATUS_COLORS[issue.status as IssueStatus]}
                      >
                        {STATUS_LABELS[issue.status as IssueStatus]}
                      </Badge>
                      <span className="font-medium text-gray-900">
                        {issue.title}
                      </span>
                      <span className="text-sm text-gray-400">
                        #{issue.number}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {issue.labels.map(({ label }) => (
                        <Badge key={label.id} color={label.color} variant="outline">
                          {label.name}
                        </Badge>
                      ))}
                      <Badge
                        color={PRIORITY_COLORS[issue.priority as IssuePriority]}
                      >
                        {PRIORITY_LABELS[issue.priority as IssuePriority]}
                      </Badge>
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-gray-400">
                    opened {formatRelativeDate(issue.createdAt)}
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
