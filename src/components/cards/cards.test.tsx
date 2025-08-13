import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Cards } from './Cards';
import type { Character } from '../../interfaces/apiInterface';
import { MemoryRouter } from 'react-router-dom';

const mockCharacters: Character[] = [
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

describe('cards', () => {
  test('render multiple cards', () => {
    render(
      <MemoryRouter>
        <Cards cards={mockCharacters} />
      </MemoryRouter>
    );
    expect(screen.getAllByRole('listitem').length).toBe(3);
  });
  test('render title if list is empty', () => {
    render(
      <MemoryRouter>
        <Cards cards={[]} />
      </MemoryRouter>
    );
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
});
