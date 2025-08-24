import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, beforeEach, vi, type Mock } from 'vitest';
import { Modal } from './modal';
import { useModalStore } from '../../store/use-modal-store';

vi.mock('../../store/use-modal-store');
vi.mock('../forms/controlled-form/controlled-form', () => ({
  ControlledForm: vi.fn(() => <div>ControlledForm</div>),
}));
vi.mock('../forms/uncontrolled-form/uncontrolled-form', () => ({
  UncontrolledForm: vi.fn(() => <div>UncontrolledForm</div>),
}));

describe('Modal', () => {
  const close = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('isOpen is false', () => {
    (useModalStore as unknown as Mock).mockReturnValue({
      isOpen: false,
      close,
      type: 'controlled',
      title: 'Test Modal',
    });

    render(<Modal />);
    expect(screen.queryByText(/Test Modal/i)).toBeNull();
  });

  test('renders with controlled form', () => {
    (useModalStore as unknown as Mock).mockReturnValue({
      isOpen: true,
      close,
      type: 'controlled',
      title: 'Test Modal',
    });

    render(<Modal />);
    expect(screen.getByText(/Test Modal/i)).toBeInTheDocument();
    expect(screen.getByText(/ControlledForm/i)).toBeInTheDocument();
  });

  test('render with uncontrolled form', () => {
    (useModalStore as unknown as Mock).mockReturnValue({
      isOpen: true,
      close,
      type: 'uncontrolled',
      title: 'Test Modal',
    });

    render(<Modal />);
    expect(screen.getByText(/UncontrolledForm/i)).toBeInTheDocument();
  });

  test('close when click overlay', () => {
    (useModalStore as unknown as Mock).mockReturnValue({
      isOpen: true,
      close,
      type: 'controlled',
      title: 'Test Modal',
    });

    render(<Modal />);

    const overlay = document.body.querySelector('div.fixed.inset-0');
    expect(overlay).not.toBeNull();
    if (overlay) {
      fireEvent.mouseDown(overlay);
      expect(close).toHaveBeenCalled();
    }
  });

  test('close on Escape key', () => {
    (useModalStore as unknown as Mock).mockReturnValue({
      isOpen: true,
      close,
      type: 'controlled',
      title: 'Test Modal',
    });

    render(<Modal />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(close).toHaveBeenCalled();
  });

  test('trap focus inside modal on Tab', () => {
    (useModalStore as unknown as Mock).mockReturnValue({
      isOpen: true,
      close,
      type: 'controlled',
      title: 'Test Modal',
    });

    render(<Modal />);

    const panel = document.body.querySelector(
      'div[role="dialog"]'
    ) as HTMLElement;
    expect(panel).not.toBeNull();
    panel.focus();

    const focusable = panel.querySelectorAll<HTMLElement>(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    expect(focusable.length).toBeGreaterThan(0);

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first.focus();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(last);

    last.focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(document.activeElement).toBe(first);
  });
});
