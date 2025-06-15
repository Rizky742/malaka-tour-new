import { prisma } from "@/lib/db";
import { CreateTabunganSchemaType } from "@/lib/schema/tabungan";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
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

    const data = await prisma.tabungan.findMany();

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
    const {
      user_id,
      saldo,
      status,
      tanggal_akhir,
      tanggal_mulai,
      tipe_cicilan,
    }: CreateTabunganSchemaType = body;
    const tabungan = await prisma.tabungan.create({
      data: {
        user_id,
        saldo,
        status,
        tanggal_akhir,
        tanggal_mulai,
        tipe_cicilan,
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
