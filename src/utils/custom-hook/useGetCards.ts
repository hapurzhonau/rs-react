'use client';
import { useLocalStorage } from './useLocalStorage';
import { useGetCharactersQuery } from './useGetCharactersQuery';
import { queryClient } from '../../lib/queryClient';
import { useRouter, useSearchParams } from 'next/navigation';

export const useGetCards = () => {
  const [searchValue, setSearchValue] = useLocalStorage('search', '');
  const router = useRouter();
  const params = useSearchParams();
  const searchParams = new URLSearchParams(params || '');
  const page = Number(searchParams.get('page') || 1);
  const name = searchParams.get('name') || '';

  const { isLoading, data, isFetching, error, refetch, isError } =
    useGetCharactersQuery(page, name || searchValue);

  const invalidateCache = () => {
    queryClient.invalidateQueries({ queryKey: ['characters'] });
  };
  const cards = data?.results || [];
  const totalPages = data?.info.pages || 1;
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      searchParams.set('page', newPage.toString());
      router.push(`/?${searchParams.toString()}`);
    }
  };
  const handleGetSearchValue = (value: string) => {
    setSearchValue(value);
    searchParams.set('page', '1');
    searchParams.set('name', value);
    router.push(`/?${searchParams.toString()}`);
  };

  const pagination = {
    totalPages,
    handlePageChange,
    page,
  };

  return {
    handleGetSearchValue,
    pagination,
    isLoading,
    error,
    cards,
    isFetching,
    refetch,
    isError,
    invalidateCache,
  };
};
