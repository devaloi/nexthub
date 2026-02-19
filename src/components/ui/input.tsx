import { type InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={[
            "block w-full rounded-md border px-3 py-2 text-sm shadow-sm",
            "placeholder:text-gray-400",
            "focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
            "disabled:cursor-not-allowed disabled:bg-gray-50",
            error ? "border-red-300" : "border-gray-300",
            className,
          ].join(" ")}
          {...props}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
