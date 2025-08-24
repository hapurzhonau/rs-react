import { fireEvent, render, screen } from '@testing-library/react';
import { describe, test, vi, beforeEach, type Mock } from 'vitest';
import { UncontrolledForm } from './uncontrolled-form';
import { useFormStore } from '../../../store/use-form-store';
import { useModalStore } from '../../../store/use-modal-store';
import { useCountryStore } from '../../../store/use-country-store';

vi.mock('../../../store/use-form-store');
vi.mock('../../../store/use-modal-store');
vi.mock('../../../store/use-country-store');

describe('UncontrolledForm', () => {
  const addData = vi.fn();
  const close = vi.fn();
  const countries = ['Albania', 'Brazil', 'Canada'];

  beforeEach(() => {
    vi.clearAllMocks();
    (useFormStore as unknown as Mock).mockReturnValue({ addData });
    (useModalStore as unknown as Mock).mockReturnValue({ close });
    (useCountryStore as unknown as Mock).mockReturnValue({ countries });
  });

  test('renders all fields', () => {
    render(<UncontrolledForm />);
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Accept Terms/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Upload picture/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
  });

  test('error if submit empty form', async () => {
    render(<UncontrolledForm />);
    fireEvent.click(screen.getByText(/Submit/i));
    expect(await screen.findByText(/Name must/i)).toBeInTheDocument();
    expect(screen.getByText(/Age is/i)).toBeInTheDocument();
    expect(screen.getByText(/Invalid email/i)).toBeInTheDocument();
    expect(screen.getByText(/Please select gender/i)).toBeInTheDocument();
    expect(screen.getByText(/You must/i)).toBeInTheDocument();
    expect(screen.getByText(/Please select country/i)).toBeInTheDocument();
  });

  test('submit valid data', () => {
    render(<UncontrolledForm />);
    fireEvent.change(screen.getByLabelText(/Name/i), 'Daniyar');
    fireEvent.change(screen.getByLabelText(/Age/i), '25');
    fireEvent.change(screen.getByLabelText(/Email/i), 'test@example.com');
    fireEvent.change(screen.getByLabelText(/^Password/i), 'Aa!12345');
    fireEvent.change(screen.getByLabelText(/^Confirm Password/i), 'Aa!12345');
    fireEvent.change(screen.getByLabelText(/Country/i), 'Albania');
    fireEvent.change(screen.getByLabelText(/Accept Terms/i));
  });
});
