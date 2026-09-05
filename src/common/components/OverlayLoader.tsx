import * as React from "react";
import { Loader2 } from "lucide-react";

export interface OverlayLoaderProps {
  isLoading: boolean;
  text?: string;
  mode?: "full" | "container" | "inline";
}

export function OverlayLoader({
  isLoading,
  text = "Loading...",
  mode = "full",
}: OverlayLoaderProps) {
  if (!isLoading) return null;

  if (mode === "inline") {
    return (
      <div className="flex items-center gap-2 text-sm text-slate-600 animate-in fade-in duration-150">
        <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
        {text && <span>{text}</span>}
      </div>
    );
  }

  const positionClasses =
    mode === "full"
      ? "fixed inset-0 z-50"
      : "absolute inset-0 z-40 rounded-inherit";

  return (
    <div
      className={`
        ${positionClasses}
        /* Blur and transparent background layer */
        bg-slate-900/10 backdrop-blur-md
        flex flex-col items-center justify-center p-4
        transition-all duration-200 ease-in-out
        animate-in fade-in-0
      `}
      aria-busy="true"
      aria-live="polite"
    >
      {/* Frosted Glass Card Container */}
      <div className="flex flex-col items-center gap-3 bg-white/40 backdrop-blur-lg border border-white/60 px-6 py-5 rounded-2xl shadow-xl max-w-xs text-center">
        {/* Animated Spinner Icon */}
        <div className="relative flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          <div className="absolute inset-0 rounded-full blur-md bg-indigo-500/30 -z-10 animate-pulse" />
        </div>

        {/* Text Label */}
        {text && (
          <p className="text-sm font-semibold text-slate-800 tracking-wide drop-shadow-sm">
            {text}
          </p>
        )}
      </div>
    </div>
  );
}