import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary', () => {
  test('render children', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <div>Test Content</div>
      </ErrorBoundary>
    );
    expect(getByText('Test Content')).toBeInTheDocument();
  });
  test('show error', () => {
    const ErrorComponent = () => {
      throw new Error('Test Error');
    };
    const { getByText } = render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>,
      { wrapper: ({ children }) => <>{children}</> }
    );
    expect(
      getByText('Oops!!! ErrorBoundary caught the error')
    ).toBeInTheDocument();
  });
});
