import { z } from "zod";
import midtransClient from "midtrans-client";

const TransactionSchema = z.object({
  orderId: z.string().min(1, "Order ID wajib diisi"),
  grossAmount: z.number().min(1000, "Jumlah tidak boleh kurang dari 1000"),
  customer: z.object({
    first_name: z.string().min(1, "Nama depan wajib diisi"),
    last_name: z.string().optional(), // Kalau gak ada last_name di frontend bisa optional
    email: z.string().email("Email tidak valid").optional(),
    phone: z.string().min(8, "Nomor telepon tidak valid"),
  }),
});

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = TransactionSchema.parse(body);

    const { orderId, grossAmount, customer } = parsed;

    const params = {
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount,
      },
      customer_details: {
        first_name: customer.first_name,
        last_name: customer.last_name || "",
        email: customer.email || "",
        phone: customer.phone,
      },
      payment_type: "bank_transfer",
      bank_transfer: {
        bank: "bca",
      },
    };

    console.log("Midtrans Params:", params);

    const transaction = await snap.createTransaction(params);

    return new Response(
      JSON.stringify(transaction),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error(err);
    if (err instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ error: err.errors }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: "Transaction failed" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
