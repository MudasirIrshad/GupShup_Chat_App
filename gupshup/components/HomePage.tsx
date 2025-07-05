"use client";
import Navbar from "@/components/Navbar";
import SignIn from "@/components/sign-in";
import { useSession } from "next-auth/react";
export default function HomePage() {
  const { data: session } = useSession();

  if (!session) return <SignIn />;

  return (
    <div>
      <div>
        {session && (
          <>
            <div>
              <div className="sticky">
                <Navbar />
              </div>
              <div>
                <div className="h-screen w-[450px] bg-black">Sidebar</div>
                <div></div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
