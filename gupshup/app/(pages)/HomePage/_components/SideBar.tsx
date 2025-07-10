"use client";
import Link from "next/link";
import React from "react";
import { Contact2Icon, MessageCircleMore, SettingsIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { MyContacts } from "@/lib/generated/prisma/client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import MyContactList from "../../../../components/MyContactList";

interface SideBarProps {
  myContacts: MyContacts[];
  contactOwnerId: string;
}
export default function SideBar({ myContacts, contactOwnerId }: SideBarProps) {
  const { data: session } = useSession();

  const routes = [
    {
      link: "/HomePage",
      icon: <MessageCircleMore size={32} />,
    },
    {
      link: "/add-contact",
      icon: <Contact2Icon size={32} />,
    },
    {
      link: "/settings",
      icon: <SettingsIcon size={32} />,
    },
    {
      link: "/profile",
      icon: (
        <Avatar className="bg-black items-center justify-center">
          <AvatarImage
            src={session?.user?.image || "https://github.com/shadcn.png"}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
    },
  ];
  return (
    <div className="flex gap-2">
      <div className="bg-gray-600 h-[53.3rem] p-2">
        {routes.map((route) => (
          <div className="mt-8 items-center" key={route.link}>
            <Link href={route.link}>{route.icon}</Link>
          </div>
        ))}
      </div>
      <div className="p-2 w-full ">
        <MyContactList myContacts={myContacts} />
      </div>
    </div>
  );
}
