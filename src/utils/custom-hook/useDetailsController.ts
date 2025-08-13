import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useGetDetailsQuery } from './useGetDetailsQuery';
import { queryClient } from '../../lib/queryClient';

export const useDetailsController = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const handleGoHome = () =>
    navigate({ pathname: '/', search: searchParams.toString() });
  const { isLoading, isFetching, error, data, refetch, isError } =
    useGetDetailsQuery(id);
  const invalidateCache = () => {
    queryClient.invalidateQueries({ queryKey: ['details'] });
  };

  return {
    handleGoHome,
    isLoading,
    isFetching,
    error,
    character: data,
    refetch,
    isError,
    invalidateCache,
  };
};
