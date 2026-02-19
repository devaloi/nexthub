import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject } from "@/lib/actions/projects";
import { createIssue } from "@/lib/actions/issues";
import { IssueForm } from "@/components/issues/issue-form";

export default async function NewIssuePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const createForProject = createIssue.bind(null, slug);

  return (
    <div>
      <div className="mb-8">
        <Link
          href={`/projects/${slug}`}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to {project.name}
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-gray-900">New Issue</h1>
        <p className="mt-1 text-sm text-gray-500">
          Create a new issue in {project.name}
        </p>
      </div>
      <IssueForm action={createForProject} submitLabel="Create Issue" />
    </div>
  );
}
