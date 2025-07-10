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

  const contactOwner = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
  });
  const myContacts = await prisma.myContacts.findMany({
    where: {
      ownerId: contactOwner?.id,
      isContactRegistered: true,
    },
  });
  return (
    <div>
      <div>
        <div className="">
          <Navbar />
        </div>
        <div className="flex">
          <div className="h-[53.3rem] w-[450px] bg-black">
            <SideBar
              myContacts={myContacts}
              contactOwnerId={contactOwner?.id!}
            />
          </div>
          <div className="h-[53.3rem] w-screen">
            <MessagePage
              receiverId={params.chatId}
              senderId={contactOwner?.id!}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
