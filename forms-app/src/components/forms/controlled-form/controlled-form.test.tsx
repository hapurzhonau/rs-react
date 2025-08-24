import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, vi, test, beforeEach, type Mock } from 'vitest';
import { ControlledForm } from './controlled-form';
import { useFormStore } from '../../../store/use-form-store';
import { useModalStore } from '../../../store/use-modal-store';

vi.mock('../../../store/use-form-store', () => ({
  useFormStore: vi.fn(),
}));
vi.mock('../../../store/use-modal-store', () => ({
  useModalStore: vi.fn(),
}));

describe('ControlledForm', () => {
  const addData = vi.fn();
  const close = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useFormStore as unknown as Mock).mockReturnValue({ addData });
    (useModalStore as unknown as Mock).mockReturnValue({ close });
  });

  test('renders required fields', () => {
    render(<ControlledForm />);
    expect(screen.getByLabelText(/Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Age:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password:$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Confirm Password:$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Upload picture:/i)).toBeInTheDocument();
  });

  test('error if submitted empty form', async () => {
    render(<ControlledForm />);
    const form = screen.getByRole('form');
    fireEvent.submit(form);
    const errors = await screen.findAllByText(/required/i);
    expect(errors.length).toBeGreaterThan(0);
  });

  test('submit valid data', async () => {
    render(<ControlledForm />);

    fireEvent.input(screen.getByLabelText(/Name:/i), {
      target: { value: 'Daniyar' },
    });
    fireEvent.input(screen.getByLabelText(/Age:/i), {
      target: { value: 25 },
    });
    fireEvent.input(screen.getByLabelText(/Email:/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.input(screen.getByLabelText(/^Password:$/i), {
      target: { value: 'Aa!12345' },
    });
    fireEvent.input(screen.getByLabelText(/^Confirm Password:$/i), {
      target: { value: 'Aa!12345' },
    });

    fireEvent.input(screen.getByLabelText(/Country:/i), {
      target: { value: 'Albania' },
    });
    fireEvent.click(screen.getByLabelText(/Accept Terms and Conditions/i));

    fireEvent.click(screen.getByText(/Submit/i));
  });
});
