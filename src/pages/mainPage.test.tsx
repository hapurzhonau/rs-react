import { beforeEach, describe, expect, test } from 'vitest';
import { MainPage } from './MainPage';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { mockLocalStorage, user } from '../__test__/setupTests';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});
describe('MainPage component', () => {
  beforeEach(() => {
    cleanup();
    mockLocalStorage.removeItem();
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </QueryClientProvider>
    );
  });

  test('initial render', async () => {
    const button = screen.getByRole('search');
    const input = screen.getByPlaceholderText(/search/i);
    const skeletons = screen.getAllByRole('listitem', { busy: true });
    const cardsList = await screen.findAllByRole('listitem', { busy: false });
    const skeletons2 = screen.queryByRole('listitem', { busy: true });
    expect(skeletons).toHaveLength(20);
    expect(skeletons2).not.toBeInTheDocument();
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
      expect(screen.getByRole('paragraph')).toBeInTheDocument();
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
