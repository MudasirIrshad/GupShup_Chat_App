import Navbar from "@/components/Navbar";
import SignIn from "@/components/sign-in";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import React from "react";
import SideBar from "../_components/SideBar";
import MessagePage from "./_components/MessagePage";

export default async function page({ params }: { params: { chatId: string } }) {
  const session = await auth();
  if (!session) return <SignIn />;

  try {
    // Get current user
    const contactOwner = await prisma.user.findUnique({
      where: { email: session.user?.email! },
    });
    if (!contactOwner) throw new Error("User not found");

    // Get contact details
    const contactDetails = await prisma.myContacts.findUnique({
      where: { id: params.chatId },
    });

    if (!contactDetails) throw new Error("Contact not found");
    if (!contactDetails.contactGmail) throw new Error("Contact has no email");

    // Get receiver's user ID
    const receiver = await prisma.user.findUnique({
      where: { email: contactDetails.contactGmail },
    });

    // Get user's contacts
    const myContacts = await prisma.myContacts.findMany({
      where: {
        ownerId: contactOwner.id,
        isContactRegistered: true,
      },
    });

    return (
      <div>
        <Navbar />
        <div className="flex">
          <div className="h-[53.3rem] w-[450px] bg-black">
            <SideBar myContacts={myContacts} contactOwnerId={contactOwner.id} />
          </div>
          <div className="h-[53.3rem] w-screen">
            <MessagePage
              receiverId={receiver?.id!} // Can be undefined if contact isn't registered
              senderId={contactOwner.id}
            />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading chat:", error);
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">
          Error loading chat: {(error as Error).message}
        </p>
      </div>
    );
  }
}
