import { create } from 'zustand';
import type { Character } from '../interfaces/apiInterface';

interface StoreCardsProps {
  selectedCards: Character[];
  toggleCard: (card: Character) => void;
  clearAllCards: () => void;
  isSelected: (id: number) => boolean;
}

export const useCardsStore = create<StoreCardsProps>((setNew, getCurrent) => ({
  selectedCards: [],

  toggleCard: (card) => {
    const { selectedCards } = getCurrent();
    const isSelected = selectedCards.some((el) => el.id === card.id);

    setNew({
      selectedCards: isSelected
        ? selectedCards.filter((el) => el.id !== card.id)
        : [...selectedCards, card],
    });
  },
  clearAllCards: () => setNew({ selectedCards: [] }),
  isSelected: (id) => getCurrent().selectedCards.some((card) => card.id === id),
}));
