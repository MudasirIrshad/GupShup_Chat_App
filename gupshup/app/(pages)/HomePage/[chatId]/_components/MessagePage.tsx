import React from "react";
import SendMessage from "./SendMessage";

interface MessagePageProps {
  receiverId: string;
  senderId: string;
}
export default function MessagePage({
  receiverId,
  senderId,
}: MessagePageProps) {
  return (
    <div className="flex flex-col justify-between h-full p-5">
      <div className="overflow-y-scroll">abc</div>
      <div>
        <SendMessage />
      </div>
    </div>
  );
}
