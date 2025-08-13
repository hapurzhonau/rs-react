import { beforeEach, describe, expect, test, vi } from 'vitest';
import { Search } from './Search';
import { render, screen } from '@testing-library/react';
import { mockLocalStorage, user } from '../../__test__/setupTests';

const mockHandleGetSearchValue = vi.fn();

describe('search component', () => {
  beforeEach(() => {
    mockLocalStorage.removeItem();
  });
  test('renders correctly with initial value from localStorage', () => {
    mockLocalStorage.setItem('search', 'Rick');
    render(<Search handleGetSearchValue={mockHandleGetSearchValue} />);
    const input = screen.getByPlaceholderText(/search/i);
    if (!(input instanceof HTMLInputElement))
      throw new Error('Element should be input');
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('Rick');
  });
  test('calls handleGetSearchValue on submit with correct value', async () => {
    mockLocalStorage.removeItem();
    render(<Search handleGetSearchValue={mockHandleGetSearchValue} />);
    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('search');
    if (!(input instanceof HTMLInputElement))
      throw new Error('Element should be input');
    await user.type(input, 'Morty');
    await user.click(button);
    expect(mockHandleGetSearchValue).toHaveBeenCalledTimes(1);
    expect(mockHandleGetSearchValue).toHaveBeenCalledWith('Morty');
  });
  test('submits empty string when input is cleared', async () => {
    render(<Search handleGetSearchValue={mockHandleGetSearchValue} />);
    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('search');
    if (!(input instanceof HTMLInputElement))
      throw new Error('Element should be input');

    await user.clear(input);
    await user.click(button);

    expect(mockHandleGetSearchValue).toHaveBeenCalledWith('');
  });
});
