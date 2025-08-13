import { describe, expect, test } from 'vitest';
import { QueryClient } from '@tanstack/react-query';
import { queryClient } from './queryClient';

describe('queryClient instance', () => {
  test('if it instance of QueryClient', () => {
    expect(queryClient).toBeInstanceOf(QueryClient);
  });
});
