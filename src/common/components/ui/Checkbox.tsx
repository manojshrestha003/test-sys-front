import * as React from "react";
import { Check, Minus } from "lucide-react";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  /**
   * Main text label for the checkbox.
   */
  label?: React.ReactNode;
  /**
   * Optional helper text or description below the label.
   */
  description?: string;
  /**
   * Error message to render beneath the input.
   */
  error?: string;
  /**
   * Visually displays a horizontal dash icon (mixed/indeterminate state).
   */
  indeterminate?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      description,
      error,
      indeterminate = false,
      checked = false,
      disabled = false,
      className = "",
      id,
      onChange,
      ...props
    },
    ref
  ) => {
    // Generate a unique ID if one isn't passed for label linkage
    const generatedId = React.useId();
    const checkboxId = id || generatedId;

    // Handle HTML input indeterminate property ref binding
    const internalRef = React.useRef<HTMLInputElement | null>(null);

    React.useImperativeHandle(ref, () => internalRef.current!);

    React.useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = Boolean(indeterminate);
      }
    }, [indeterminate]);

    const isCheckedOrIndeterminate = checked || indeterminate;

    return (
      <div className={`flex flex-col gap-1 ${className}`}>
        <div className="flex items-start gap-2.5">
          {/* Custom Checkbox Wrapper */}
          <div className="relative flex items-center justify-center pt-0.5">
            <input
              type="checkbox"
              id={checkboxId}
              ref={internalRef}
              checked={checked}
              disabled={disabled}
              onChange={onChange}
              className="peer sr-only"
              {...props}
            />

            {/* Custom Checkbox Box */}
            <div
              onClick={() => {
                if (!disabled && internalRef.current) {
                  internalRef.current.click();
                }
              }}
              className={`
                w-4 h-4 rounded border transition-all duration-150 ease-in-out cursor-pointer flex items-center justify-center select-none
                ${
                  disabled
                    ? "bg-slate-100 border-slate-200 cursor-not-allowed opacity-60"
                    : isCheckedOrIndeterminate
                    ? "bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-white border-slate-300 hover:border-indigo-500 peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-600/30"
                }
                ${error ? "border-red-500" : ""}
              `}
            >
              {indeterminate ? (
                <Minus className="w-3 h-3 stroke-[3]" />
              ) : (
                checked && <Check className="w-3 h-3 stroke-[3]" />
              )}
            </div>
          </div>

          {/* Label & Description Wrapper */}
          {(label || description) && (
            <div className="text-sm leading-none flex flex-col justify-center">
              {label && (
                <label
                  htmlFor={checkboxId}
                  className={`font-medium cursor-pointer ${
                    disabled ? "text-slate-400 cursor-not-allowed" : "text-slate-800"
                  }`}
                >
                  {label}
                </label>
              )}
              {description && (
                <p className="text-xs text-slate-500 mt-1">{description}</p>
              )}
            </div>
          )}
        </div>

        {/* Error Text */}
        {error && <p className="text-xs text-red-600 font-medium ml-6">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";