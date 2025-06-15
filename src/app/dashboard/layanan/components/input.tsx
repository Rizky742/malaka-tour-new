import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => {
    return (
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium">{label}</label>
        <input
          ref={ref}
          className="border rounded-md px-3 py-2 text-sm"
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
