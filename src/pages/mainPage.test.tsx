import { beforeEach, describe, expect, test } from 'vitest';
import { MainPage } from './MainPage';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { user } from '../__test__/setupTests';
import { MemoryRouter } from 'react-router-dom';

describe('MainPage component', () => {
  beforeEach(() => {
    cleanup();
    localStorage.clear();
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );
  });

  test('initial render', async () => {
    const button = screen.getByRole('search');
    const input = screen.getByPlaceholderText(/search/i);
    const cardsList = await screen.findAllByRole('listitem', { busy: false });

    expect(button).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
    expect(cardsList).toHaveLength(3);
    expect(screen.getByRole('region')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument();
  });

  test('successful search shows 1 result', async () => {
    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('search');

    await user.type(input, 'test');
    expect(input).toHaveValue('test');

    await user.click(button);

    await waitFor(() => {
      expect(screen.getAllByRole('listitem', { busy: false })).toHaveLength(1);
    });
  });

  test('unsuccessful search shows error message', async () => {
    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('search');

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
  test('open details with click on card ', async () => {
    const cards = await screen.findAllByRole('listitem');
    await user.click(cards[0]);
    await waitFor(() => {
      expect(screen.getByRole('complementary')).toBeInTheDocument();
    });
  });
});
