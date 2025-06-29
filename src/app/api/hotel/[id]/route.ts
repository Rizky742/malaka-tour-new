import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import path from "path";

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

    const hotel = await prisma.hotel.findUnique({
      where: { id: id },
    });

    return NextResponse.json(
      {
        success: true,
        data: hotel,
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

    const form = await request.formData();
    const file = form.get("photo") as File | null;
    const nama = form.get("nama") as string;
    const location = form.get("location") as string;
    const bintang = form.get("bintang") as string;

    const existingHotel = await prisma.hotel.findUnique({ where: { id } });
    if (!existingHotel) {
      return NextResponse.json(
        { message: "Hotel tidak ditemukan" },
        { status: 404 }
      );
    }

    let image_url = existingHotel.image_url;

    if (file && file instanceof File && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${uuidv4()}-${file.name.replace(/\s/g, "-")}`;
      const filePath = path.join(process.cwd(), "public", "uploads", filename);
      await writeFile(filePath, buffer);
      image_url = `/uploads/${filename}`;
    }

    const updated = await prisma.hotel.update({
      where: { id },
      data: {
        nama,
        location,
        bintang,
        image_url,
      },
    });

    return NextResponse.json({ success: true, data: updated });
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

    await prisma.hotel.delete({ where: { id: id } });

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
