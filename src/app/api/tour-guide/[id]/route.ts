import { prisma } from "@/lib/db";
import { UpdateTourGuideOfferSchemaType } from "@/lib/schema/tour-guide";
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

    const tour_guide = await prisma.tour_Guide.findUnique({
      where: { id: Number(id) },
    });

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
    const { nama, no_hp }: UpdateTourGuideOfferSchemaType = body;

    const tour_guide = await prisma.tour_Guide.update({
      where: { id: Number(id) },
      data: { nama, no_hp },
    });

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

export async function DELETE(request: NextRequest,{ params }: { params: Promise<{ id: string }> }) {
  try {
    const param = await params;
    const id = param.id;

    await prisma.tour_Guide.delete({ where: { id: Number(id) } });

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
