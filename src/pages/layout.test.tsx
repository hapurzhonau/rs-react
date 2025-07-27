import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Layout } from './Layout';
import { MemoryRouter } from 'react-router-dom';

describe('Layout page', () => {
  test('render', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
