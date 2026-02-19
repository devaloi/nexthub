"use server";

import { prisma } from "@/lib/prisma";

export interface SearchResults {
  projects: {
    id: string;
    name: string;
    slug: string;
    description: string;
    _count: { issues: number };
  }[];
  issues: {
    id: string;
    number: number;
    title: string;
    status: string;
    priority: string;
    project: { name: string; slug: string };
  }[];
}

export async function search(query: string): Promise<SearchResults> {
  if (!query.trim()) {
    return { projects: [], issues: [] };
  }

  const term = `%${query}%`;

  const [projects, issues] = await Promise.all([
    prisma.project.findMany({
      where: {
        OR: [
          { name: { contains: term.replace(/%/g, "") } },
          { description: { contains: term.replace(/%/g, "") } },
        ],
      },
      include: { _count: { select: { issues: true } } },
      take: 10,
    }),
    prisma.issue.findMany({
      where: {
        OR: [
          { title: { contains: term.replace(/%/g, "") } },
          { description: { contains: term.replace(/%/g, "") } },
        ],
      },
      include: { project: { select: { name: true, slug: true } } },
      take: 20,
    }),
  ]);

  return { projects, issues };
}
