import { Chat } from "@/lib/generated/prisma/client";
import React from "react";

interface SendMessageProp {
  myChat: Chat[];
}
export default function ShowMessages({ myChat }: SendMessageProp) {
  if (!myChat)
    return (
      <div className="w-full bg-red-300 p-1 text-xs text-black">
        <div>Chating not starting yet</div>
      </div>
    );
  return (
    <div>
      <div>
        {myChat.map((chat) => (
          <div key={chat.id}>
            <div>{chat.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
