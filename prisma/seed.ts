import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const LABELS = [
  { name: "bug", color: "#d73a4a" },
  { name: "feature", color: "#0075ca" },
  { name: "enhancement", color: "#a2eeef" },
  { name: "documentation", color: "#0075ca" },
  { name: "good first issue", color: "#7057ff" },
  { name: "help wanted", color: "#008672" },
  { name: "wontfix", color: "#ffffff" },
  { name: "duplicate", color: "#cfd3d7" },
];

async function main() {
  console.log("Seeding database...");

  for (const label of LABELS) {
    await prisma.label.upsert({
      where: { name: label.name },
      update: {},
      create: label,
    });
  }
  console.log(`Created ${LABELS.length} labels`);

  const project = await prisma.project.upsert({
    where: { slug: "nexthub" },
    update: {},
    create: {
      name: "NextHub",
      slug: "nexthub",
      description: "The NextHub project tracker itself",
    },
  });
  console.log(`Created project: ${project.name}`);

  const issues = [
    {
      number: 1,
      title: "Set up project scaffolding",
      description: "Initialize the Next.js project with TypeScript and Prisma",
      status: "closed",
      priority: "high",
    },
    {
      number: 2,
      title: "Add project CRUD operations",
      description: "Implement create, read, update, delete for projects",
      status: "open",
      priority: "high",
    },
    {
      number: 3,
      title: "Add issue tracking",
      description: "Implement issue management within projects",
      status: "open",
      priority: "medium",
    },
    {
      number: 4,
      title: "Add search functionality",
      description: "Full-text search across projects and issues",
      status: "open",
      priority: "low",
    },
  ];

  for (const issue of issues) {
    await prisma.issue.upsert({
      where: {
        projectId_number: { projectId: project.id, number: issue.number },
      },
      update: {},
      create: { ...issue, projectId: project.id },
    });
  }
  console.log(`Created ${issues.length} issues`);

  const bugLabel = await prisma.label.findUnique({ where: { name: "bug" } });
  const featureLabel = await prisma.label.findUnique({
    where: { name: "feature" },
  });
  const firstIssue = await prisma.issue.findFirst({
    where: { projectId: project.id, number: 2 },
  });

  if (bugLabel && firstIssue) {
    await prisma.issueLabel.upsert({
      where: {
        issueId_labelId: { issueId: firstIssue.id, labelId: bugLabel.id },
      },
      update: {},
      create: { issueId: firstIssue.id, labelId: bugLabel.id },
    });
  }

  if (featureLabel && firstIssue) {
    await prisma.issueLabel.upsert({
      where: {
        issueId_labelId: {
          issueId: firstIssue.id,
          labelId: featureLabel.id,
        },
      },
      update: {},
      create: { issueId: firstIssue.id, labelId: featureLabel.id },
    });
  }

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
