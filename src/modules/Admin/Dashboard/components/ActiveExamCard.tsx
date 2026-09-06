
import { Button } from "@/common/components/ui/Button";
import type { ActiveExamCardProps } from "../types/types";

export function ActiveExamCard({
  title,
  questionSet,
  duration,
  activeStudents,
  startTime,
  status,
  onMonitorClick,
}: ActiveExamCardProps) {
  const isLive = status === "live";

  return (
    <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          {isLive ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              LIVE NOW
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-200 text-slate-700">
              SCHEDULED
            </span>
          )}
          <h3 className="font-semibold text-sm text-slate-900">{title}</h3>
        </div>
        <p className="text-xs text-slate-500">
          Set: <span className="font-medium text-slate-700">{questionSet}</span> • Duration: {duration}
        </p>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-0 pt-2 sm:pt-0 border-slate-200/60">
        <div className="text-left sm:text-right">
          {isLive ? (
            <p className="text-xs font-semibold text-indigo-600">{activeStudents} Students active</p>
          ) : (
            <p className="text-xs text-slate-500">{startTime}</p>
          )}
        </div>
        <Button
          variant="outline"
          onClick={onMonitorClick}
          className="h-8 text-xs bg-white border-slate-200 hover:bg-slate-50"
        >
          Monitor
        </Button>
      </div>
    </div>
  );
}