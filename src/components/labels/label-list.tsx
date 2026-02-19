"use client";

import { useState } from "react";
import { Badge, Button, Card, CardContent, CardHeader } from "@/components/ui";
import { LabelForm } from "@/components/labels/label-form";
import {
  createLabel,
  updateLabel,
  deleteLabel,
} from "@/lib/actions/labels";

interface Label {
  id: string;
  name: string;
  color: string;
  _count: { issues: number };
}

export function LabelList({ labels }: { labels: Label[] }) {
  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Labels</h1>
          <p className="mt-1 text-sm text-gray-500">
            {labels.length} labels defined
          </p>
        </div>
        <Button onClick={() => setShowCreate(true)}>New Label</Button>
      </div>

      {showCreate && (
        <Card className="mb-6">
          <CardContent className="py-4">
            <LabelForm
              action={async (formData) => {
                const result = await createLabel(formData);
                if (result.success) setShowCreate(false);
                return result;
              }}
              submitLabel="Create"
              onCancel={() => setShowCreate(false)}
            />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="grid grid-cols-12 text-xs font-medium uppercase text-gray-500">
            <div className="col-span-5">Label</div>
            <div className="col-span-3">Issues</div>
            <div className="col-span-4 text-right">Actions</div>
          </div>
        </CardHeader>
        <ul className="divide-y divide-gray-100">
          {labels.map((label) => (
            <li key={label.id} className="px-6 py-3">
              {editingId === label.id ? (
                <LabelForm
                  action={async (formData) => {
                    const result = await updateLabel(label.id, formData);
                    if (result.success) setEditingId(null);
                    return result;
                  }}
                  defaultValues={{ name: label.name, color: label.color }}
                  submitLabel="Save"
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <div className="grid grid-cols-12 items-center">
                  <div className="col-span-5">
                    <Badge color={label.color}>{label.name}</Badge>
                  </div>
                  <div className="col-span-3 text-sm text-gray-500">
                    {label._count.issues} issue
                    {label._count.issues !== 1 ? "s" : ""}
                  </div>
                  <div className="col-span-4 flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingId(label.id)}
                    >
                      Edit
                    </Button>
                    <form action={deleteLabel.bind(null, label.id)}>
                      <Button type="submit" variant="ghost" size="sm">
                        Delete
                      </Button>
                    </form>
                  </div>
                </div>
              )}
            </li>
          ))}
          {labels.length === 0 && (
            <li className="px-6 py-8 text-center text-gray-400">
              No labels yet. Create one above.
            </li>
          )}
        </ul>
      </Card>
    </div>
  );
}
