import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { NotFoundPage } from './NotFoundPage';

describe('NotFoundPage', () => {
  test('render component', () => {
    render(<NotFoundPage />);
    expect(screen.getByRole('paragraph')).toBeInTheDocument();
  });
});
