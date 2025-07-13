import { API_URL } from '../constants/Constants';
import type { ApiResponse } from '../interfaces/apiInterface';

export const getAllCharacters = async () => {
  const raw = localStorage.getItem('search');
  const savedSearch = raw ? raw.trim() : '';
  const url = savedSearch ? `${API_URL}/?name=${savedSearch}` : API_URL;

  try {
    const response = await fetch(url);
    const data: ApiResponse = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  } catch (err) {
    const data: ApiResponse = {
      info: { count: 0, pages: 1, next: '1', prev: '1' },
      error: err instanceof Error ? err.message : 'Unknown error',
      results: [],
    };
    return data;
  }
};
