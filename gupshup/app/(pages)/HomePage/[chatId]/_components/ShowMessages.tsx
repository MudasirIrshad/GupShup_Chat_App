"use client";
import { Chat } from "@/lib/generated/prisma/client";
import { socket } from "@/socekt";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

interface SendMessageProp {
  myChat: Chat[];
  userId: string;
}

export default function ShowMessages({ myChat, userId }: SendMessageProp) {
  const [messages, setMessages] = useState(myChat);
  const router = useRouter();
    const endOfMessagesRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (!userId) return;

    socket.emit("join user", userId);

    const handleNewMsg = (msg: Chat) => {
      setMessages((prev) => [...prev, msg]);
      console.log("📩 New message:", msg);
    };

    socket.on("new message", handleNewMsg);

    return () => {
      socket.off("new message", handleNewMsg);
    };
  }, [userId]);

  if (!myChat || myChat.length === 0) {
    return (
      <div className="w-full bg-red-100 p-2 text-sm text-gray-700 rounded">
        Chat not started yet.
      </div>
    );
  }
    useEffect(() => {
    // Scroll to the bottom when messages change
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="p-4 space-y-2 max-h-[60vh] overflow-y-auto">
      {messages.map((msg) => {
        const isOwnMessage = msg.receiverId === userId;

        return (
          <div
            key={msg.id}
            className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg shadow-sm text-sm ${
                isOwnMessage
                  ? "bg-green-500 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.content}
            </div>
          </div>
        );
      })}
       <div ref={endOfMessagesRef} />
    </div>
  );
}
