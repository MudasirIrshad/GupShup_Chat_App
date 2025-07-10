import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, ownerId } = await req.json();

  if (!name || !email || !ownerId) {
    return NextResponse.json({ message: "Missing fields." }, { status: 400 });
  }

  const checkContactExisted = await prisma.myContacts.findUnique({
    where: {
      ownerId_contactGmail: { ownerId, contactGmail: email },
    },
  });

  const checkIsContactRegistered = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (checkContactExisted)
    return NextResponse.json(
      { message: "Contact already existed" },
      { status: 400 }
    );

  await prisma.myContacts.create({
    data: {
      ownerId,
      contactGmail: email,
      isContactRegistered: !!checkIsContactRegistered,
      contactName: name,
    },
  });

  return NextResponse.json("Clicked");
}
