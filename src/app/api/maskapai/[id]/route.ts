import { prisma } from "@/lib/db";
import { CreateMaskapaiSchemeType } from "@/lib/schema/maskapai";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
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
    //

    const maskapai = await prisma.maskapai.findUnique({
      where: { id},
    });

    return NextResponse.json(
      {
        success: true,
        data: maskapai,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error);
  }
}

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
    const { nama, deskripsi }: CreateMaskapaiSchemeType = body;

    const maskapai = await prisma.maskapai.update({
      where: { id },
      data: { nama, deskripsi },
    });

    return NextResponse.json(
      {
        success: true,
        data: maskapai,
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

    await prisma.maskapai.delete({ where: { id} });

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
