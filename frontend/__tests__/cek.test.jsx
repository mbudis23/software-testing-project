import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import CekBuktiPengajuan from '@/app/cek/page'

describe('CekBuktiPengajuan', () => {
  it('renders input and button', () => {
    render(<CekBuktiPengajuan />)
    expect(screen.getByText(/cek bukti pengajuan/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/nomor referensi/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cek bukti/i })).toBeInTheDocument()
  })

  it('converts input to uppercase', () => {
    render(<CekBuktiPengajuan />)
    const input = screen.getByLabelText(/nomor referensi/i)
    fireEvent.change(input, { target: { value: 'tax2025-001' } })
    expect(input.value).toBe('TAX2025-001')
  })

  it('shows data when valid reference is entered', () => {
    render(<CekBuktiPengajuan />)
    fireEvent.change(screen.getByLabelText(/nomor referensi/i), {
      target: { value: 'TAX2025-001' },
    })
    fireEvent.click(screen.getByRole('button', { name: /cek bukti/i }))
    expect(screen.getByText(/pajak penghasilan/i)).toBeInTheDocument()
    expect(screen.getByText(/250000/i)).toBeInTheDocument()
  })

  it('shows error when invalid reference is entered', () => {
    render(<CekBuktiPengajuan />)
    fireEvent.change(screen.getByLabelText(/nomor referensi/i), {
      target: { value: 'TAX0000-999' },
    })
    fireEvent.click(screen.getByRole('button', { name: /cek bukti/i }))
    expect(screen.getByText(/data tidak ditemukan/i)).toBeInTheDocument()
  })
})
