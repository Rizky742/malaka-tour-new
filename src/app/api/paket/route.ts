import { prisma } from "@/lib/db";
// import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();

    const file = form.get("photo") as File;
    const nama = form.get("nama") as string;
    const deskripsi = form.get("deskripsi") as string;
    const durasi = form.get("durasi") as string;
    const maskapai_id = form.get("maskapai") as string;
    const hotel_madinah_id = form.get("hotel_madinah") as string;
    const hotel_mekkah_id = form.get("hotel_mekkah") as string;
    const paketKamarJson = form.get("tipeKamar") as string;
    const tanggalKeberangkatanStr = form.get("tanggal_keberangkatan") as string;
    const tanggalKeberangkatan = new Date(tanggalKeberangkatanStr);

    if (!file || !(file instanceof File)) {
      throw new Error("Foto tidak ditemukan atau bukan file");
    }

    // Simpan file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${uuidv4()}-${file.name.replace(/\s/g, "-")}`;
    const filePath = path.join(process.cwd(), "public", "uploads", filename);
    await writeFile(filePath, buffer);
    const image_url = `/uploads/${filename}`;

    // Parse paket_kamar
    let parsedKamar: {
      tipe_kamar: string;
      total_pax: number;
      harga: number;
    }[] = [];

    if (paketKamarJson) {
      parsedKamar = JSON.parse(paketKamarJson);
    }

    // Simpan paket + relasi paket_kamar
    const paket = await prisma.paket.create({
      data: {
        nama,
        deskripsi,
        maskapai_id,
        hotel_madinah_id,
        hotel_mekkah_id,
        durasi,
        tanggal_keberangkatan: tanggalKeberangkatan,
        image_url,
        paket_kamar: {
          create: parsedKamar.map((kamar) => ({
            tipe_kamar: kamar.tipe_kamar,
            total_pax: kamar.total_pax,
            harga: kamar.harga,
          })),
        },
      },
      include: {
        paket_kamar: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: paket,
    });
  } catch (error) {
    console.log(error);
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

    const data = await prisma.paket.findMany({
      include: {
        paket_kamar: true,
        hotel_madinah: true,
        hotel_mekkah: true,
        maskapai: true,
      },
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
