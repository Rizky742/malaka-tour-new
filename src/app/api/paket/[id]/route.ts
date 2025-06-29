import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";

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

    const paket = await prisma.paket.findFirst({
      where: { id: id },
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
        data: paket,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const form = await request.formData();

    const file = form.get("photo");
    const nama = form.get("nama") as string;
    const deskripsi = form.get("deskripsi") as string;
    const durasi = form.get("durasi") as string;
    const maskapai_id = form.get("maskapai") as string;
    const hotel_madinah_id = form.get("hotel_madinah") as string;
    const hotel_mekkah_id = form.get("hotel_mekkah") as string;
    const paketKamarJson = form.get("tipeKamar") as string;
    console.log(form);

    let image_url = ""; // default kosong

    // Kalau upload file baru
    if (file instanceof File && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${uuidv4()}-${file.name.replace(/\s/g, "-")}`;
      const filePath = path.join(process.cwd(), "public", "uploads", filename);
      await writeFile(filePath, buffer);
      image_url = `/uploads/${filename}`;
    }

    // Parse tipeKamar
    let parsedKamar: {
      tipe_kamar: string;
      total_pax: number;
      harga: number;
      tersedia: boolean;
    }[] = [];

    if (paketKamarJson) {
      parsedKamar = JSON.parse(paketKamarJson);
    }

    // Update data paket
    const updatedPaket = await prisma.paket.update({
      where: { id: id },
      data: {
        nama,
        deskripsi,
        durasi,
        maskapai_id,
        hotel_madinah_id,
        hotel_mekkah_id,
        ...(image_url && { image_url }), // hanya update kalau upload gambar baru
        // Untuk update kamar, hapus dulu lalu insert ulang
        paket_kamar: {
          deleteMany: {},
          create: parsedKamar.map((kamar) => ({
            tipe_kamar: kamar.tipe_kamar,
            total_pax: kamar.total_pax,
            harga: kamar.harga,
            tersedia: kamar.tersedia,
          })),
        },
      },
      include: {
        paket_kamar: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: updatedPaket,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Update gagal", error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const param = await params;
    const id = param.id;

    await prisma.paket.delete({ where: { id: id } });

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
