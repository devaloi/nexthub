import Link from "next/link";
import { getProjects } from "@/lib/actions/projects";
import { Card, CardContent, Button } from "@/components/ui";
import { formatRelativeDate } from "@/lib/utils";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your projects and track issues
          </p>
        </div>
        <Link href="/projects/new">
          <Button>New Project</Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500">No projects yet.</p>
            <Link href="/projects/new" className="mt-2 inline-block text-blue-600 hover:underline">
              Create your first project
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.slug}`}>
              <Card className="transition-shadow hover:shadow-md">
                <CardContent>
                  <h2 className="font-semibold text-gray-900">{project.name}</h2>
                  {project.description && (
                    <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                      {project.description}
                    </p>
                  )}
                  <div className="mt-4 flex items-center gap-4 text-xs text-gray-400">
                    <span>{project._count.issues} issues</span>
                    <span>Updated {formatRelativeDate(project.updatedAt)}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
