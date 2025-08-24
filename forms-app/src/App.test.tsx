import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, type Mock } from 'vitest';
import App from './App';

import { useModalStore } from './store/use-modal-store';
vi.mock('./store/use-modal-store', () => ({
  useModalStore: vi.fn(() => ({
    open: vi.fn(),
  })),
}));

describe('App component', () => {
  test('render buttons', () => {
    render(<App />);
    expect(screen.getByText(/Uncontrolled Form/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Controlled Form/i)).toHaveLength(2);
  });

  test('open Uncontrolled Form', () => {
    const openMock = vi.fn();
    (useModalStore as unknown as Mock).mockReturnValue({ open: openMock });

    render(<App />);
    fireEvent.click(screen.getByText(/Uncontrolled Form/i));
    expect(openMock).toHaveBeenCalledWith('uncontrolled', 'uncontrolled');
  });
});
