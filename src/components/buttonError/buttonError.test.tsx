import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ButtonError from './ButtonError';
import { user } from '../../__test__/setupTests';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

describe('Error button component', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });
  test('renders correctly', () => {
    render(<ButtonError />);
    expect(screen.getByRole('button', { name: /error/i })).toBeInTheDocument();
  });
  test('state changes', async () => {
    render(
      <ErrorBoundary>
        <ButtonError />
      </ErrorBoundary>
    );
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
    await user.click(btn);
    expect(btn).not.toBeInTheDocument();
  });
});
