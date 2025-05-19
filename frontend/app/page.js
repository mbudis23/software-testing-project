"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function HomePage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    setIsLoggedIn(!!token);
    if (name) setUserName(name);
  }, []);

  const confirmLogout = () => setShowConfirm(true);
  const cancelLogout = () => setShowConfirm(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setIsLoggedIn(false);
    setUserName("");
    setShowConfirm(false);
    router.refresh();
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

        <div className="space-y-4">
          {isLoggedIn ? (
            <div className="text-center text-lg text-gray-700 font-medium">
              Welcome, {userName}!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/login">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl shadow hover:bg-blue-700">Login</button>
              </Link>
              <Link href="/register">
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-xl shadow hover:bg-green-700">Register</button>
              </Link>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => router.push(isLoggedIn ? "/form" : "/login")}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-xl shadow hover:bg-indigo-700"
            >
              Ajukan Pajak
            </button>
            <Link href="/cek">
              <button className="w-full bg-yellow-500 text-white py-2 px-4 rounded-xl shadow hover:bg-yellow-600">Cek Bukti Pengajuan</button>
            </Link>
          </div>

          {isLoggedIn && (
            <div className="pt-6">
              <button
                onClick={confirmLogout}
                className="w-full bg-red-500 text-white py-2 px-4 rounded-xl shadow hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-sm w-full space-y-4">
            <p className="text-lg text-gray-800 font-semibold">Apakah Anda yakin ingin logout?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Tidak
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Ya
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
