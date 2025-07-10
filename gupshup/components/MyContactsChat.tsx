import { MyContacts } from "@/lib/generated/prisma/client";
import React from "react";

interface MyContactsChatProps {
  myContacts: MyContacts[];
}
export default function MyContactsChat({ myContacts }: MyContactsChatProps) {
  if (myContacts.length == 0)
    return (
      <div>
        <div>No Contacts and chats</div>
      </div>
    );
  return <div>MyContactsChat</div>;
}
