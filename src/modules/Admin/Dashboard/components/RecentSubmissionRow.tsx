import { CheckCircle2, AlertCircle, MoreVertical } from "lucide-react";
import type { SubmissionData } from "../types/types";

export function RecentSubmissionRow({
  studentName,
  studentId,
  examTitle,
  score,
  passed,
  onActionClick,
}: SubmissionData) {
  return (
    <tr className="hover:bg-slate-50/80 transition-colors">
      <td className="py-3">
        <p className="font-medium text-slate-900">{studentName}</p>
        <p className="text-[11px] text-slate-400">{studentId}</p>
      </td>
      <td className="py-3 text-slate-600 text-xs">{examTitle}</td>
      <td className="py-3 font-semibold text-slate-900">{score}</td>
      <td className="py-3">
        {passed ? (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
            <CheckCircle2 className="w-3.5 h-3.5" /> Passed
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600">
            <AlertCircle className="w-3.5 h-3.5" /> Failed
          </span>
        )}
      </td>
      <td className="py-3 text-right">
        <button
          onClick={onActionClick}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}