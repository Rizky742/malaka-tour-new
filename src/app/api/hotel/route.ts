import { prisma } from "@/lib/db";
// import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import { CreateHotel } from "@/lib/schema/hotel";

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();

    const file = form.get("photo") as File;
    const nama = form.get("nama") as string;
    const location = form.get("location") as string;
    const bintang = form.get("bintang") as string;

    if (!file || !(file instanceof File)) {
      throw new Error("Foto tidak ditemukan atau bukan File");
    }

    // Simpan file ke /public/uploads
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${uuidv4()}-${file.name.replace(/\s/g, "-")}`;
    const filePath = path.join(process.cwd(), "public", "uploads", filename);
    await writeFile(filePath, buffer);
    const image_url = `/uploads/${filename}`;

    // Validasi data menggunakan Zod
    const parseResult = CreateHotel.safeParse({
      nama,
      location,
      bintang,
    });

    if (!parseResult.success) {
      throw parseResult.error;
    }

    const hotel = await prisma.hotel.create({
      data: {
        ...parseResult.data,
        image_url, // hasil generate dari backend
      },
    });

    return NextResponse.json({
      success: true,
      data: hotel,
    });
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
  
      const data = await prisma.hotel.findMany();
  
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
  