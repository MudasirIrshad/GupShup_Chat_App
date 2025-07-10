import Navbar from "@/components/Navbar";
import AddContactForm from "./_components/AddContactForm";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import SideBar from "../HomePage/_components/SideBar";
import SignIn from "@/components/sign-in";

export default async function AddContact() {
  const session = await auth();

  if (!session) return <SignIn />;

  const contactOwner = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
  });
  const myContacts = await prisma.myContacts.findMany({
    where: {
      ownerId: contactOwner?.id,
    },
  });

  return (
    <div>
      <div className="">
        <Navbar />
      </div>
      <div className="flex">
        <div className="h-[53.3rem] w-[450px] bg-black">
          <SideBar myContacts={myContacts} contactOwnerId={contactOwner?.id!} />
        </div>
        <div className="w-screen flex items-center justify-center">
          <AddContactForm contactOwnerId={contactOwner?.id!} />
        </div>
      </div>
    </div>
  );
}
