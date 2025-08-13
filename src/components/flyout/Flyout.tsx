import { type FormEvent } from 'react';
import { Button } from '../button/Button';

import { useCardsCheckboxStore } from '../../store/useCardsCheckboxStore';
import { DownloadCsv } from '../../utils/file/downloadCsv';

export const Flyout = () => {
  const { clearAllCards } = useCardsCheckboxStore();
  const cardsCount = useCardsCheckboxStore(
    (state) => state.selectedCards.length
  );
  const selectedCardsIdArray = useCardsCheckboxStore(
    (state) => state.selectedCards
  );

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
