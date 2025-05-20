import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AjukanPajakPage from '@/app/form/page';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';

// Mocking useRouter from Next.js
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('AjukanPajakPage', () => {
  let pushMock;

  beforeEach(() => {
    // Setup mock function for router.push
    pushMock = jest.fn();
    useRouter.mockReturnValue({ push: pushMock });

    // Mock localStorage to simulate data retrieval
    localStorage.setItem('name', 'John Doe');
    localStorage.setItem('npwp', '1234567890123456'); // Simulate a valid NPWP (16 digits)
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should show error when tax type or amount is invalid', async () => {
    render(<AjukanPajakPage />);

    // Simulate submitting the form with invalid input
    fireEvent.change(screen.getByLabelText('Jenis Pajak'), {
      target: { value: '' },
    });
    fireEvent.change(screen.getByLabelText('Jumlah Pajak (Rp)'), {
      target: { value: '5000' },
    });
    fireEvent.click(screen.getByText('Ajukan Pembayaran'));

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText('Jumlah pajak minimal Rp10.000 dan jenis pajak wajib diisi')).toBeInTheDocument();
    });
  });

  it('should generate a tax reference number and display it on successful submission', async () => {
    render(<AjukanPajakPage />);

    // Simulate valid form input
    fireEvent.change(screen.getByLabelText('Jenis Pajak'), {
      target: { value: 'Pajak Penghasilan' },
    });
    fireEvent.change(screen.getByLabelText('Jumlah Pajak (Rp)'), {
      target: { value: '15000' },
    });
    fireEvent.click(screen.getByText('Ajukan Pembayaran'));

    // Wait for the reference number to be displayed
    await waitFor(() => {
      expect(screen.getByText(/Nomor Referensi/)).toBeInTheDocument();
      expect(screen.getByText(/Jenis Pajak/)).toBeInTheDocument();
      expect(screen.getByText(/Jumlah/)).toBeInTheDocument();
    });
  });

  it('should reset all fields after "Ajukan Lagi" is clicked', async () => {
    render(<AjukanPajakPage />);

    // Simulate valid form input and submission
    fireEvent.change(screen.getByLabelText('Jenis Pajak'), {
      target: { value: 'Pajak Penghasilan' },
    });
    fireEvent.change(screen.getByLabelText('Jumlah Pajak (Rp)'), {
      target: { value: '15000' },
    });
    fireEvent.click(screen.getByText('Ajukan Pembayaran'));

    // Wait for the reference to appear
    await waitFor(() => {
      expect(screen.getByText(/Nomor Referensi/)).toBeInTheDocument();
    });

    // Click "Ajukan Lagi" to reset the form
    fireEvent.click(screen.getByText('Ajukan Lagi'));

    // Ensure all fields are reset
    expect(screen.getByLabelText('Jenis Pajak')).toHaveValue('');
    expect(screen.getByLabelText('Jumlah Pajak (Rp)')).toHaveValue('');
    expect(screen.queryByText('Jumlah pajak minimal Rp10.000 dan jenis pajak wajib diisi')).not.toBeInTheDocument();
    expect(screen.queryByText(/Nomor Referensi/)).not.toBeInTheDocument();
  });

  it('should navigate to home when "Kembali ke Home" is clicked', async () => {
    render(<AjukanPajakPage />);

    // Simulate valid form input
    fireEvent.change(screen.getByLabelText('Jenis Pajak'), {
      target: { value: 'Pajak Penghasilan' },
    });
    fireEvent.change(screen.getByLabelText('Jumlah Pajak (Rp)'), {
      target: { value: '15000' },
    });
    fireEvent.click(screen.getByText('Ajukan Pembayaran'));

    // Wait for the reference number to appear
    await waitFor(() => {
      expect(screen.getByText(/Nomor Referensi/)).toBeInTheDocument();
    });

    // Simulate the "Kembali ke Home" button click
    fireEvent.click(screen.getByText('Kembali ke Home'));

    // Check if router.push('/') was called
    expect(pushMock).toHaveBeenCalledWith('/');
  });
});
