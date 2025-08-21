import { describe, expect, test, vi, beforeEach } from 'vitest';
import { DownloadCsv } from './downloadCsv';

const card = [
  { name: 'Rick', status: 'Alive', species: 'Human', id: 1, image: '1.png' },
];

describe('downloadCsv file', () => {
  beforeEach(() => {
    (window.URL.createObjectURL as unknown) = vi
      .fn()
      .mockReturnValue('blob:mock');
    (window.URL.revokeObjectURL as unknown) = vi.fn();
  });

  test('create csv and link, and call download', () => {
    const fakeClick = vi.fn();
    const fakeAnchor = {
      href: '',
      download: '',
      click: fakeClick,
    } as unknown as HTMLAnchorElement;

    const createElementSpy = vi
      .spyOn(document, 'createElement')
      .mockReturnValue(fakeAnchor);

    DownloadCsv(card);

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(window.URL.createObjectURL).toHaveBeenCalled();
    expect(window.URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock');
    expect(fakeAnchor.download).toBe('1_items.csv');
    expect(fakeClick).toHaveBeenCalled();
  });
});
