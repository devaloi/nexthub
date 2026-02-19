import { describe, it, expect } from "vitest";
import { projectSchema, issueSchema, labelSchema } from "@/lib/validations";

describe("projectSchema", () => {
  it("validates a valid project", () => {
    const result = projectSchema.safeParse({
      name: "My Project",
      description: "A test project",
    });
    expect(result.success).toBe(true);
  });

  it("requires a name", () => {
    const result = projectSchema.safeParse({
      name: "",
      description: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.name).toBeDefined();
    }
  });

  it("rejects names that are too long", () => {
    const result = projectSchema.safeParse({
      name: "a".repeat(101),
    });
    expect(result.success).toBe(false);
  });

  it("allows empty description", () => {
    const result = projectSchema.safeParse({
      name: "Test",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.description).toBe("");
    }
  });
});

describe("issueSchema", () => {
  it("validates a valid issue", () => {
    const result = issueSchema.safeParse({
      title: "Fix bug",
      description: "There is a bug",
      status: "open",
      priority: "high",
    });
    expect(result.success).toBe(true);
  });

  it("requires a title", () => {
    const result = issueSchema.safeParse({
      title: "",
    });
    expect(result.success).toBe(false);
  });

  it("defaults status to open", () => {
    const result = issueSchema.safeParse({
      title: "Test issue",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.status).toBe("open");
    }
  });

  it("defaults priority to medium", () => {
    const result = issueSchema.safeParse({
      title: "Test issue",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.priority).toBe("medium");
    }
  });

  it("rejects invalid status", () => {
    const result = issueSchema.safeParse({
      title: "Test",
      status: "invalid",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid priority", () => {
    const result = issueSchema.safeParse({
      title: "Test",
      priority: "critical",
    });
    expect(result.success).toBe(false);
  });

  it("rejects titles that are too long", () => {
    const result = issueSchema.safeParse({
      title: "a".repeat(201),
    });
    expect(result.success).toBe(false);
  });
});

describe("labelSchema", () => {
  it("validates a valid label", () => {
    const result = labelSchema.safeParse({
      name: "bug",
      color: "#d73a4a",
    });
    expect(result.success).toBe(true);
  });

  it("requires a name", () => {
    const result = labelSchema.safeParse({
      name: "",
      color: "#000000",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid hex color", () => {
    const result = labelSchema.safeParse({
      name: "test",
      color: "red",
    });
    expect(result.success).toBe(false);
  });

  it("rejects short hex color", () => {
    const result = labelSchema.safeParse({
      name: "test",
      color: "#fff",
    });
    expect(result.success).toBe(false);
  });

  it("accepts valid 6-digit hex color", () => {
    const result = labelSchema.safeParse({
      name: "test",
      color: "#abcdef",
    });
    expect(result.success).toBe(true);
  });

  it("rejects names that are too long", () => {
    const result = labelSchema.safeParse({
      name: "a".repeat(51),
      color: "#000000",
    });
    expect(result.success).toBe(false);
  });
});
