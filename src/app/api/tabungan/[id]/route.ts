import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { CreateTabunganSchemaType } from "@/lib/schema/tabungan";

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

    const tabungan = await prisma.tabungan.findUnique({
      where: { id: Number(id) },
      select: {id: true, user: {select: {}}}
    });

    return NextResponse.json(
      {
        success: true,
        data: tabungan,
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
    const {
      saldo,
      status,
      tanggal_akhir,
      tanggal_mulai,
      tipe_cicilan,
      user_id,
    }: CreateTabunganSchemaType = body;

    const tabungan = await prisma.tabungan.update({
      where: { id: Number(id) },
      data: {
        saldo,
        status,
        tanggal_akhir,
        tanggal_mulai,
        tipe_cicilan,
        user_id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: tabungan,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const param = await params;
    const id = param.id;

    await prisma.tabungan.delete({ where: { id: Number(id) } });

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
