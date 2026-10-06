import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-mono text-sm font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-blue text-bg shadow-[0_0_24px_-6px_var(--color-blue)] hover:bg-blue/90 hover:shadow-[0_0_32px_-4px_var(--color-blue)]",
        outline:
          "border border-line-strong bg-panel text-fg hover:border-blue/60 hover:bg-panel-2 hover:text-blue",
        ghost: "text-fg-soft hover:bg-panel-2 hover:text-fg",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-3 text-xs",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
