"use client";
import { MyContacts } from "@/lib/generated/prisma/client";
import { CheckCircle, Trash2Icon, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface MyContactListProps {
  myContacts: MyContacts[];
}

export default function MyContactList({ myContacts }: MyContactListProps) {
  const router = useRouter();
  return (
    <div className="space-y-6 pt-4">
      <div className="space-y-4">
        {myContacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-gray-700 text-white p-4 rounded-xl shadow hover:bg-gray-800 transition duration-150 hover:cursor-pointer"
            onClick={() => {
              if (contact.isContactRegistered)
                router.push(`/HomePage/${contact.id}`);
            }}
          >
            <div className="text-lg font-bold">{contact.contactName}</div>

            <div className="text-sm text-gray-300 mb-2">
              Added on: {new Date(contact.createdAt).toLocaleDateString()}
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                {contact.isContactRegistered ? (
                  <>
                    <CheckCircle className="text-green-400" size={18} />
                    <span className="text-green-400 text-sm">Verified</span>
                  </>
                ) : (
                  <>
                    <XCircle className="text-red-400" size={18} />
                    <span className="text-red-400 text-sm">Not Verified</span>
                  </>
                )}
              </div>

              <button className="text-gray-400 hover:text-red-500 transition">
                <Trash2Icon size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
