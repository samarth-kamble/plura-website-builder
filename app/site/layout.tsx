import React from "react";
import AuthProvider from "@/components/providers/AuthProvider";
import Navigation from "./_components/Navigation";

const layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <AuthProvider>
      <main className="h-full">
        <Navigation />
        {children}
      </main>
    </AuthProvider>
  );
};

export default layout;
