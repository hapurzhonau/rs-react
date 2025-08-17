'use client';

import { type FormEvent } from 'react';
import { Button } from '../button/Button';
import { useCardsCheckboxStore } from '../../store/useCardsCheckboxStore';
import type { Character } from '../../interfaces/apiInterface';

export const Flyout = () => {
  const { clearAllCards } = useCardsCheckboxStore();
  const selectedCards = useCardsCheckboxStore((state) => state.selectedCards);
  const cardsCount = selectedCards.length;

  if (cardsCount === 0) return null;

  const currentCardsCountAndTitle =
    cardsCount + (cardsCount > 1 ? ' items are selected' : ' item is selected');

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleDownload = async () => {
    const res = await fetch('/api/download', {
      method: 'POST',
      body: JSON.stringify(selectedCards as Character[]),
    });

    if (!res.ok) {
      console.error('Failed to download CSV');
      return;
    }
    const csvBlob = await res.blob();
    const url = URL.createObjectURL(csvBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${cardsCount}_items.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <form
      className="p-4 border-2 rounded-xl gap-2 flex max-w-fit flex-col fixed bottom-20 right-4/30 shadow-xl bg-gray-500/95"
      onSubmit={handleFormSubmit}
    >
      <p className="flex justify-center">{currentCardsCountAndTitle}</p>
      <div className="gap-4 flex max-w-fit ">
        <Button onClick={clearAllCards}>Unselect all</Button>
        <Button type="submit" onClick={handleDownload}>
          Download
        </Button>
      </div>
    </form>
  );
};
