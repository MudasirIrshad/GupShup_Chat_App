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
  const myChat = await prisma.chat.findMany({
    where: {
      OR: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    },
    orderBy: {
      createdAt: "asc", // ensure messages are in order
    },
  });

  console.log("THis is the id: ", receiverId);

  return (
    <div className="flex flex-col justify-between h-full p-5">
      <div>
        <ShowMessages myChat={myChat!} userId={receiverId} />
      </div>
      <div>
        <SendMessage receiverId={receiverId} senderId={senderId} />
      </div>
    </div>
  );
}
