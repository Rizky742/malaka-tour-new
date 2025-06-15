import { prisma } from "@/lib/db";
import { CreateTourGuideOfferSchemaType } from "@/lib/schema/tour-guide";
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
    const { nama, no_hp }: CreateTourGuideOfferSchemaType = body;

    const tour_guide = await prisma.tour_Guide.create({ data: { nama, no_hp } });

    return NextResponse.json(
      {
        success: true,
        data: tour_guide,
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

    const data = await prisma.tour_Guide.findMany();

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

