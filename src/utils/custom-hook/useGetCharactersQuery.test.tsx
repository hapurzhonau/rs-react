import { QueryClient } from '@tanstack/react-query';
import { describe, expect, test } from 'vitest';
import { QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { useGetCharactersQuery } from './useGetCharactersQuery';
import { mockCharacters, server } from '../../__test__/setupTests';
import { API_URL } from '../../constants/Constants';
import { http, HttpResponse } from 'msw';
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  return wrapper;
};
describe('useGetCharactersQuery', () => {
  test('get success characters', async () => {
    const { result } = renderHook(() => useGetCharactersQuery(1, ''), {
      wrapper: createWrapper(),
    });
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.results).toEqual(mockCharacters);
  });
  test('handle query error', async () => {
    server.use(
      http.get(API_URL, () => {
        return HttpResponse.json(
          { error: 'There is nothing here' },
          { status: 404 }
        );
      })
    );
    const { result } = renderHook(() => useGetCharactersQuery(1, ''), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toEqual(new Error('There is nothing here'));
  });
});
