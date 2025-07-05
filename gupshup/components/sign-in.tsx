"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function AuthPage() {
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
        <h1 className="text-3xl font-bold text-gray-800">Welcome to GupShup</h1>
        <p className="text-sm text-gray-600 text-center">
          Continue to start chatting with your contacts.
        </p>
        <button
          onClick={() => signIn("google", { callbackUrl: "/create-profile" })}
          className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
