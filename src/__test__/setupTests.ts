import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { API_URL } from '../constants/Constants';
import type { Character } from '../interfaces/apiInterface';
import { beforeAll, afterEach, afterAll } from 'vitest';
export const user = userEvent.setup();

export const mockCharacters: Character[] = [
  {
    id: 1,
    image: 'image1.png',
    name: 'item1',
  },
  {
    id: 2,
    image: 'image2.png',
    name: 'item2 ',
  },
  {
    id: 3,
    image: 'image3.png',
    name: 'item3',
  },
];

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

export const handlers = [
  http.get(API_URL, ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get('name');

    if (!name) {
      return HttpResponse.json({
        info: { count: mockCharacters.length, pages: 1, next: null },
        results: mockCharacters,
      });
    }

    if (name === 'test') {
      return HttpResponse.json({
        info: { count: 1, pages: 1, next: null },
        results: [mockCharacters[0]],
      });
    }

    if (name === 'error') {
      return HttpResponse.json(
        { error: 'There is nothing here' },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      info: { count: 0, pages: 0, next: null },
      results: [],
    });
  }),
];

export const server = setupServer(...handlers);
