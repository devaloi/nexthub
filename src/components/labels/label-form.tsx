"use client";

import { useActionState, useState } from "react";
import { Button, Input, Badge } from "@/components/ui";
import { type ActionResult } from "@/lib/validations";

interface LabelFormProps {
  action: (formData: FormData) => Promise<ActionResult>;
  defaultValues?: { name: string; color: string };
  submitLabel: string;
  onCancel?: () => void;
}

export function LabelForm({
  action,
  defaultValues,
  submitLabel,
  onCancel,
}: LabelFormProps) {
  const [color, setColor] = useState(defaultValues?.color ?? "#6b7280");
  const [state, formAction, pending] = useActionState(
    async (_prev: ActionResult | null, formData: FormData) => {
      const result = await action(formData);
      return result;
    },
    null
  );

  return (
    <form action={formAction} className="flex items-end gap-3">
      {state?.error && (
        <p className="text-sm text-red-600">{state.error}</p>
      )}
      <div className="flex items-end gap-2">
        <div className="space-y-1">
          <label htmlFor="color" className="block text-sm font-medium text-gray-700">
            Color
          </label>
          <input
            type="color"
            id="color"
            name="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-9 w-12 cursor-pointer rounded border border-gray-300"
          />
        </div>
        <Input
          id="name"
          name="name"
          placeholder="Label name"
          defaultValue={defaultValues?.name}
          error={state?.fieldErrors?.name?.[0]}
          required
        />
      </div>
      <Badge color={color}>Preview</Badge>
      <div className="flex gap-2">
        <Button type="submit" size="sm" disabled={pending}>
          {pending ? "Saving..." : submitLabel}
        </Button>
        {onCancel && (
          <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
