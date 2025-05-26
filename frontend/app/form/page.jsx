'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AjukanPajakPage() {
  const router = useRouter();
  const [taxType, setTaxType] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [reference, setReference] = useState(null);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleSubmit = async () => {
    var npwp = localStorage.getItem('npwp');

    const amt = parseFloat(amount);
    if (!taxType || isNaN(amt) || amt < 10000) {
      setError("Jumlah pajak minimal Rp10.000 dan jenis pajak wajib diisi");
      return;
    }

    setError("");

    const taxData = {
      "tax_type": taxType,
      "amount": amount,
      "npwp": npwp
    };

    try {
      const response = await fetch("https://software-testing-project.vercel.app/tax/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taxData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Gagal mengajukan pajak");

      localStorage.setItem("referenceId", data.referenceId);
      setReference(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const resetForm = () => {
    setTaxType('');
    setAmount('');
    setError('');
    setReference(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-lg w-full bg-white p-6 rounded-2xl shadow-md space-y-6">
        {!reference ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800">Formulir Pengajuan Pajak</h2>

            <div>
              <label htmlFor="taxType" className="block text-gray-700 mb-2">Jenis Pajak</label>
              <select
                id="taxType"
                value={taxType}
                onChange={(e) => setTaxType(e.target.value)}
                className="w-full p-2 border rounded-md bg-white text-gray-800"
              >
                <option value="">-- Pilih Jenis Pajak --</option>
                <option value="Pajak Penghasilan">Pajak Penghasilan</option>
                <option value="Pajak Kendaraan">Pajak Kendaraan</option>
              </select>
            </div>

            <div>
              <label htmlFor="amount" className="block text-gray-700 mb-1">Jumlah Pajak (Rp)</label>
              <input
                id="amount"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={amount}
                onChange={handleAmountChange}
                className="w-full p-2 border rounded-md bg-white text-gray-800"
                placeholder="Masukkan jumlah pajak"
              />
              <p className="text-xs text-gray-500 mt-1">Hanya angka diperbolehkan. Minimal Rp10.000.</p>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              onClick={handleSubmit}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Ajukan Pembayaran
            </button>
          </>
        ) : (
          <div className="text-center space-y-3 text-gray-800">
            <h2 className="text-2xl font-bold text-green-700">Bukti Pengajuan</h2>
            <p>Nomor Referensi: <strong>{reference.referenceId}</strong></p>
            <p>Jenis Pajak: {reference.tax_type}</p>
            <p>Jumlah: Rp {reference.amount}</p>
            <p>NPWP: {reference.npwp}</p>
            <p>Tanggal: {reference.submission_date}</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={resetForm}
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
              >
                Ajukan Lagi
              </button>
              <button
                onClick={() => router.push('/')}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Kembali ke Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
