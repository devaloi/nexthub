import { getLabels } from "@/lib/actions/labels";
import { LabelList } from "@/components/labels/label-list";

export default async function LabelsPage() {
  const labels = await getLabels();
  return <LabelList labels={labels} />;
}
