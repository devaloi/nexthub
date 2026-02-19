"use client";

import { Badge, Button } from "@/components/ui";
import { toggleIssueLabel } from "@/lib/actions/labels";

interface Label {
  id: string;
  name: string;
  color: string;
}

interface LabelPickerProps {
  issueId: string;
  projectSlug: string;
  allLabels: Label[];
  assignedLabelIds: string[];
}

export function LabelPicker({
  issueId,
  projectSlug,
  allLabels,
  assignedLabelIds,
}: LabelPickerProps) {
  return (
    <div className="flex flex-wrap gap-1">
      {allLabels.map((label) => {
        const isAssigned = assignedLabelIds.includes(label.id);
        const toggleAction = toggleIssueLabel.bind(
          null,
          issueId,
          label.id,
          projectSlug
        );

        return (
          <form key={label.id} action={toggleAction}>
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className={[
                "rounded-full px-2 py-0.5",
                isAssigned ? "ring-2 ring-blue-400" : "opacity-50",
              ].join(" ")}
            >
              <Badge color={label.color}>{label.name}</Badge>
            </Button>
          </form>
        );
      })}
      {allLabels.length === 0 && (
        <p className="text-xs text-gray-400">No labels available</p>
      )}
    </div>
  );
}
