"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef, useState } from "react";

const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "outline" | "ghost" | "primary";
  }
>(({ className, variant = "default", ...props }, ref) => {
  const [rippleStyle, setRippleStyle] = useState<{ left: string; top: string } | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const left = `${event.clientX - rect.left}px`;
    const top = `${event.clientY - rect.top}px`;
    
    setRippleStyle({ left, top });
    setTimeout(() => setRippleStyle(null), 1000);

    if (props.onClick) {
      props.onClick(event);
    }
  };

  const variantClasses = {
    default: cn(
      "bg-blue-600 text-white hover:bg-blue-700",
      "shadow-[0_4px_12px_rgba(59,130,246,0.2)]",
      "hover:shadow-[0_8px_24px_rgba(59,130,246,0.3)]"
    ),
    primary: cn(
      "bg-gradient-to-r from-indigo-600 via-violet-500 to-blue-600",
      "bg-[length:200%_100%] animate-gradient",
      "text-white shadow-[0_4px_16px_rgba(99,102,241,0.3)]",
      "hover:shadow-[0_8px_32px_rgba(99,102,241,0.4)]",
      "hover:from-indigo-500 hover:via-violet-400 hover:to-blue-500",
      "after:absolute after:inset-0 after:opacity-0 after:transition-opacity",
      "after:bg-gradient-to-r after:from-white/10 after:to-transparent",
      "hover:after:opacity-100"
    ),
    outline: cn(
      "border-2 border-blue-600/50 text-blue-100",
      "hover:bg-blue-900/20 hover:border-blue-500",
      "shadow-[0_2px_8px_rgba(59,130,246,0.1)]",
      "hover:shadow-[0_4px_16px_rgba(59,130,246,0.2)]"
    ),
    ghost: "text-blue-100 hover:bg-blue-800/20 hover:text-white transition-colors"
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium relative overflow-hidden",
        "transition-all duration-300 ease-out transform hover:scale-105",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50",
        "disabled:opacity-50 disabled:pointer-events-none",
        "px-4 py-2 select-none",
        variantClasses[variant],
        className
      )}
      ref={ref}
      onClick={handleClick}
      {...props}
    >
      {props.children}
      {rippleStyle && (
        <span
          className="absolute rounded-full bg-white/30 animate-ripple"
          style={{
            width: "200px",
            height: "200px",
            marginLeft: "-100px",
            marginTop: "-100px",
            left: rippleStyle.left,
            top: rippleStyle.top
          }}
        />
      )}
    </button>
  );
});
Button.displayName = "Button";

export { Button };