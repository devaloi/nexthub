import Link from "next/link";
import { notFound } from "next/navigation";
import { getIssue, deleteIssue, updateIssueStatus } from "@/lib/actions/issues";
import { Button, Badge, Card, CardContent, CardHeader } from "@/components/ui";
import {
  STATUS_LABELS,
  STATUS_COLORS,
  PRIORITY_LABELS,
  PRIORITY_COLORS,
  ISSUE_STATUSES,
  formatDate,
  type IssueStatus,
  type IssuePriority,
} from "@/lib/utils";

export default async function IssueDetailPage({
  params,
}: {
  params: Promise<{ slug: string; number: string }>;
}) {
  const { slug, number } = await params;
  const issue = await getIssue(slug, parseInt(number, 10));
  if (!issue) notFound();

  const deleteWithId = deleteIssue.bind(null, issue.id, slug);

  return (
    <div>
      <div className="mb-8">
        <Link
          href={`/projects/${slug}`}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to {issue.project.name}
        </Link>
        <div className="mt-2 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">
                {issue.title}
              </h1>
              <span className="text-lg text-gray-400">#{issue.number}</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Badge color={STATUS_COLORS[issue.status as IssueStatus]}>
                {STATUS_LABELS[issue.status as IssueStatus]}
              </Badge>
              <Badge color={PRIORITY_COLORS[issue.priority as IssuePriority]}>
                {PRIORITY_LABELS[issue.priority as IssuePriority]}
              </Badge>
              {issue.labels.map(({ label }) => (
                <Badge key={label.id} color={label.color} variant="outline">
                  {label.name}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Link href={`/projects/${slug}/issues/${number}/edit`}>
              <Button variant="secondary">Edit</Button>
            </Link>
            <form action={deleteWithId}>
              <Button type="submit" variant="danger">
                Delete
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <Card>
            <CardHeader>
              <h2 className="font-semibold text-gray-900">Description</h2>
            </CardHeader>
            <CardContent>
              {issue.description ? (
                <p className="whitespace-pre-wrap text-gray-700">
                  {issue.description}
                </p>
              ) : (
                <p className="text-gray-400 italic">No description provided.</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <h3 className="text-sm font-semibold text-gray-900">Details</h3>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <span className="text-gray-500">Status</span>
                <div className="mt-1 flex gap-1">
                  {ISSUE_STATUSES.map((status) => {
                    const setStatus = updateIssueStatus.bind(
                      null,
                      issue.id,
                      slug,
                      status
                    );
                    return (
                      <form key={status} action={setStatus}>
                        <button
                          type="submit"
                          className={[
                            "rounded-md px-2 py-1 text-xs font-medium transition-colors",
                            issue.status === status
                              ? "bg-gray-900 text-white"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200",
                          ].join(" ")}
                        >
                          {STATUS_LABELS[status]}
                        </button>
                      </form>
                    );
                  })}
                </div>
              </div>
              <div>
                <span className="text-gray-500">Priority</span>
                <p className="mt-1">
                  <Badge
                    color={PRIORITY_COLORS[issue.priority as IssuePriority]}
                  >
                    {PRIORITY_LABELS[issue.priority as IssuePriority]}
                  </Badge>
                </p>
              </div>
              <div>
                <span className="text-gray-500">Created</span>
                <p className="mt-1 text-gray-700">
                  {formatDate(issue.createdAt)}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Updated</span>
                <p className="mt-1 text-gray-700">
                  {formatDate(issue.updatedAt)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
