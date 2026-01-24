import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold ring-offset-background transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-[0_4px_14px_-2px_hsl(0_0%_0%/0.15)] hover:shadow-[0_6px_20px_-2px_hsl(0_0%_0%/0.2)] hover:-translate-y-0.5 active:translate-y-0",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md",
        outline: "border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm",
        ghost: "hover:bg-accent/50 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        cta: "bg-[hsl(210,65%,35%)] text-white shadow-[0_4px_20px_-4px_hsl(210_65%_35%/0.5)] hover:shadow-[0_8px_30px_-4px_hsl(210_65%_35%/0.6)] hover:-translate-y-1 hover:bg-[hsl(210,65%,30%)] active:translate-y-0",
        hero: "bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0",
        "hero-outline": "border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary",
        wood: "bg-wood text-wood-foreground hover:bg-wood/90 shadow-md hover:shadow-lg",
        gold: "bg-gradient-to-r from-gold to-gold-dark text-white shadow-[0_4px_20px_-4px_hsl(var(--gold)/0.5)] hover:shadow-[0_8px_30px_-4px_hsl(var(--gold)/0.6)] hover:-translate-y-1",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4 text-sm",
        lg: "h-13 px-8 py-3 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
