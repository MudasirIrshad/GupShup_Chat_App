import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import Image from "next/image";

function Navbar() {
  return (
    <div className="p-2 flex justify-between bg-gray-500">
      <div className="flex items-center gap-4">
        <Image
          src="/logo.svg"
          alt="GupShup Logo"
          width={50}
          height={50}
          className="rounded"
        />
        <p className="text-2xl">GupShup</p>
      </div>
      <div>
        <Button
          className="text-lg hover:bg-red-400 bg-red-600"
          onClick={() => signOut()}
        >
          SignOut
        </Button>{" "}
      </div>
    </div>
  );
}

export default Navbar;
