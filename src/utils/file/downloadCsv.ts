import type { Character } from '../../interfaces/apiInterface';

export const DownloadCsv = (cards: Character[]) => {
  const headers = ['Name', 'Status', 'Species'];
  const rows = cards.map((card) =>
    [card.name, card.status, card.species].join(',')
  );
  const csvFile = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${cards.length}_items.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
};
