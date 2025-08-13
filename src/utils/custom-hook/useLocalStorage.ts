import { useState } from 'react';

type ReturnTypes = [string, (newValue: string) => void];

export function useLocalStorage(
  key: string,
  initialValue: string
): ReturnTypes {
  const [value, setValue] = useState<string>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? storedValue : initialValue;
  });

  const setStoredValue = (newValue: string) => {
    setValue(newValue);
    localStorage.setItem(key, newValue);
  };

  return [value, setStoredValue];
}
