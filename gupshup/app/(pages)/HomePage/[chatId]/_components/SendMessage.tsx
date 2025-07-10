import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendIcon } from "lucide-react";
import React from "react";

export default function SendMessage() {
  return (
    <div>
      <div>
        <div>
          <div className="bg-slate-700 p-4 border-t border-slate-600 flex items-center gap-2 rounded-2xl shadow-sm shadow-gray-500">
            <Input
              //   onChange={(e) => {
              //     setInputMessage(e.target.value);
              //   }}
              //   value={inputMessage}
              placeholder="Enter your message ..."
              className="flex-1 text-black bg-white border-none focus:outline-none focus:ring-0"
            />
            <Button
              //   onClick={() => {
              //     socket.emit("chat message", inputMessage);
              //     setInputMessage("");
              //   }}
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
