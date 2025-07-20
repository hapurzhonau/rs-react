import { Component, type ReactNode } from 'react';
import Search from '../components/search/Search';
import Cards from '../components/cards/Cards';
import { getAllCharacters } from '../api/Api';
import type { Character, Info } from '../interfaces/apiInterface';
import ButtonError from '../components/buttonError/ButtonError';
import CardsSkeleton from '../components/cardsSkeleton/CardsSkeleton';

interface State {
  cards: Character[];
  isLoading: boolean;
  searchValue: string;
  error: undefined | string;
  info: Info;
}
const initialState = {
  cards: [],
  isLoading: false,
  searchValue: '',
  error: undefined,
  info: { count: 0, pages: 1, next: '1', prev: '1' },
};
class MainPage extends Component {
  state: State = initialState;
  handleGetSearchValue = (value: string) => {
    this.setState({ searchValue: value }, () => {
      localStorage.setItem('search', value);
      this.getCharacters();
    });
  };
  componentDidMount(): void {
    this.getCharacters();
  }
  getCharacters = async () => {
    this.setState((prev) => ({ ...prev, isLoading: true }));
    const data = await getAllCharacters();
    this.setState((prev) => ({
      ...prev,
      isLoading: false,
      cards: data.results,
      error: data.error,
    }));
  };
  render(): ReactNode {
    const { cards, isLoading, error } = this.state;
    return (
      <main
        className="gap-8 p-8"
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <ButtonError />
        <Search handleGetSearchValue={this.handleGetSearchValue} />

        {isLoading ? (
          <CardsSkeleton />
        ) : error ? (
          <h3>{error}</h3>
        ) : (
          <Cards cards={cards} />
        )}
      </main>
    );
  }
}
export default MainPage;
