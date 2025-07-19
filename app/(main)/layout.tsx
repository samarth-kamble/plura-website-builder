import AuthProvider from "@/components/providers/AuthProvider";
import React from "react";

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default MainLayout;
