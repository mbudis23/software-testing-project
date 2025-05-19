'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Email dan password wajib diisi')
      return
    }

    // Dummy auth
    const dummyUser = {
      email: 'user@example.com',
      password: '123456',
      name: 'johndoe'
    }

    if (email === dummyUser.email && password === dummyUser.password) {
        localStorage.setItem('token', 'dummy-token')
        localStorage.setItem('name', dummyUser.name) // pastikan dummyUser punya properti `name`
        router.push('/')
        } else {
      setError('Email atau password salah')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-xl font-bold mb-4 text-center text-gray-950">Login</h1>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <form onSubmit={handleLogin}>
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
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
