import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import CekBuktiPengajuan from '@/app/cek/page'
import '@testing-library/jest-dom'

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          referenceId: 'TAX2025-001',
          tax_type: 'Pajak Penghasilan',
          amount: 250000,
          submission_date: '19 Mei 2025 10:30',
        }),
    })
  )
})

describe('CekBuktiPengajuan', () => {
  it('shows data when valid reference is entered', async () => {
    render(<CekBuktiPengajuan />)

    fireEvent.change(screen.getByLabelText(/nomor referensi/i), {
      target: { value: 'TAX2025-001' },
    })
    fireEvent.click(screen.getByRole('button', { name: /cek bukti/i }))

    await waitFor(() => {
      expect(screen.getByText(/pajak penghasilan/i)).toBeInTheDocument()
      expect(screen.getByText(/250000/i)).toBeInTheDocument()
    })
  })

  it('shows error when input is empty', () => {
  render(<CekBuktiPengajuan />)
  fireEvent.click(screen.getByRole('button', { name: /cek bukti/i }))
  expect(
    screen.getByText(/nomor referensi tidak boleh kosong/i)
  ).toBeInTheDocument()
})

  it('shows error when invalid reference is entered', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({}),
      })
    )

    render(<CekBuktiPengajuan />)
    fireEvent.change(screen.getByLabelText(/nomor referensi/i), {
      target: { value: 'TAX0000-999' },
    })
    fireEvent.click(screen.getByRole('button', { name: /cek bukti/i }))

    await waitFor(() => {
      expect(
        screen.getByText(/data tidak ditemukan/i)
      ).toBeInTheDocument()
    })
  })
})
