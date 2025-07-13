"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { socket } from "@/socekt";
import { SendIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

interface SendMessageProp {
  receiverId: string;
  senderId: string;
}
export default function SendMessage({ receiverId, senderId }: SendMessageProp) {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<{ msg: string; id: string }[]>([]);

  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);
  useEffect(() => {
    const handleMessages = (message: {
      id: string;
      msg: string;
      senderId: string;
      createdAt: Date;
    }) => {
      setMessages((prev) => [
        ...prev,
        {
          id: message.id,
          msg: message.msg,
          senderId: message.senderId,
          isOwn: message.senderId === senderId, // For UI styling
        },
      ]);
    };
    socket.on("chat message", handleMessages);
    return () => {
      socket.off("chat message", handleMessages);
    };
  }, []);
  return (
    <div>
      <div>
        <p>Status: {isConnected ? "connected" : "disconnected"}</p>
        <div>
          <div className="bg-slate-700 p-4 border-t border-slate-600 flex items-center gap-2 rounded-2xl shadow-sm shadow-gray-500">
            <Input
              onChange={(e) => {
                setInputMessage(e.target.value);
              }}
              value={inputMessage}
              placeholder="Enter your message ..."
              className="flex-1 text-black bg-white border-none focus:outline-none focus:ring-0"
            />
            <Button
              onClick={() => {
                socket.emit("chat message", {
                  inputMessage,
                  content: inputMessage,
                  senderId: senderId,
                  receiverId: receiverId,
                });
                setInputMessage("");
              }}
              className="bg-green-500 hover:bg-green-600"
            >
              <SendIcon size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
