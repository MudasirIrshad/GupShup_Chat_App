"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface AddContactFormProps {
  contactOwnerId: string;
}
export default function AddContactForm({
  contactOwnerId,
}: AddContactFormProps) {
  const [name, setName] = useState<String>();
  const [email, setEmail] = useState<String>();

  const handleClick = () => {
    try {
      axios
        .post("/api/add-contacts", {
          name,
          email,
          ownerId: contactOwnerId,
        })
        .then(() => {
          toast.success(`${name} is added to your contact.`);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } catch (error) {
      toast.error("Some thing went wrong");
    }
  };
  return (
    <div className="items-center flex justify-center">
      <div className="w-[600px] h-[400px] bg-gray-600 items-center justify-center flex flex-col rounded-2xl">
        <div className="w-[550px] m-5 space-y-10 text-center">
          <h1 className="font-bold text-2xl">Add new contact</h1>
          <div className="flex gap-4 ">
            <Input
              placeholder="Enter Gmail of your contact..."
              onChange={(e) => {
                setName(e.target.value);
              }}
            />{" "}
            Name
          </div>
          <div className="flex gap-4">
            <Input
              placeholder="Enter Gmail of your contact..."
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />{" "}
            Gmail
          </div>
          <Button
            onClick={handleClick}
            className="w-full mt-4 bg-blue-500 hover:bg-blue-600 hover:shadow-white"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
