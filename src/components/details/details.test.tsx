import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi, describe, beforeEach, expect, test } from 'vitest';
import { Details } from './Details';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useNavigate: vi.fn(),
    useSearchParams: vi.fn(() => [new URLSearchParams('page=1'), vi.fn()]),
    useParams: vi.fn(() => ({ id: '1' })),
  };
});

const mockCharacter = {
  id: '1',
  name: 'Rick Sanchez',
  image: 'Sanchez.jpeg',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
};

describe('Details component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('renders loading then character details', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCharacter),
      } as Response)
    );

    render(
      <QueryClientProvider
        client={
          new QueryClient({
            defaultOptions: { queries: { retry: false } },
          })
        }
      >
        <MemoryRouter initialEntries={['/details/1?page=1']}>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText(/status.../i)).toBeDefined();

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /Rick Sanchez/i })
      ).toBeDefined();
    });
  });
});
