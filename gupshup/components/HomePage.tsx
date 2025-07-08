"use client";
import Navbar from "@/components/Navbar";
import SignIn from "@/components/sign-in";
import { useSession } from "next-auth/react";
import SideBar from "./SideBar";
export default function HomePage() {
  const { data: session } = useSession();

  if (!session) return <SignIn />;

  return (
    <div>
      <div>
        {session && (
          <>
            <div>
              <div className="">
                <Navbar />
              </div>
              <div className="flex">
                <div className="h-[53.3rem] w-[450px] bg-black">
                  <SideBar />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
