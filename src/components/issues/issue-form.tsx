"use client";

import { useActionState } from "react";
import { Button, Input, Textarea, Select } from "@/components/ui";
import { type ActionResult } from "@/lib/validations";
import {
  ISSUE_STATUSES,
  STATUS_LABELS,
  ISSUE_PRIORITIES,
  PRIORITY_LABELS,
} from "@/lib/utils";

interface IssueFormProps {
  action: (formData: FormData) => Promise<ActionResult>;
  defaultValues?: {
    title: string;
    description: string;
    status: string;
    priority: string;
  };
  submitLabel: string;
}

export function IssueForm({
  action,
  defaultValues,
  submitLabel,
}: IssueFormProps) {
  const [state, formAction, pending] = useActionState(
    async (_prev: ActionResult | null, formData: FormData) => action(formData),
    null
  );

  return (
    <form action={formAction} className="max-w-lg space-y-4">
      {state?.error && (
        <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}
      <Input
        id="title"
        name="title"
        label="Title"
        placeholder="Issue title"
        defaultValue={defaultValues?.title}
        error={state?.fieldErrors?.title?.[0]}
        required
      />
      <Textarea
        id="description"
        name="description"
        label="Description"
        placeholder="Describe the issue..."
        defaultValue={defaultValues?.description}
        error={state?.fieldErrors?.description?.[0]}
      />
      <div className="grid grid-cols-2 gap-4">
        <Select
          id="status"
          name="status"
          label="Status"
          defaultValue={defaultValues?.status ?? "open"}
          options={ISSUE_STATUSES.map((s) => ({
            value: s,
            label: STATUS_LABELS[s],
          }))}
          error={state?.fieldErrors?.status?.[0]}
        />
        <Select
          id="priority"
          name="priority"
          label="Priority"
          defaultValue={defaultValues?.priority ?? "medium"}
          options={ISSUE_PRIORITIES.map((p) => ({
            value: p,
            label: PRIORITY_LABELS[p],
          }))}
          error={state?.fieldErrors?.priority?.[0]}
        />
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
