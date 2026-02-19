"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { issueSchema, type ActionResult } from "@/lib/validations";

export async function getIssue(projectSlug: string, number: number) {
  const project = await prisma.project.findUnique({
    where: { slug: projectSlug },
  });
  if (!project) return null;

  return prisma.issue.findUnique({
    where: { projectId_number: { projectId: project.id, number } },
    include: {
      project: true,
      labels: { include: { label: true } },
    },
  });
}

export async function createIssue(
  projectSlug: string,
  formData: FormData
): Promise<ActionResult> {
  const raw = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    status: formData.get("status") as string,
    priority: formData.get("priority") as string,
  };

  const parsed = issueSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const project = await prisma.project.findUnique({
    where: { slug: projectSlug },
  });
  if (!project) {
    return { success: false, error: "Project not found" };
  }

  const lastIssue = await prisma.issue.findFirst({
    where: { projectId: project.id },
    orderBy: { number: "desc" },
  });
  const nextNumber = (lastIssue?.number ?? 0) + 1;

  await prisma.issue.create({
    data: {
      ...parsed.data,
      number: nextNumber,
      projectId: project.id,
    },
  });

  revalidatePath(`/projects/${projectSlug}`);
  revalidatePath("/");
  redirect(`/projects/${projectSlug}`);
}

export async function updateIssue(
  id: string,
  projectSlug: string,
  formData: FormData
): Promise<ActionResult> {
  const raw = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    status: formData.get("status") as string,
    priority: formData.get("priority") as string,
  };

  const parsed = issueSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  await prisma.issue.update({
    where: { id },
    data: parsed.data,
  });

  revalidatePath(`/projects/${projectSlug}`);
  revalidatePath("/");
  redirect(`/projects/${projectSlug}`);
}

export async function deleteIssue(
  id: string,
  projectSlug: string
): Promise<void> {
  await prisma.issue.delete({ where: { id } });
  revalidatePath(`/projects/${projectSlug}`);
  revalidatePath("/");
  redirect(`/projects/${projectSlug}`);
}

export async function updateIssueStatus(
  id: string,
  projectSlug: string,
  status: string
): Promise<void> {
  await prisma.issue.update({
    where: { id },
    data: { status },
  });
  revalidatePath(`/projects/${projectSlug}`);
  revalidatePath("/");
}
