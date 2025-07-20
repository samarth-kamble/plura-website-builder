"use server";

import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Agency, User } from "@prisma/client";

import { db } from "./db";

// This function retrieves the authenticated user's details from the database
// It includes their agency, sidebar options, and permissions
// It is used to display user-specific information on the agency page
export const getAuthUserDetails = async () => {
  const user = await currentUser();

  if (!user) {
    return;
  }

  const userData = await db.user.findUnique({
    where: {
      email: user.emailAddresses[0].emailAddress,
    },
    include: {
      Agency: {
        include: {
          SidebarOption: true,
          SubAccount: {
            include: {
              SidebarOption: true,
            },
          },
        },
      },
      Permissions: {
        include: {
          SubAccount: true,
        },
      },
    },
  });

  return userData;
};

// This function creates a new user in the agency's team
// It is used when a user signs up or is invited to join an agency
// It checks if the user is an agency owner and skips creating a new user in that case
export const createTeamUser = async (agencyId: string, user: User) => {
  if (user.role === "AGENCY_OWNER") return null;

  const response = await db.user.create({
    data: {
      ...user,
    },
  });

  return response;
};

// This function saves activity logs and notifications for the user
// It can be used for various actions like creating a sub-account, updating settings, etc.
// It connects the notification to the user and agency, and optionally to a sub-account
export const saveActivityLogsNotification = async ({
  agencyId,
  description,
  subAccountId,
}: {
  agencyId?: string;
  description?: string;
  subAccountId?: string;
}) => {
  const authUser = await currentUser();
  let userData;
  if (!authUser) {
    const response = await db.user.findFirst({
      where: {
        Agency: {
          SubAccount: {
            some: { id: subAccountId },
          },
        },
      },
    });
    if (response) {
      userData = response;
    }
  } else {
    userData = await db.user.findUnique({
      where: { email: authUser?.emailAddresses[0].emailAddress },
    });
  }

  if (!userData) {
    console.log("Could not find a user");
    return;
  }

  // Find the agency ID if not provided
  let foundAgencyId = agencyId;
  if (!foundAgencyId) {
    if (!subAccountId) {
      throw new Error(
        "You need to provide at least an agency Id or subAccount id"
      );
    }

    const response = await db.subAccount.findUnique({
      where: {
        id: subAccountId,
      },
    });

    if (response) foundAgencyId = response.agencyId;
  }

  // Create the notification
  if (subAccountId) {
    await db.notification.create({
      data: {
        notification: `${userData.name} | ${description}`,
        User: {
          connect: {
            id: userData.id,
          },
        },
        Agency: {
          connect: {
            id: foundAgencyId,
          },
        },
        SubAccount: {
          connect: {
            id: subAccountId,
          },
        },
      },
    });
  } else {
    await db.notification.create({
      data: {
        notification: `${userData.name} | ${description}`,
        User: {
          connect: {
            id: userData.id,
          },
        },
        Agency: {
          connect: {
            id: foundAgencyId,
          },
        },
      },
    });
  }
};

// This function checks if a user has an invitation and accepts it if found
// It is used when a user clicks on an invitation link to join an agency
// It creates a new team user based on the invitation details
export const verifyAndAcceptInvitation = async () => {
  const user = await currentUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const invitationExists = await db.invitation.findUnique({
    where: {
      email: user.emailAddresses[0].emailAddress,
      status: "PENDING",
    },
  });
  if (invitationExists) {
    const userDetails = await createTeamUser(invitationExists.agencyId, {
      email: invitationExists.email,
      agencyId: invitationExists.agencyId,
      avatarUrl: user.imageUrl,
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      role: invitationExists.role,
      updatedAt: new Date(),
      createdAt: new Date(),
    });
    await saveActivityLogsNotification({
      agencyId: invitationExists?.agencyId,
      description: `You have accepted the invitation to join the agency.`,
      subAccountId: undefined,
    });

    if (userDetails) {
      const clerk = await clerkClient();
      await clerk.users.updateUserMetadata(user.id, {
        privateMetadata: {
          role: userDetails.role || "SUBACCOUNT_USER",
        },
      });
      await db.invitation.delete({
        where: {
          email: userDetails.email,
        },
      });
      return userDetails.agencyId;
    } else return null;
  } else {
    const agency = await db.user.findUnique({
      where: {
        email: user.emailAddresses[0].emailAddress,
      },
    });

    return agency ? agency.agencyId : null;
  }
};

// This function updates the agency details
// It can be used to change the agency's name, logo, or other details
// It is typically called when the agency owner or admin wants to modify the agency's information
export const updateAgencyDetails = async (
  agencyId: string,
  agencyDetails: Partial<Agency>
) => {
  const response = await db.agency.update({
    where: {
      id: agencyId,
    },
    data: {
      ...agencyDetails,
    },
  });
  return response;
};
