import { useState, useEffect, useCallback } from 'react';
import { Search } from '../components/search/Search';
import { Cards } from '../components/cards/Cards';
import { getAllCharacters } from '../api/Api';
import type { Character } from '../interfaces/apiInterface';
import { CardsSkeleton } from '../components/cardsSkeleton/CardsSkeleton';
import { Outlet, useParams, useSearchParams } from 'react-router-dom';
import { useLocalStorage } from '../utils/custom-hook/useLocalStorage';
import clsx from 'clsx';
import { Flyout } from '../components/flyout/Flyout';
import { Pagination } from '../components/navigation/Pagination';

export const MainPage = () => {
  const [cards, setCards] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [totalPages, setTotalPages] = useState(1);
  const [searchValue, setSearchValue] = useLocalStorage('search', '');

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const name = searchParams.get('name') || '';

  const { id: details } = useParams();

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setSearchParams({ page: newPage.toString(), name: searchValue });
      }
    },
    [searchValue, setSearchParams, totalPages]
  );

  const getCharacters = useCallback(async () => {
    setIsLoading(true);
    const data = await getAllCharacters(page, name);
    setIsLoading(false);

    if (data.error) {
      setError(data.error);
    } else {
      setCards(data.results);
      setError(undefined);
      setTotalPages(data.info.pages);
    }
  }, [page, name]);

  const handleGetSearchValue = (value: string) => {
    setSearchValue(value);
    setSearchParams({ page: '1', name: value });
  };

  useEffect(() => {
    getCharacters();
  }, [getCharacters]);

  return (
    <section role="region" className="flex-1 flex flex-col gap-4">
      <Search handleGetSearchValue={handleGetSearchValue} />
      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={() => handlePageChange(page - 1)}
        onNext={() => handlePageChange(page + 1)}
      />
      {isLoading ? (
        <CardsSkeleton />
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <>
          <div
            role="complementary"
            className={clsx('first', details && 'flex', 'second')}
          >
            <Cards cards={cards} />
            {details && (
              <aside className="w-3/5 border-l pl-4">
                <Outlet />
              </aside>
            )}
          </div>
          <Pagination
            page={page}
            totalPages={totalPages}
            onPrev={() => handlePageChange(page - 1)}
            onNext={() => handlePageChange(page + 1)}
          />
          <Flyout />
        </>
      )}
    </section>
  );
};
