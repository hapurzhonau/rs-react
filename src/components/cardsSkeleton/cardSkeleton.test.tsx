import { describe, expect, test } from 'vitest';
import CardsSkeleton from './CardsSkeleton';
import { render, screen } from '@testing-library/react';

describe('skeletons render', () => {
  test('render 20 list items', () => {
    render(<CardsSkeleton />);
    expect(screen.getAllByRole('listitem').length).toBe(20);
  });
});
