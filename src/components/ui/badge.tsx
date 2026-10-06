import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "~/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-xs whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "border-line-strong bg-panel-2 text-fg-soft",
        blue: "border-blue/30 bg-blue/10 text-blue",
        green: "border-green/30 bg-green/10 text-green",
        magenta: "border-magenta/30 bg-magenta/10 text-magenta",
        orange: "border-orange/30 bg-orange/10 text-orange",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
