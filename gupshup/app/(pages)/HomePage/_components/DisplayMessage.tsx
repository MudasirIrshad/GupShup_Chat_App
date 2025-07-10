import Image from "next/image";
import React from "react";

export default function DisplayMessage() {
  return (
    <div className="flex items-center justify-center text-white px-4">
      <div className="flex flex-col items-center space-y-6 text-center">
        <Image
          src="/logo.svg"
          alt="GupShup Logo"
          width={150}
          height={150}
          className="rounded-xl shadow-lg"
        />
        <h1 className="text-4xl font-extrabold tracking-wide">GupShup</h1>
        <p className="text-gray-400 text-sm">An easy way to communicate</p>
        <p className="text-gray-300 max-w-md">
          Make <span className="text-blue-400 font-semibold">voice calls</span>,{" "}
          <span className="text-blue-400 font-semibold">video calls</span>, and{" "}
          <span className="text-blue-400 font-semibold">real-time chat</span>{" "}
          with GupShup — all in one place.
        </p>
      </div>
    </div>
  );
}
