import { prisma } from "@/lib/db";
import { CreateUsersOfferSchemaType } from "@/lib/schema/users";
import { hashSync } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const param = await params;
    const id = param.id;

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
    
    // eslint-disable-next-line prefer-const
    let { name, email, no_hp, password,role,alamat}: CreateUsersOfferSchemaType = body;
    if(password){
        password = hashSync(password, 10);
    }else{
        const oldPassword = await prisma.user.findUnique({where: {id}, select:{password: true}})
        if (!oldPassword?.password) {
            return NextResponse.json(
              { success: false, message: "User not found" },
              { status: 404 }
            );
          }
        password = oldPassword?.password
    }

    const users = await prisma.user.update({
      where: { id: id },
      data: { name, email, no_hp, password, role, alamat },
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

export async function DELETE(request: NextRequest,{ params }: { params: Promise<{ id: string }> }) {
  try {
    const param = await params;
    const id = param.id;

    await prisma.user.delete({ where: { id: id } });

    return NextResponse.json(
      {
        success: true,
        message: "Data deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error);
  }
}
