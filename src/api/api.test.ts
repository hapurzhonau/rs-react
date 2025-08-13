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
describe('getAllCharacters', async () => {
  test('ok', async () => {
    const result = await getAllCharacters();
    expect(result).toEqual(mockCharactersResponse);
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
    await expect(getAllCharacters()).rejects.toThrow('There is nothing here');
  });
  test('unknown error', async () => {
    const originalFetch = global.fetch;
    global.fetch = vi.fn(() => Promise.reject('some unknown error'));
    await expect(getAllCharacters()).rejects.toThrow('some unknown error');
    global.fetch = originalFetch;
  });
});
