import React from "react";
import { SignIn } from "@clerk/nextjs";
import { constructMetadata } from "@/lib/utils";

const Page: React.FC = ({}) => {
  return <SignIn path="/agency/sign-in" routing="path" />;
};

export default Page;

export const metadata = constructMetadata({
  title: "Sign In - Plura",
});
