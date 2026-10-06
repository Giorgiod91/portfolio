import * as React from "react";

import { cn } from "~/lib/utils";

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded border border-line-strong bg-panel-2 px-1.5 font-mono text-[11px] text-fg-soft",
        className,
      )}
      {...props}
    />
  );
}

export { Kbd };
