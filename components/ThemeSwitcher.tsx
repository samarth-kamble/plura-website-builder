"use client";
import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const ThemeSwitcher: React.FC<
  React.HTMLAttributes<HTMLButtonElement>
> = ({ className, ...props }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Fix hydration issue
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "relative h-11 w-11 rounded-xl",
          "bg-gray-100 dark:bg-gray-800",
          "border border-gray-200 dark:border-gray-700",
          "shadow-sm",
          className
        )}
        disabled
      >
        <div className="h-5 w-5 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse" />
      </Button>
    );
  }

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        "relative h-11 w-11 rounded-xl overflow-hidden group",
        "bg-gray-100 hover:bg-gray-200",
        "dark:bg-gray-800 dark:hover:bg-gray-700",
        "border border-gray-200/60 dark:border-gray-700/60",
        "hover:border-gray-300 dark:hover:border-gray-600",
        "transition-all duration-300 ease-out",
        "hover:scale-105 active:scale-95",
        "shadow-sm hover:shadow-md",
        "backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {/* Background animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-gray-700/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />

      <div className="relative flex items-center justify-center">
        <Sun
          className={cn(
            "h-5 w-5 transition-all duration-500 ease-out",
            "text-gray-700 dark:text-gray-300 drop-shadow-sm",
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          )}
        />
        <Moon
          className={cn(
            "absolute h-5 w-5 transition-all duration-500 ease-out",
            "text-gray-600 dark:text-gray-400 drop-shadow-sm",
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          )}
        />
      </div>

      <span className="sr-only">Toggle between light and dark mode</span>
    </Button>
  );
};
