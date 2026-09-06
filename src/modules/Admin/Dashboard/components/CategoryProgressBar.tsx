
import  type{ CategoryBarProps } from "../types/types";

export function CategoryProgressBar({
  label,
  count,
  percentage,
  colorClass = "bg-indigo-600",
}: CategoryBarProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs font-medium">
        <span className="text-slate-700">{label}</span>
        <span className="text-slate-400">
          {count.toLocaleString()} ({percentage}%)
        </span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full ${colorClass} rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}