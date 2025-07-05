import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email } = await req.json();

  if (!name)
    return new NextResponse("Email and Name fields are required", {
      status: 401,
    });
  try {
    const userExisted = await prisma.user.findUnique({
      where: {
        email,
        name,
      },
    });
    if (userExisted) {
      console.log("User Exits already");

      return NextResponse.json("User Already Exits");
    }

    const userCreated = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    if (userCreated) return NextResponse.json("User Created Successfully");
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
