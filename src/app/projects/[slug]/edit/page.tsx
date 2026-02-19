import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, updateProject } from "@/lib/actions/projects";
import { ProjectForm } from "@/components/projects/project-form";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const updateWithId = updateProject.bind(null, project.id);

  return (
    <div>
      <div className="mb-8">
        <Link
          href={`/projects/${slug}`}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to {project.name}
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-gray-900">Edit Project</h1>
      </div>
      <ProjectForm
        action={updateWithId}
        defaultValues={{
          name: project.name,
          description: project.description,
        }}
        submitLabel="Save Changes"
      />
    </div>
  );
}
