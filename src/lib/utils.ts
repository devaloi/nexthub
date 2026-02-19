export const ISSUE_STATUSES = ["open", "in_progress", "closed"] as const;
export type IssueStatus = (typeof ISSUE_STATUSES)[number];

export const ISSUE_PRIORITIES = ["low", "medium", "high", "urgent"] as const;
export type IssuePriority = (typeof ISSUE_PRIORITIES)[number];

export const STATUS_LABELS: Record<IssueStatus, string> = {
  open: "Open",
  in_progress: "In Progress",
  closed: "Closed",
};

export const PRIORITY_LABELS: Record<IssuePriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
};

export const STATUS_COLORS: Record<IssueStatus, string> = {
  open: "#22c55e",
  in_progress: "#3b82f6",
  closed: "#6b7280",
};

export const PRIORITY_COLORS: Record<IssuePriority, string> = {
  low: "#6b7280",
  medium: "#f59e0b",
  high: "#f97316",
  urgent: "#ef4444",
};

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 30) return `${diffDay}d ago`;
  return formatDate(date);
}
