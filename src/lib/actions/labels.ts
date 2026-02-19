"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { labelSchema, type ActionResult } from "@/lib/validations";

export async function getLabels() {
  return prisma.label.findMany({
    include: { _count: { select: { issues: true } } },
    orderBy: { name: "asc" },
  });
}

export async function createLabel(formData: FormData): Promise<ActionResult> {
  const raw = {
    name: formData.get("name") as string,
    color: formData.get("color") as string,
  };

  const parsed = labelSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const existing = await prisma.label.findUnique({
    where: { name: parsed.data.name },
  });
  if (existing) {
    return { success: false, error: "A label with this name already exists" };
  }

  await prisma.label.create({ data: parsed.data });
  revalidatePath("/labels");
  return { success: true };
}

export async function updateLabel(
  id: string,
  formData: FormData
): Promise<ActionResult> {
  const raw = {
    name: formData.get("name") as string,
    color: formData.get("color") as string,
  };

  const parsed = labelSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const existing = await prisma.label.findFirst({
    where: { name: parsed.data.name, NOT: { id } },
  });
  if (existing) {
    return { success: false, error: "A label with this name already exists" };
  }

  await prisma.label.update({ where: { id }, data: parsed.data });
  revalidatePath("/labels");
  return { success: true };
}

export async function deleteLabel(id: string): Promise<ActionResult> {
  await prisma.label.delete({ where: { id } });
  revalidatePath("/labels");
  return { success: true };
}

export async function toggleIssueLabel(
  issueId: string,
  labelId: string,
  projectSlug: string
): Promise<ActionResult> {
  const existing = await prisma.issueLabel.findUnique({
    where: { issueId_labelId: { issueId, labelId } },
  });

  if (existing) {
    await prisma.issueLabel.delete({
      where: { issueId_labelId: { issueId, labelId } },
    });
  } else {
    await prisma.issueLabel.create({ data: { issueId, labelId } });
  }

  revalidatePath(`/projects/${projectSlug}`);
  return { success: true };
}
