import React from "react";
import SendMessage from "./SendMessage";
import prisma from "@/lib/prisma";
import ShowMessages from "./ShowMessages";

interface MessagePageProps {
  receiverId: string;
  senderId: string;
}
export default async function MessagePage({
  receiverId,
  senderId,
}: MessagePageProps) {
  const myChat = await prisma.chat.findFirst({
    where: {
      OR: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    },
  });
  return (
    <div className="flex flex-col justify-between h-full p-5">
      <div className="overflow-y-scroll">
        <ShowMessages myChat={myChat!} />
      </div>
      <div>
        <SendMessage receiverId={receiverId} senderId={senderId} />
      </div>
    </div>
  );
}
