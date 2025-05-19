'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [npwp, setNpwp] = useState('')  // Menambahkan state untuk NPWP
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleRegister = (e) => {
    e.preventDefault()
    if (!name || !email || !password || !npwp) {  // Pastikan NPWP juga terisi
      setError('Nama, email, password, dan NPWP wajib diisi')
      return
    }

    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
    const isRegistered = existingUsers.some(user => user.email === email)

    if (isRegistered) {
      setError('Email sudah terdaftar')
      return
    }

    const newUser = { name, email, password, npwp }  // Menambahkan NPWP ke data user baru
    localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]))
    setSuccess('Registrasi berhasil! Silakan login.')
    setError('')
    setTimeout(() => {
      router.push('/login')
    }, 1500)
  }

  const handleNpwpChange = (e) => {
    // Hanya izinkan angka dalam input NPWP
    const value = e.target.value.replace(/[^0-9]/g, '')  // Menghapus karakter selain angka
    setNpwp(value)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-xl font-bold mb-4 text-center text-gray-950">Register</h1>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-2">{success}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-950">Nama</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded text-gray-700"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-950">NPWP</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded text-gray-700"
              value={npwp}
              onChange={handleNpwpChange}  // Menggunakan handleNpwpChange
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-950">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded text-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-950">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded text-gray-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}
