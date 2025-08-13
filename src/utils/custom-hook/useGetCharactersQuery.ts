import { useQuery } from '@tanstack/react-query';
import { cacheStaleTime } from '../../constants/Constants';
import { getAllCharacters } from '../../api/Api';

export const useGetCharactersQuery = (page: number, name: string) => {
  return useQuery({
    queryKey: ['characters', page, name],
    queryFn: () => getAllCharacters(page, name),
    staleTime: cacheStaleTime,
  });
};
