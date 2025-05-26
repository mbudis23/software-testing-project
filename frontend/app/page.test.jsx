import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import HomePage from '@/app/page'
import '@testing-library/jest-dom'

const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

beforeEach(() => {
  mockPush.mockReset()

  // Mock localStorage
  Object.defineProperty(window, 'localStorage', {
    value: {
      setItem: jest.fn(),
      getItem: jest.fn(),
      clear: jest.fn(),
    },
    writable: true,
  })

  // Mock fetch (return user exists)
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ name: 'John Doe' }),
    })
  )
})

describe('HomePage', () => {
  it('renders homepage elements properly', () => {
    render(<HomePage />)
    expect(screen.getByText(/sistem pengajuan/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/npwp/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /ajukan pajak/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cek bukti pengajuan/i })).toBeInTheDocument()
  })

  it('shows error if NPWP is not 16 digits', () => {
    render(<HomePage />)
    fireEvent.change(screen.getByLabelText(/npwp/i), {
      target: { value: '123' },
    })
    fireEvent.click(screen.getByRole('button', { name: /ajukan pajak/i }))
    expect(screen.getByText(/npwp harus terdiri dari 16 digit/i)).toBeInTheDocument()
  })

  it('shows error when NPWP is valid length but not found in backend', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({ ok: false, json: () => Promise.resolve({}) })
  )

  render(<HomePage />)
  fireEvent.change(screen.getByLabelText(/npwp/i), {
    target: { value: '1234567890123456' },
  })
  fireEvent.click(screen.getByRole('button', { name: /ajukan pajak/i }))

  await waitFor(() => {
    expect(screen.getByText(/npwp tidak ditemukan/i)).toBeInTheDocument()
  })
})

  it('navigates to /form on valid NPWP', async () => {
    render(<HomePage />)
    fireEvent.change(screen.getByLabelText(/npwp/i), {
      target: { value: '1234567890123456' },
    })
    fireEvent.click(screen.getByRole('button', { name: /ajukan pajak/i }))

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/form')
    })
  })

  it('navigates to /cek when Cek Bukti Pengajuan is clicked', () => {
    render(<HomePage />)
    fireEvent.click(screen.getByRole('button', { name: /cek bukti pengajuan/i }))
    expect(mockPush).toHaveBeenCalledWith('/cek')
  })
})
