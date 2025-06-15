import { prisma } from "@/lib/db";
import { CreateMaskapaiSchemeType } from "@/lib/schema/maskapai";
// import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

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
    const { nama, deskripsi}: CreateMaskapaiSchemeType = body;

    const maskapai = await prisma.maskapai.create({ data: { nama, deskripsi} });

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
  
      const data = await prisma.maskapai.findMany();
  
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
  
  

