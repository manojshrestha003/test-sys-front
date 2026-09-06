
import { AlertCircle, Clock, Info } from "lucide-react";
import type { SystemAlertProps } from "../types/types";



export function SystemAlert({ variant = "info", title, message }: SystemAlertProps) {
  const styles = {
    warning: {
      bg: "bg-amber-50 border-amber-200 text-amber-900",
      icon: <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />,
    },
    info: {
      bg: "bg-blue-50 border-blue-200 text-blue-900",
      icon: <Clock className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />,
    },
    neutral: {
      bg: "bg-slate-50 border-slate-200 text-slate-800",
      icon: <Info className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />,
    },
  }[variant];

  return (
    <div className={`p-3 rounded-lg border flex gap-3 text-xs ${styles.bg}`}>
      {styles.icon}
      <div>
        <span className="font-semibold">{title}: </span>
        {message}
      </div>
    </div>
  );
}