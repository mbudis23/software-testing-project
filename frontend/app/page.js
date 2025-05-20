"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");  // Nama pengguna yang bisa diisi
  const [npwp, setNpwp] = useState(""); // NPWP yang bisa diinput
  const [error, setError] = useState(""); // Error jika NPWP atau nama kosong

  const handleSubmit = () => {
    // Validasi input NPWP dan nama
    if (!userName || !npwp) {
      setError("Nama dan NPWP harus diisi!");
      return;
    }

    // Validasi panjang NPWP harus 16 digit
    if (npwp.length !== 16) {
      setError("NPWP harus terdiri dari 16 digit");
      return;
    }

    // Menyimpan data user ke localStorage jika diperlukan (misalnya, NPWP dan nama)
    localStorage.setItem("name", userName);
    localStorage.setItem("npwp", npwp);

    // Arahkan pengguna ke halaman pengajuan pajak
    router.push("/form");
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      <div className="max-w-2xl w-full text-center space-y-8 bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
          Sistem Pengajuan<br /> Pembayaran Pajak Online
        </h1>
        <p className="text-lg text-gray-500">
          Ajukan pajak Anda dengan <span className="text-blue-600 font-semibold">mudah</span>, <span className="text-green-600 font-semibold">cepat</span>, dan <span className="text-yellow-600 font-semibold">aman</span>.
        </p>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-950">Nama</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded text-gray-700"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Masukkan Nama"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-950">NPWP</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded text-gray-700"
              value={npwp}
              onChange={(e) => setNpwp(e.target.value)}
              placeholder="Masukkan NPWP (16 digit)"
              maxLength="16"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-xl shadow hover:bg-indigo-700"
          >
            Ajukan Pajak
          </button>

          <button
            onClick={() => router.push('/cek')}
            className="w-full bg-yellow-500 text-white py-2 px-4 rounded-xl shadow hover:bg-yellow-600"
          >
            Cek Bukti Pengajuan
          </button>
        </div>
      </div>
    </main>
  );
}
