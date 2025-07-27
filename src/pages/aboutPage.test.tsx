import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AboutPage } from './AboutPage';

describe('About page', () => {
  test('render', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});
