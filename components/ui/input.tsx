import * as React from "react";
import { cn } from "@/lib/utils";
import type { InputProps } from "./_types/input";

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "h-11 w-full rounded-xl border border-[#dce5df] bg-white px-3 text-sm outline-none transition-colors focus:border-[#5b997c] focus:ring-2 focus:ring-[#5b997c]/15 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
