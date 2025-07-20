import { beforeEach, describe, expect, test } from 'vitest';
import MainPage from './MainPage';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { user } from '../__test__/setupTests';

describe('MainPage component', () => {
  beforeEach(() => {
    cleanup();
    localStorage.clear();
    render(<MainPage />);
  });

  test('initial render', async () => {
    const button = screen.getByRole('button', { name: /search/i });
    const input = screen.getByPlaceholderText(/search/i);
    const cardsList = await screen.findAllByRole('listitem', { busy: false });

    expect(button).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
    expect(cardsList).toHaveLength(3);
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument();
  });

  test('successful search shows 1 result', async () => {
    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'test');
    expect(input).toHaveValue('test');

    await user.click(button);

    await waitFor(() => {
      expect(screen.getAllByRole('listitem', { busy: false })).toHaveLength(1);
    });
  });

  test('unsuccessful search shows error message', async () => {
    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'error');
    expect(input).toHaveValue('error');

    await user.click(button);

    await waitFor(() => {
      expect(screen.queryAllByRole('listitem', { busy: false })).toHaveLength(
        0
      );
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    });
  });
});
