import clsx from 'clsx';
import { useDetailsController } from '../../utils/custom-hook/useDetailsController';
import { Button } from '../button/Button';
import { DetailsSkeleton } from '../skeletons/DetailsSkeleton';

export const Details = () => {
  const {
    character,
    handleGoHome,
    isLoading,
    error,
    isFetching,
    refetch,
    isError,
    invalidateCache,
  } = useDetailsController();
  return (
    <div className="relative">
      <aside className="p-2 flex flex-col gap-4 sticky top-0">
        <div className="flex gap-2 flex-wrap">
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
        <Button onClick={handleGoHome} className="border-orange-400">
          Close
        </Button>
        {error && (
          <h2 className="text-xl font-bold text-red-300">{error.message}</h2>
        )}
        {isLoading && <DetailsSkeleton />}
        {character && (
          <>
            <h2 className="text-xl font-bold">{character.name}</h2>
            <img src={character.image} alt={character.name} />
            <p>Status: {character.status}</p>
            <p>Species: {character.species}</p>
            <p>Gender: {character.gender}</p>
          </>
        )}
      </aside>
    </div>
  );
};
