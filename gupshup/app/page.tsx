import HomePage from "@/components/HomePage";
import SignIn from "@/components/sign-in";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function Home() {
  const session = await auth();
  console.log(session);
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
      {" "}
      <HomePage myContacts={myContacts} />
    </div>
  );
}
