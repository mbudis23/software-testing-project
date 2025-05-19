"use client";

import { useState } from "react";

export default function CekBuktiPengajuan() {
  const [inputRef, setInputRef] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const dummyData = [
    {
      taxId: "TAX2025-001",
      taxType: "Pajak Penghasilan",
      amount: 250000,
      date: "19 Mei 2025 10:30",
    },
    {
      taxId: "TAX2025-002",
      taxType: "Pajak Kendaraan",
      amount: 150000,
      date: "19 Mei 2025 11:15",
    },
  ];

  const handleSearch = () => {
    const ref = inputRef.trim().toUpperCase();
    const found = dummyData.find((item) => item.taxId === ref);
    if (found) {
      setData(found);
      setError("");
    } else {
      setData(null);
      setError("Data tidak ditemukan. Pastikan nomor referensi benar.");
    }
  };

  const handleChange = (e) => {
    setInputRef(e.target.value.toUpperCase());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-6 rounded-2xl shadow space-y-6">
        <h2 className="text-xl font-bold text-gray-800 text-center">Cek Bukti Pengajuan</h2>

        <div>
          <label className="block text-gray-700 mb-2">Nomor Referensi</label>
          <input
            type="text"
            value={inputRef}
            onChange={handleChange}
            className="w-full p-2 border rounded-md uppercase bg-white text-gray-800"
            placeholder="Contoh: TAX2025-001"
          />
        </div>

        <button
          onClick={handleSearch}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Cek Bukti
        </button>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {data && (
          <div className="border-t pt-4 text-sm text-gray-700">
            <p><strong>Nomor Referensi:</strong> {data.taxId}</p>
            <p><strong>Jenis Pajak:</strong> {data.taxType}</p>
            <p><strong>Jumlah:</strong> Rp {data.amount}</p>
            <p><strong>Tanggal:</strong> {data.date}</p>
          </div>
        )}
      </div>
    </div>
  );
}
