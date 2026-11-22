import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ButtonProps } from "./_types/button";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-colors outline-none disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        default: "bg-[#176b50] text-white hover:bg-[#12583f]",
        outline: "border border-[#dce5df] bg-white text-[#35463c] hover:bg-[#f3f6f3]",
        ghost: "text-[#55635a] hover:bg-[#f3f6f3]",
        destructive: "bg-red-600 text-white hover:bg-red-700",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-9 px-3",
        lg: "h-12 px-5",
        icon: "size-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  ),
);
Button.displayName = "Button";
