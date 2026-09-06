
import { useId } from "react";
export interface RadioOption {
  value: string;
  label: React.ReactNode;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  description?: string;
  error?: string;
  orientation?: "vertical" | "horizontal";
  disabled?: boolean;
  className?: string;
}

export function RadioGroup({
  name,
  options,
  value,
  onChange,
  label,
  description,
  error,
  orientation = "vertical",
  disabled = false,
  className = "",
}: RadioGroupProps) {
  const generatedName = useId();
  const groupName = name || generatedName;

  return (
    <fieldset className={`flex flex-col gap-2 ${className}`}>
      {/* Group Title & Description */}
      {label && (
        <legend className="text-sm font-semibold text-slate-900 mb-0.5">
          {label}
        </legend>
      )}
      {description && (
        <p className="text-xs text-slate-500 -mt-1 mb-1">{description}</p>
      )}

      {/* Options Container */}
      <div
        className={`flex ${
          orientation === "horizontal"
            ? "flex-row flex-wrap gap-6"
            : "flex-col gap-3"
        }`}
      >
        {options.map((option) => {
          const isChecked = option.value === value;
          const isDisabled = disabled || option.disabled;
          const optionId = `${groupName}-${option.value}`;

          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={`
                flex items-start gap-3 cursor-pointer select-none group
                ${isDisabled ? "cursor-not-allowed opacity-60" : ""}
              `}
            >
              {/* Radio Control */}
              <div className="relative flex items-center justify-center pt-0.5">
                <input
                  type="radio"
                  id={optionId}
                  name={groupName}
                  value={option.value}
                  checked={isChecked}
                  disabled={isDisabled}
                  onChange={() => !isDisabled && onChange(option.value)}
                  className="peer sr-only"
                />

                {/* Custom Outer Circle */}
                <div
                  className={`
                    w-4 h-4 rounded-full border transition-all duration-150 flex items-center justify-center
                    ${
                      isDisabled
                        ? "bg-slate-100 border-slate-200"
                        : isChecked
                        ? "border-indigo-600 bg-indigo-600 group-hover:bg-indigo-700 group-hover:border-indigo-700"
                        : "border-slate-300 bg-white group-hover:border-indigo-500 peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-600/30"
                    }
                    ${error ? "border-red-500" : ""}
                  `}
                >
                  {/* Inner Dot */}
                  <div
                    className={`
                      w-1.5 h-1.5 rounded-full bg-white transition-transform duration-150
                      ${isChecked ? "scale-100" : "scale-0"}
                    `}
                  />
                </div>
              </div>

              {/* Text Label & Subtext */}
              <div className="flex flex-col text-sm leading-none">
                <span
                  className={`font-medium ${
                    isDisabled
                      ? "text-slate-400"
                      : isChecked
                      ? "text-slate-900"
                      : "text-slate-700 group-hover:text-slate-900"
                  }`}
                >
                  {option.label}
                </span>
                {option.description && (
                  <p className="text-xs text-slate-500 mt-1.5 leading-normal">
                    {option.description}
                  </p>
                )}
              </div>
            </label>
          );
        })}
      </div>

      {/* Validation Error Message */}
      {error && <p className="text-xs text-red-600 font-medium mt-1">{error}</p>}
    </fieldset>
  );
}