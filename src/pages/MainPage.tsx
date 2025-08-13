import { Search } from '../components/search/Search';
import { Cards } from '../components/cards/Cards';
import { CardsSkeleton } from '../components/skeletons/CardsSkeleton';
import { Outlet, useParams } from 'react-router-dom';
import clsx from 'clsx';
import { Flyout } from '../components/flyout/Flyout';
import { Pagination } from '../components/navigation/Pagination';
import { useGetCards } from '../utils/custom-hook/useGetCards';
import { Button } from '../components/button/Button';

export const MainPage = () => {
  const { id: details } = useParams();
  const {
    cards,
    handleGetSearchValue,
    isLoading,
    pagination,
    isFetching,
    refetch,
    isError,
    invalidateCache,
    error,
  } = useGetCards();

  return (
    <>
      <div className="flex gap-2 pb-2">
        <div
          className={clsx(
            'p-1 rounded-md',
            isLoading ? 'bg-green-400' : 'bg-blue-400'
          )}
        >
          Load
        </div>
        <div
          className={clsx(
            'p-1 rounded-md',
            isFetching ? 'bg-green-400' : 'bg-blue-400'
          )}
        >
          Fetch
        </div>
        <div
          className={clsx(
            'p-1 rounded-md',
            !isError ? 'bg-blue-400' : 'bg-red-400'
          )}
        >
          {!isError ? 'Ok' : 'Error'}
        </div>
        <Button onClick={() => refetch()}>refetch</Button>
        <Button onClick={invalidateCache}>invalidate</Button>
      </div>
      <section role="region" className="flex-1 flex flex-col gap-4">
        <Search handleGetSearchValue={handleGetSearchValue} />
        {(isLoading || isFetching) && <CardsSkeleton />}

        {!isLoading && (
          <>
            <Pagination {...pagination} />
            <div role="complementary" className={clsx(details && 'flex')}>
              <Cards cards={cards} isError={isError} error={error} />
              <Outlet />
            </div>
            <Pagination {...pagination} />
            <Flyout />
          </>
        )}
      </section>
    </>
  );
};
