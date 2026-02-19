"use client";

import { useActionState } from "react";
import { Button, Input, Textarea } from "@/components/ui";
import { type ActionResult } from "@/lib/validations";

interface ProjectFormProps {
  action: (formData: FormData) => Promise<ActionResult>;
  defaultValues?: { name: string; description: string };
  submitLabel: string;
}

export function ProjectForm({
  action,
  defaultValues,
  submitLabel,
}: ProjectFormProps) {
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
        id="name"
        name="name"
        label="Project Name"
        placeholder="My Awesome Project"
        defaultValue={defaultValues?.name}
        error={state?.fieldErrors?.name?.[0]}
        required
      />
      <Textarea
        id="description"
        name="description"
        label="Description"
        placeholder="What is this project about?"
        defaultValue={defaultValues?.description}
        error={state?.fieldErrors?.description?.[0]}
      />
      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
