import { beforeEach, describe, expect, test } from 'vitest';
import { useCardsCheckboxStore } from './useCardsCheckboxStore';
import { waitFor } from '@testing-library/react';

describe('useCardsCheckboxStore', () => {
  const card = {
    id: 1,
    name: 'Rick',
    status: 'Alive',
    species: 'Human',
    image: 'rick.png',
  };
  beforeEach(() => {
    useCardsCheckboxStore.setState({ selectedCards: [] });
  });
  test('init get is empty', () => {
    const initState = useCardsCheckboxStore.getInitialState();
    expect(initState.selectedCards).toHaveLength(0);
  });
  test('toggling adds a card in store', async () => {
    const { toggleCard, selectedCards } = useCardsCheckboxStore.getState();
    expect(selectedCards).toHaveLength(0);
    toggleCard(card);
    await waitFor(() => {
      expect(useCardsCheckboxStore.getState().selectedCards).toHaveLength(1);
    });
  });
  test('toggling removes a card from store', async () => {
    const { toggleCard, selectedCards } = useCardsCheckboxStore.getState();
    expect(selectedCards).toHaveLength(0);
    toggleCard(card);
    toggleCard(card);
    await waitFor(() => {
      expect(useCardsCheckboxStore.getState().selectedCards).toHaveLength(0);
    });
  });
  test('clearAllCards working', () => {
    const { toggleCard, clearAllCards } = useCardsCheckboxStore.getState();
    toggleCard(card);
    expect(useCardsCheckboxStore.getState().selectedCards.length).toBe(1);

    clearAllCards();
    expect(useCardsCheckboxStore.getState().selectedCards).toHaveLength(0);
  });
});
