export default function RiwayatPembayaran() {
    const payments = [
      {
        tanggal: "15 April 2025",
        jumlah: "Rp2.500.000",
        status: "Berhasil",
        metode: "Transfer Bank",
      },
      {
        tanggal: "15 Maret 2025",
        jumlah: "Rp2.500.000",
        status: "Berhasil",
        metode: "QRIS",
      },
      {
        tanggal: "15 Februari 2025",
        jumlah: "Rp2.500.000",
        status: "Gagal",
        metode: "Transfer Bank",
      },
    ];
  
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-10 md:px-[124px]">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Riwayat Pembayaran</h1>
  
        <div className="overflow-auto rounded-lg shadow bg-white">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4">Jumlah</th>
                <th className="px-6 py-4">Metode</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-4">{item.tanggal}</td>
                  <td className="px-6 py-4">{item.jumlah}</td>
                  <td className="px-6 py-4">{item.metode}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === "Berhasil"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  