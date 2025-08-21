import { type FormEvent } from 'react';
import { Button } from '../button/Button';

import { useCardsStore } from '../../store/useCardsStore';
import { DownloadCsv } from '../../utils/file/downloadCsv';

export const Flyout = () => {
  const { clearAllCards } = useCardsStore();
  const cardsCount = useCardsStore((state) => state.selectedCards.length);
  const selectedCardsIdArray = useCardsStore((state) => state.selectedCards);

  if (cardsCount === 0) return null;
  const currentCardsCountAndTitle =
    cardsCount + (cardsCount > 1 ? ' items are selected' : ' item is selected');
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleDownload = () => {
    DownloadCsv(selectedCardsIdArray);
  };
  return (
    <form
      className="p-4 border-2 rounded-xl gap-2 flex max-w-fit flex-col sticky bottom-40 left-1/1 shadow-xl bg-gray-500/95"
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
