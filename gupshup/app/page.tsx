"use client";
import Navbar from "@/components/Navbar";
import SignIn from "@/components/sign-in";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
export default function Home() {
  const { data: session } = useSession();

  if (!session) return <SignIn />;

  return (
    <div>
      <div>
        {session ? (
          <>
            <Navbar/>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
