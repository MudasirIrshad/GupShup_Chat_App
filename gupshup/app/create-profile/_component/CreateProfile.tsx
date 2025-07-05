"use client";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

interface CreateProfileProps {
  email: string;
  image: string;
  name: string;
}

function CreateProfile({ email, image, name }: CreateProfileProps) {
  const router = useRouter();

  const handleSubmit = () => {
    axios
      .post("/api/create-profile", {
        name,
        email,
      })
      .then(() => {
        toast.success("Welcome " + name);
        router.push("/");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="flex flex-col items-center space-y-8 p-8 bg-white shadow-2xl rounded-3xl border border-gray-200 max-w-md w-full sm:max-w-lg transition-all duration-300">
        <Image
          src="/logo.svg"
          alt="GupShup Logo"
          width={120}
          height={120}
          className="p-2 rounded-full shadow-md"
        />
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center">
          Welcome to GupShup
        </h1>
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="w-full sm:w-1/2 text-black text-center font-bold text-2xl">
            {name}
          </div>
          <div className="flex justify-center">
            <Avatar className="w-32 h-32 sm:w-40 sm:h-40 ring-4 ring-blue-200 rounded-full overflow-hidden">
              <AvatarImage src={image} className="object-cover w-full h-full" />
              <AvatarFallback className="flex items-center justify-center w-full h-full bg-gray-200 text-2xl font-semibold text-gray-600">
                CN
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-600 w-full text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-lg"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default CreateProfile;
