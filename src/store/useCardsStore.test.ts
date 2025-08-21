import { beforeEach, describe, expect, test } from 'vitest';
import { useCardsStore } from './useCardsStore';
import { waitFor } from '@testing-library/react';

describe('useCardsStore', () => {
  const card = {
    id: 1,
    name: 'Rick',
    status: 'Alive',
    species: 'Human',
    image: 'rick.png',
  };
  beforeEach(() => {
    useCardsStore.setState({ selectedCards: [] });
  });
  test('init get is empty', () => {
    const initState = useCardsStore.getInitialState();
    expect(initState.selectedCards).toHaveLength(0);
  });
  test('toggling adds a card in store', async () => {
    const { toggleCard, selectedCards } = useCardsStore.getState();
    expect(selectedCards).toHaveLength(0);
    toggleCard(card);
    await waitFor(() => {
      expect(useCardsStore.getState().selectedCards).toHaveLength(1);
    });
  });
  test('toggling removes a card from store', async () => {
    const { toggleCard, selectedCards } = useCardsStore.getState();
    expect(selectedCards).toHaveLength(0);
    toggleCard(card);
    toggleCard(card);
    await waitFor(() => {
      expect(useCardsStore.getState().selectedCards).toHaveLength(0);
    });
  });
  test('clearAllCards working', () => {
    const { toggleCard, clearAllCards } = useCardsStore.getState();
    toggleCard(card);
    expect(useCardsStore.getState().selectedCards.length).toBe(1);

    clearAllCards();
    expect(useCardsStore.getState().selectedCards).toHaveLength(0);
  });
});
