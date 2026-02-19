import Link from "next/link";
import { createProject } from "@/lib/actions/projects";
import { ProjectForm } from "@/components/projects/project-form";

export default function NewProjectPage() {
  return (
    <div>
      <div className="mb-8">
        <Link
          href="/projects"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to Projects
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-gray-900">
          Create New Project
        </h1>
      </div>
      <ProjectForm action={createProject} submitLabel="Create Project" />
    </div>
  );
}
