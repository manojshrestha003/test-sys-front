import { useState, useEffect, useRef } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}
    
export interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export function Dropdown({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  label,
  description,
  error,
  disabled = false,
  className = "",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown when clicking outside
useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation support (Esc, Arrow keys, Enter)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div className={`flex flex-col gap-1.5 w-full max-w-xs ${className}`} ref={containerRef}>
      {/* Label */}
      {label && (
        <label className="text-sm font-medium text-slate-800">
          {label}
        </label>
      )}

      {/* Select Trigger Button */}
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen((prev) => !prev)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={`
            w-full flex items-center justify-between px-3.5 py-2 text-sm rounded-lg border bg-white transition-all text-left shadow-sm
            ${
              disabled
                ? "bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed"
                : "text-slate-900 border-slate-300 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600"
            }
            ${error ? "border-red-500 focus:ring-red-500/20 focus:border-red-500" : ""}
          `}
        >
          <span className={selectedOption ? "text-slate-900 font-medium" : "text-slate-400"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-indigo-600" : ""
            }`}
          />
        </button>

        {/* Options Overlay Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-1 max-h-60 overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-150">
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  disabled={option.disabled}
                  onClick={() => {
                    if (!option.disabled) {
                      onChange(option.value);
                      setIsOpen(false);
                    }
                  }}
                  className={`
                    w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg text-left transition-colors
                    ${
                      option.disabled
                        ? "text-slate-300 cursor-not-allowed"
                        : isSelected
                        ? "bg-indigo-50 text-indigo-700 font-semibold"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    }
                  `}
                >
                  <span>{option.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-indigo-600" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Description or Error Text */}
      {description && !error && (
        <p className="text-xs text-slate-500">{description}</p>
      )}
      {error && (
        <p className="text-xs text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
}