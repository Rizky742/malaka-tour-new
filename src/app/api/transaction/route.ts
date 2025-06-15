import { z } from "zod";
import createTransaction from "@/lib/midtrans/transaction";

// Skema validasi
const TransactionSchema = z.object({
  first_name: z.string().min(1, "Nama depan wajib diisi"),
  last_name: z.string().min(1, "Nama belakang wajib diisi"),
  email: z.string().email("Email tidak valid"),
  phone: z.string().min(8, "Nomor telepon tidak valid"),
  amount: z.number().min(1000, "Jumlah tidak boleh kurang dari 1000"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = TransactionSchema.parse(body);

    const { first_name, last_name, email, phone, amount } = parsed;


    const params = {
      transaction_details: {
        order_id: `ORD-${Date.now()}`,
        gross_amount: amount,
      },
      customer_details: {
        first_name,
        last_name,
        email,
        phone,
      },
      payment_type: "bank_transfer",
      bank_transfer:{
      bank: "bca"
  }

    };
    console.log(params)

    const transaction = await createTransaction(params);

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
      return new Response(JSON.stringify({ error: err.errors }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Transaction failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
