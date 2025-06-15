import midtransClient from "midtrans-client"

const snap = new midtransClient.Snap({
    // Set to true if you want Production Environment (accept real transaction).
    isProduction : false,
    serverKey : process.env.MIDTRANS_SERVER_KEY
});




export default snap;