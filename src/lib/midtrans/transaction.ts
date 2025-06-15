import snap from "./init";

interface Transaction {
  transaction_details: {
    order_id: string;
    gross_amount: number;
  };
  customer_details: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
}

const createTransaction = async (
  params: Transaction
): Promise<{ token: string; redirect_url: string }> => {
  const transaction = await snap.createTransaction(params);
  return transaction;
};

export default createTransaction;
