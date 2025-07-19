"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { Menu, X, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import logoImage from "@/public/assets/plura-logo.svg";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

const Navigation = () => {
  const { user } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#pricing", label: "Pricing" },
    { href: "#about", label: "About" },
    { href: "#docs", label: "Documentation" },
    { href: "#features", label: "Features" },
  ];

  return (
    <header
      className={cn(
        "top-0 left-0 right-0 z-50 transition-all duration-300 ease-out",
        // Mobile: sticky with blur background when scrolled
        "md:relative", // Desktop: not sticky
        "max-md:fixed", // Mobile: fixed/sticky
        isScrolled
          ? "max-md:bg-white/90 max-md:dark:bg-[#1a1a1a]/90 max-md:backdrop-blur-xl max-md:border-b max-md:border-gray-200/50 max-md:dark:border-gray-800/60 max-md:shadow-sm"
          : "max-md:bg-white/50 max-md:dark:bg-transparent max-md:backdrop-blur-sm",
        // Desktop: always transparent
        "md:bg-transparent md:dark:bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo Section */}
        <aside className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-orange-400/20 dark:to-orange-600/20 rounded-full blur-sm opacity-10 group-hover:opacity-20 transition-opacity duration-300" />
            <Image
              src={logoImage}
              width={36}
              height={36}
              alt="Plura Logo"
              className="relative z-10 transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="relative">
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Plura
            </span>
            <Sparkles className="absolute -top-1 -right-2 h-3 w-3 text-gray-500 dark:text-orange-500/60 opacity-40 group-hover:opacity-70 transition-opacity duration-300" />
          </div>
        </aside>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link, index) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-out",
                    "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white",
                    "before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r",
                    "before:from-gray-100/50 before:to-gray-200/30 dark:before:from-gray-700/30 dark:before:to-gray-600/20 before:opacity-0",
                    "hover:before:opacity-100 before:transition-opacity before:duration-300",
                    "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2",
                    "after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-gray-600 after:to-gray-700 dark:after:from-orange-400 dark:after:to-orange-500",
                    "hover:after:w-full after:transition-all after:duration-300"
                  )}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <span className="relative z-10">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Side Actions */}
        <aside className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "md:hidden p-2 rounded-lg transition-all duration-300",
              "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            )}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          {/* Get Started Button - Uses your shadcn button styling */}
          <Link
            href="/agency"
            className={cn(
              buttonVariants({ variant: "default" }),
              "relative overflow-hidden group",
              "font-medium px-6 py-2.5",
              "transition-all duration-300 ease-out",
              "hover:scale-105 active:scale-95"
            )}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              {user ? "Dashboard" : "Get Started"}
              {!user && <Sparkles className="h-4 w-4" />}
            </span>
          </Link>

          {/* User Button */}
          {user && (
            <div className="flex items-center">
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox:
                      "h-9 w-9 rounded-xl shadow-md hover:shadow-lg transition-all duration-300",
                  },
                }}
              />
            </div>
          )}

          {/* Theme Switcher */}
          <ThemeSwitcher />
        </aside>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "md:hidden absolute top-16 left-0 right-0 transition-all duration-300 ease-out",
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <div className="bg-white/95 dark:bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/60 shadow-lg">
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "block px-4 py-3 rounded-lg font-medium transition-all duration-300",
                      "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white",
                      "hover:bg-gradient-to-r hover:from-gray-100/50 hover:to-gray-200/30 dark:hover:from-gray-700/30 dark:hover:to-gray-600/20"
                    )}
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
