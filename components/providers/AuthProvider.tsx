"use client";

import React from "react";

import { useTheme } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";
import { dark as darkTheme } from "@clerk/themes";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === "dark" ? darkTheme : undefined,
        variables: {
          colorPrimary: "#d97757",
        },
        elements: {
          card: "w-full max-w-md md:max-w-lg p-6 md:p-8 shadow-lg rounded-xl dark:bg-[#262624] bg-[#faf9f5]",
          formButtonPrimary:
            "h-10 px-4 text-sm rounded-md bg-[#d97757] hover:bg-[#f87171] text-white font-medium",
          formFieldInput:
            "h-10 px-4 text-sm rounded-md bg-white dark:bg-[#1e1e1e] border border-gray-300 dark:border-gray-600 text-black dark:text-white",
          footerActionLink: "text-[#d97757] hover:text-[#f87171] text-sm",
          socialButtonsBlockButton:
            "h-10 px-4 text-sm rounded-md bg-[#d97757] hover:bg-[#f87171] text-white font-medium",
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
