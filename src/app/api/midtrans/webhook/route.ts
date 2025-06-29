import { NextResponse } from "next/server";

export async function POST(request: Request) {
    console.log('woii')
  const body = await request.json();

  // Midtrans akan mengirim data transaksi lewat POST
  // Contoh payload:
  // {
  //   transaction_status: "capture",
  //   order_id: "ORD-123456",
  //   fraud_status: "accept",
  //   payment_type: "bank_transfer",
  //   ...
  // }

  console.log("Webhook body:", body);
//   console.log('woiiii')

  // TODO: verifikasi signature key jika perlu (Midtrans docs)
  // Bisa cek signature_key dari header X-Callback-Signature

  // Lakukan logika sesuai status transaksi
  const { transaction_status, fraud_status, order_id } = body;

  if (transaction_status === "settlement" && fraud_status === "accept") {
    // Pembayaran sukses, update database sesuai order_id
    console.log(`Pembayaran untuk order ${order_id} berhasil.`);
  } else if (transaction_status === "deny") {
    console.log(`Pembayaran untuk order ${order_id} ditolak.`);
  } else if (transaction_status === "pending") {
    console.log(`Pembayaran untuk order ${order_id} masih pending.`);
  } else if (transaction_status === "expire") {
    console.log(`Pembayaran untuk order ${order_id} kadaluarsa.`);
  } else if (transaction_status === "cancel") {
    console.log(`Pembayaran untuk order ${order_id} dibatalkan.`);
  }

  // Selalu balas 200 OK ke Midtrans agar tidak dikirim ulang
  return NextResponse.json({ message: "OK" });
}
