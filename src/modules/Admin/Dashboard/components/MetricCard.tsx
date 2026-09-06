
import { Card } from "@/common/components/ui/Card";
import type { MetricCardProps } from "../types/types";

export function MetricCard({
  title,
  value,
  subtext,
  icon,
  iconBgColor = "bg-indigo-50",
}: MetricCardProps) {
  return (
    <Card className="p-5 bg-white border-slate-200 shadow-sm flex items-start justify-between">
      <div>
        <p className="text-xs font-medium text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
        <p className="text-[11px] text-slate-400 mt-1">{subtext}</p>
      </div>
      <div className={`p-3 rounded-xl ${iconBgColor}`}>{icon}</div>
    </Card>
  );
}