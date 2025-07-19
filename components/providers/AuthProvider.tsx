"use client";

import React from "react";

import { useTheme } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";
import { dark as darkTheme } from "@clerk/themes";

const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === "dark" ? darkTheme : undefined,
        variables: {
          colorPrimary: "#d97757",
        },
        elements: {
          // Card container (background already customized by you)
          card: "w-full max-w-md md:max-w-lg p-6 md:p-8 shadow-lg rounded-xl dark:bg-[#262624] bg-[#faf9f5]",

          // Main form button ("Continue")
          formButtonPrimary:
            "h-10 px-4 text-sm rounded-md bg-[#d97757] hover:bg-[#f87171] text-white font-medium",

          // Input fields
          formFieldInput:
            "h-10 px-4 text-sm rounded-md bg-white dark:bg-[#1e1e1e] border border-gray-300 dark:border-gray-600 text-black dark:text-white",

          // Footer links ("Don't have an account?" etc.)
          footerActionLink: "text-[#d97757] hover:text-[#f87171] text-sm",

          // Social login buttons (Google, GitHub, etc.)
          socialButtonsBlockButton:
            "h-10 px-4 text-sm rounded-md bg-[#d97757] hover:bg-[#f87171] text-white font-medium",

          // Optional: Font size boost on all text
          headerTitle: "text-lg font-semibold",
          headerSubtitle: "text-base",
          formFieldLabel: "text-sm font-medium",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
};

export default AuthProvider;
