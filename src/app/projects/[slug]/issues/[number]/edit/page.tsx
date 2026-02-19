import Link from "next/link";
import { notFound } from "next/navigation";
import { getIssue, updateIssue } from "@/lib/actions/issues";
import { IssueForm } from "@/components/issues/issue-form";

export default async function EditIssuePage({
  params,
}: {
  params: Promise<{ slug: string; number: string }>;
}) {
  const { slug, number } = await params;
  const issue = await getIssue(slug, parseInt(number, 10));
  if (!issue) notFound();

  const updateWithId = updateIssue.bind(null, issue.id, slug);

  return (
    <div>
      <div className="mb-8">
        <Link
          href={`/projects/${slug}/issues/${number}`}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to Issue #{number}
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-gray-900">Edit Issue</h1>
      </div>
      <IssueForm
        action={updateWithId}
        defaultValues={{
          title: issue.title,
          description: issue.description,
          status: issue.status,
          priority: issue.priority,
        }}
        submitLabel="Save Changes"
      />
    </div>
  );
}
