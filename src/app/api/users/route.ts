import { prisma } from "@/lib/db";
import { CreateUsersOfferSchemaType } from "@/lib/schema/users";
import { hashSync } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role");
    //   const body = await request.json();

    // const session = getSession();
    // if (!session) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: "Unauthorize",
    //     },
    //     { status: 403 }
    //   );
    // }
    //   const { nama, no_hp }: CreatePelangganOfferSchemaType = body;


    const data = await prisma.user.findMany({
      where: role ? { role } : undefined,
    });

    return NextResponse.json(
      {
        success: true,
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // const session = getSession();
    // if (!session) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: "Unauthorize",
    //     },
    //     { status: 403 }
    //   );
    // }
    const {
      email,
      name,
      password,
      no_hp,
      role,
      alamat,
    }: CreateUsersOfferSchemaType = body;
    const hashedPassword = hashSync(password, 10);
    const users = await prisma.user.create({
      data: { email, name, password: hashedPassword, no_hp, role, alamat },
    });

    return NextResponse.json(
      {
        success: true,
        data: users,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error);
  }
}
