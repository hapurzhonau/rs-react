import { render, screen } from '@testing-library/react';
import { describe, test, vi, beforeEach, type Mock } from 'vitest';
import { FormResultsList } from './form-results-list';
import { useFormStore } from '../../store/use-form-store';

vi.mock('../../store/use-form-store');

describe('FormResultsList', () => {
  const mockForms = [
    {
      id: '1',
      name: 'Test1',
      age: 25,
      email: 'test1@example.com',
      password: 'Aa!12345',
      gender: 'female',
      terms: true,
      country: 'Albania',
      image: '',
      from: 'controlled',
    },
    {
      id: '2',
      name: 'Test2',
      age: 30,
      email: 'test2@example.com',
      password: 'Aa@2',
      gender: 'male',
      terms: false,
      country: 'Canada',
      image: 'data:image/png;base64,test',
      from: 'uncontrolled',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('no submitted data', () => {
    (useFormStore as unknown as Mock).mockImplementation((selector) =>
      selector({ forms: [] })
    );

    render(<FormResultsList />);
    expect(screen.getByText(/No submitted data/i)).toBeInTheDocument();
  });

  test('render all form entries', () => {
    (useFormStore as unknown as Mock).mockImplementation((selector) =>
      selector({ forms: mockForms })
    );

    render(<FormResultsList />);
    expect(screen.getAllByText(/Test1/i)).toHaveLength(2);
    expect(screen.getByText(/Age: 25/i)).toBeInTheDocument();
    expect(screen.getByText(/test1@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Terms accepted: Yes/i)).toBeInTheDocument();
    expect(screen.getByText(/^controlled/i)).toBeInTheDocument();

    expect(screen.getAllByText(/Test2/i)).toHaveLength(2);
    expect(screen.getByText(/Age: 30/i)).toBeInTheDocument();
    expect(screen.getByText(/test2@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Terms accepted: No/i)).toBeInTheDocument();
    expect(screen.getByText(/^uncontrolled/i)).toBeInTheDocument();
    const img = screen.getByAltText(/Uploaded image/i) as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('data:image/png;base64,test');
  });
});
