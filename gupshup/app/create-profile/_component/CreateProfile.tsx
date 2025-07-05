"use Client";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface CreateProfileProps {
  email: String;
}
function CreateProfile({ email }: CreateProfileProps) {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    axios
      .post("/api/create-profile", {
        name,
        email,
      })
      .then(() => {
        toast.success("User created Succefully");
        router.push("/");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center space-y-6 p-10 bg-white shadow-lg rounded-2xl border max-w-md">
        <Image
          src="/logo.svg"
          alt="GupShup Logo"
          width={100}
          height={100}
          className="rounded"
        />
        <h1 className="text-3xl font-bold text-gray-800">
          Finalize Profile to GupShup
        </h1>
        <Input
          placeholder="Enter Your Name"
          className="text-black"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default CreateProfile;
