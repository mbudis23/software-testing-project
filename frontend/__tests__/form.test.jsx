import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import AjukanPajakPage from '@/app/form/page'
import '@testing-library/jest-dom'
import { useRouter } from 'next/navigation'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('AjukanPajakPage', () => {
  let pushMock

  beforeEach(() => {
    pushMock = jest.fn()
    useRouter.mockReturnValue({ push: pushMock })

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn((key) => {
          if (key === 'npwp') return '1234567890123456'
          return null
        }),
        setItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    })

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            referenceId: 'TAX2025-001',
            tax_type: 'Pajak Penghasilan',
            amount: 15000,
            npwp: '1234567890123456',
            submission_date: '19 Mei 2025 10:30',
          }),
      })
    )
  })


  it('shows error when input amount is below 10,000 or empty fields', () => {
  render(<AjukanPajakPage />)
  fireEvent.click(screen.getByText(/ajukan pembayaran/i))
  expect(
    screen.getByText(/jumlah pajak minimal/i)
  ).toBeInTheDocument()
})

it('shows error when API returns error', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ error: 'Internal Error' }),
    })
  )

  render(<AjukanPajakPage />)
  fireEvent.change(screen.getByLabelText(/jenis pajak/i), {
    target: { value: 'Pajak Penghasilan' },
  })
  fireEvent.change(screen.getByLabelText(/jumlah pajak/i), {
    target: { value: '20000' },
  })
  fireEvent.click(screen.getByText(/ajukan pembayaran/i))

  await waitFor(() => {
    expect(screen.getByText(/internal error/i)).toBeInTheDocument()
  })
})

it('navigates to home after klik "Kembali ke Home"', async () => {
  const pushMock = jest.fn()
  require('next/navigation').useRouter.mockReturnValue({ push: pushMock })

  render(<AjukanPajakPage />)
  fireEvent.change(screen.getByLabelText(/jenis pajak/i), {
    target: { value: 'Pajak Penghasilan' },
  })
  fireEvent.change(screen.getByLabelText(/jumlah pajak/i), {
    target: { value: '15000' },
  })
  fireEvent.click(screen.getByText(/ajukan pembayaran/i))

  await waitFor(() => {
    expect(screen.getByText(/nomor referensi/i)).toBeInTheDocument()
  })

  fireEvent.click(screen.getByText(/kembali ke home/i))
  expect(pushMock).toHaveBeenCalledWith('/')
})

it('handles network error on fetch failure', async () => {
  global.fetch = jest.fn(() => Promise.reject(new Error('Network Error')))

  render(<AjukanPajakPage />)

  fireEvent.change(screen.getByLabelText(/jenis pajak/i), {
    target: { value: 'Pajak Penghasilan' },
  })
  fireEvent.change(screen.getByLabelText(/jumlah pajak/i), {
    target: { value: '15000' },
  })
  fireEvent.click(screen.getByText(/ajukan pembayaran/i))

  await waitFor(() => {
    expect(screen.getByText(/network error/i)).toBeInTheDocument()
  })
})

  it('should generate a tax reference number and display it', async () => {
    render(<AjukanPajakPage />)
    fireEvent.change(screen.getByLabelText(/jenis pajak/i), {
      target: { value: 'Pajak Penghasilan' },
    })
    fireEvent.change(screen.getByLabelText(/jumlah pajak/i), {
      target: { value: '15000' },
    })
    fireEvent.click(screen.getByText(/ajukan pembayaran/i))

    await waitFor(() => {
      expect(screen.getByText(/nomor referensi/i)).toBeInTheDocument()
      expect(screen.getByText(/pajak penghasilan/i)).toBeInTheDocument()
    })
  })
})
