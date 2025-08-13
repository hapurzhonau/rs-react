import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { Flyout } from './Flyout';
import { useCardsCheckboxStore } from '../../store/useCardsCheckboxStore';
import userEvent from '@testing-library/user-event';
import { DownloadCsv } from '../../utils/file/downloadCsv';

const card = {
  id: 1,
  name: 'Rick',
  status: 'Alive',
  species: 'Human',
  image: 'rick.png',
};
vi.mock('../../utils/file/downloadCsv', () => ({
  DownloadCsv: vi.fn(),
}));
beforeEach(() => {
  useCardsCheckboxStore.setState({
    selectedCards: [],
  });
});
describe('Flyout component', () => {
  test('Flyout should not render when no cards selected', () => {
    render(<Flyout />);
    expect(screen.queryByRole('form')).not.toBeInTheDocument();
  });
  test('Flyout should be rendered when cards are selected', () => {
    useCardsCheckboxStore.setState({
      selectedCards: [card],
    });
    render(<Flyout />);
    expect(screen.getByRole('paragraph', { name: '' })).toBeInTheDocument();
  });
  test('call DownloadCsv', async () => {
    const user = userEvent.setup();
    useCardsCheckboxStore.setState({ selectedCards: [card] });

    render(<Flyout />);
    await user.click(screen.getByText('Download'));
    expect(DownloadCsv).toHaveBeenCalledWith([card]);
  });
});
