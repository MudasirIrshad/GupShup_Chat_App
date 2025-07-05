"use client";
import React from "react";
import CreateProfile from "./_component/CreateProfile";
import { useSession } from "next-auth/react";

function Profile() {
  const { data: session } = useSession();
  return (
    <div>
      <CreateProfile email={session?.user?.email!} />
    </div>
  );
}

export default Profile;
