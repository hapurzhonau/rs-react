import { describe, expect, test, vi } from 'vitest';
import { mockCharacters, server } from '../__test__/setupTests';

import { getAllCharacters } from './Api';
import { http, HttpResponse } from 'msw';
import { API_URL } from '../constants/Constants';
const mockCharactersResponse = {
  info: {
    count: 3,
    pages: 1,
    next: null,
  },
  results: mockCharacters,
};
describe('api request behavior', async () => {
  test('ok', async () => {
    const result = await getAllCharacters();
    expect(result).toEqual(mockCharactersResponse);
    expect(result.error).toBeUndefined();
  });
  test('error', async () => {
    server.use(
      http.get(API_URL, () => {
        return HttpResponse.json(
          { error: 'There is nothing here' },
          { status: 404 }
        );
      })
    );
    const result = await getAllCharacters();
    expect(result.error).toBeDefined();
    expect(typeof result.error).toBe('string');
    expect(result.error).toBe('There is nothing here');
    expect(result.results).toHaveLength(0);
  });
  test('unknown error', async () => {
    const originalFetch = global.fetch;
    global.fetch = vi.fn(() => Promise.reject('some unknown error'));
    const result = await getAllCharacters();
    expect(result.error).toBe('Unknown error');
    expect(result.results).toHaveLength(0);
    global.fetch = originalFetch;
  });
});
