"use client";
import Navbar from "@/components/Navbar";
import SignIn from "@/components/sign-in";
import { useSession } from "next-auth/react";
import SideBar from "./SideBar";
import { MyContacts } from "@/lib/generated/prisma/client";
import { useRouter } from "next/navigation";

interface HomePageProps {
  myContacts: MyContacts[];
}
export default function HomePage({ myContacts }: HomePageProps) {
  const { data: session } = useSession();

  const router = useRouter();
  if (!session) return <SignIn />;
  if (session) router.push("/HomePage");
}
