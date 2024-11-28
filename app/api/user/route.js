import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
export async function POST(req) {
  try {
    const body = await req.json();
    console.log(body);
    const { email, name, password } = body;

    // check if email already exists
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        {
          user: null,
          message: "User is already exists!",
        },
        { status: 409 }
      );
    }

    // create user
    const hashedPassword = await hash(password, 10);

    const newuser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        user: newuser,
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json(
      {
        message: "There was an error",
      },
      { status: 500 }
    );
  }
}
