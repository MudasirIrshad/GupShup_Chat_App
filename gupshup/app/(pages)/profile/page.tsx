import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function Profile() {
  const session = await auth();

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
          <SideBar myContacts={myContacts} />
        </div>
        <div className="w-screen">Profile</div>
      </div>
    </div>
  );
}
