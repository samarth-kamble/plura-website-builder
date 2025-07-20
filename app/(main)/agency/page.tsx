import React from "react";
import { Plan } from "@prisma/client";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import { getAuthUserDetails, verifyAndAcceptInvitation } from "@/lib/queries";
import AgencyDetails from "@/components/forms/AgencyDetails";

const AgencyPage = async ({
  searchParams,
}: {
  searchParams: {
    plan: Plan;
    state: string;
    code: string;
  };
}) => {
  const agencyId = await verifyAndAcceptInvitation();

  //   get user details
  const user = await getAuthUserDetails();
  if (agencyId) {
    if (user?.role === "SUBACCOUNT_GUEST" || user?.role === "SUBACCOUNT_USER") {
      return redirect(`/subaccount`);
    } else if (user?.role === "AGENCY_OWNER" || user?.role === "AGENCY_ADMIN") {
      if (searchParams.plan) {
        return redirect(
          `/agency/${agencyId}/billing?plan=${searchParams.plan}`
        );
      }
      if (searchParams.state) {
        const statePath = searchParams.state.split("___")[0];
        const stateAgencyId = searchParams.state.split("___")[1];
        if (!stateAgencyId) {
          return <div>Not Authorized!</div>;
        }
        return redirect(
          `/agency/${stateAgencyId}/${statePath}?code=${searchParams.code}`
        );
      } else return redirect(`/agency/${agencyId}`);
    } else {
      return <div>Not Authorized!</div>;
    }
  }

  const authUser = await currentUser();
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-6">
      <div className="flex justify-center items-start">
        <div className="w-full max-w-7xl">
          <AgencyDetails
            data={{
              companyEmail: authUser?.emailAddresses[0].emailAddress,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AgencyPage;
