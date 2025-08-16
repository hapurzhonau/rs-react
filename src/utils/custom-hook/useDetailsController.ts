'use client';
import { useSearchParams, useRouter, useParams } from 'next/navigation';
import { useGetDetailsQuery } from './useGetDetailsQuery';
import { queryClient } from '../../lib/queryClient';

export const useDetailsController = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleGoHome = () => {
    const query = searchParams?.toString();
    router.push(query ? `/?${query}` : '/');
  };

  const { isLoading, isFetching, error, data, refetch, isError } =
    useGetDetailsQuery(params?.id as string);

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
