"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { projectSchema, type ActionResult } from "@/lib/validations";
import { slugify } from "@/lib/utils";

export async function getProjects() {
  return prisma.project.findMany({
    include: { _count: { select: { issues: true } } },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getProject(slug: string) {
  return prisma.project.findUnique({
    where: { slug },
    include: {
      issues: {
        include: { labels: { include: { label: true } } },
        orderBy: { createdAt: "desc" },
      },
      _count: { select: { issues: true } },
    },
  });
}

export async function createProject(formData: FormData): Promise<ActionResult> {
  const raw = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
  };

  const parsed = projectSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const slug = slugify(parsed.data.name);
  const existing = await prisma.project.findUnique({ where: { slug } });
  if (existing) {
    return { success: false, error: "A project with this name already exists" };
  }

  await prisma.project.create({
    data: { ...parsed.data, slug },
  });

  revalidatePath("/projects");
  revalidatePath("/");
  redirect(`/projects/${slug}`);
}

export async function updateProject(
  id: string,
  formData: FormData
): Promise<ActionResult> {
  const raw = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
  };

  const parsed = projectSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const slug = slugify(parsed.data.name);
  const existing = await prisma.project.findFirst({
    where: { slug, NOT: { id } },
  });
  if (existing) {
    return { success: false, error: "A project with this name already exists" };
  }

  await prisma.project.update({
    where: { id },
    data: { ...parsed.data, slug },
  });

  revalidatePath("/projects");
  revalidatePath("/");
  redirect(`/projects/${slug}`);
}

export async function deleteProject(id: string): Promise<void> {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/projects");
  revalidatePath("/");
  redirect("/projects");
}
