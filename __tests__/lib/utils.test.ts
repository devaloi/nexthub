import { describe, it, expect } from "vitest";
import {
  slugify,
  formatDate,
  formatRelativeDate,
  ISSUE_STATUSES,
  ISSUE_PRIORITIES,
  STATUS_LABELS,
  PRIORITY_LABELS,
  STATUS_COLORS,
  PRIORITY_COLORS,
} from "@/lib/utils";

describe("slugify", () => {
  it("converts text to lowercase kebab-case", () => {
    expect(slugify("My Awesome Project")).toBe("my-awesome-project");
  });

  it("removes special characters", () => {
    expect(slugify("Hello, World!")).toBe("hello-world");
  });

  it("trims leading and trailing hyphens", () => {
    expect(slugify("  -hello-  ")).toBe("hello");
  });

  it("collapses multiple spaces and underscores", () => {
    expect(slugify("foo  bar__baz")).toBe("foo-bar-baz");
  });

  it("handles empty string", () => {
    expect(slugify("")).toBe("");
  });
});

describe("formatDate", () => {
  it("formats a date as short month, day, year", () => {
    const date = new Date("2025-06-15T12:00:00Z");
    const result = formatDate(date);
    expect(result).toContain("Jun");
    expect(result).toContain("15");
    expect(result).toContain("2025");
  });
});

describe("formatRelativeDate", () => {
  it('returns "just now" for very recent dates', () => {
    const date = new Date(Date.now() - 5000);
    expect(formatRelativeDate(date)).toBe("just now");
  });

  it("returns minutes ago for dates within the hour", () => {
    const date = new Date(Date.now() - 5 * 60 * 1000);
    expect(formatRelativeDate(date)).toBe("5m ago");
  });

  it("returns hours ago for dates within the day", () => {
    const date = new Date(Date.now() - 3 * 60 * 60 * 1000);
    expect(formatRelativeDate(date)).toBe("3h ago");
  });

  it("returns days ago for dates within the month", () => {
    const date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    expect(formatRelativeDate(date)).toBe("7d ago");
  });

  it("returns formatted date for older dates", () => {
    const date = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
    const result = formatRelativeDate(date);
    expect(result).not.toContain("ago");
  });
});

describe("constants", () => {
  it("has all issue statuses defined", () => {
    expect(ISSUE_STATUSES).toEqual(["open", "in_progress", "closed"]);
  });

  it("has all issue priorities defined", () => {
    expect(ISSUE_PRIORITIES).toEqual(["low", "medium", "high", "urgent"]);
  });

  it("has labels for all statuses", () => {
    for (const status of ISSUE_STATUSES) {
      expect(STATUS_LABELS[status]).toBeDefined();
    }
  });

  it("has labels for all priorities", () => {
    for (const priority of ISSUE_PRIORITIES) {
      expect(PRIORITY_LABELS[priority]).toBeDefined();
    }
  });

  it("has colors for all statuses", () => {
    for (const status of ISSUE_STATUSES) {
      expect(STATUS_COLORS[status]).toMatch(/^#[0-9a-f]{6}$/);
    }
  });

  it("has colors for all priorities", () => {
    for (const priority of ISSUE_PRIORITIES) {
      expect(PRIORITY_COLORS[priority]).toMatch(/^#[0-9a-f]{6}$/);
    }
  });
});
