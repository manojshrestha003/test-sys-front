import * as React from "react";
import { createPortal } from "react-dom";
import { MoreVertical } from "lucide-react";
import { cn } from "@/common/utils";

export type ActionMenuItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "danger" | "warning";
  disabled?: boolean;
};

interface ActionMenuProps {
  actions: ActionMenuItem[];
  buttonClassName?: string;
  menuClassName?: string;
}

export function ActionMenu({
  actions,
  buttonClassName = "",
  menuClassName = "",
}: ActionMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [menuPosition, setMenuPosition] = React.useState({ top: 0, left: 0 });
  const menuRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      const trigger = buttonRef.current;
      if (!trigger) return;

      const rect = trigger.getBoundingClientRect();
      const menuWidth = 192;
      const gap = 8;

      setMenuPosition({
        top: Math.min(rect.bottom + gap, window.innerHeight - 160),
        left: Math.min(rect.right - menuWidth, window.innerWidth - menuWidth - 16),
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        buttonRef.current &&
        menuRef.current &&
        !buttonRef.current.contains(target) &&
        !menuRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const menuContent = isOpen ? (
    <div
      ref={menuRef}
      className={cn(
        "fixed z-[9999] w-48 origin-top-right rounded-xl border border-slate-200 bg-white p-1.5 shadow-2xl ring-1 ring-slate-200/80",
        menuClassName,
      )}
      style={{ top: menuPosition.top, left: menuPosition.left }}
    >
      {actions.map((action) => {
        const variantClasses = {
          default: "text-slate-700 hover:bg-slate-100",
          danger: "text-red-600 hover:bg-red-50",
          warning: "text-amber-700 hover:bg-amber-50",
        };

        return (
          <button
            key={action.id}
            type="button"
            disabled={action.disabled}
            onClick={() => {
              if (!action.disabled) {
                action.onClick?.();
                setIsOpen(false);
              }
            }}
            className={cn(
              "flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
              variantClasses[action.variant ?? "default"],
            )}
          >
            {action.icon && <span className="shrink-0">{action.icon}</span>}
            <span>{action.label}</span>
          </button>
        );
      })}
    </div>
  ) : null;

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20",
          buttonClassName,
        )}
        aria-label="Open actions menu"
        aria-expanded={isOpen}
      >
        <MoreVertical className="h-4 w-4" />
      </button>

      {typeof document !== "undefined" && createPortal(menuContent, document.body)}
    </>
  );
}
