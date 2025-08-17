'use client';
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Button } from '../button/Button';
interface Props {
  handleGetSearchValue: (value: string) => void;
}

export const Search = ({ handleGetSearchValue }: Props) => {
  const [inputState, setInputState] = useState('');
  useEffect(() => {
    const saved = localStorage.getItem('search');
    if (saved) setInputState(saved);
  }, []);
  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value);
  };
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget).get('search');
    if (formData) handleGetSearchValue(formData.toString());
    else handleGetSearchValue('');
    localStorage.setItem('search', inputState);
  };
  return (
    <form onSubmit={handleFormSubmit} className="flex justify-center">
      <input
        name="search"
        type="text"
        placeholder=" Search"
        className="border-1 rounded-l-2xl w-sm px-2 py-1 dark:text-black text-white bg-gray-700 dark:bg-gray-200 outline-0"
        value={inputState}
        onChange={handleOnchange}
      />
      <Button
        className="rounded-none rounded-r-2xl border-l-0 border-1 px-4"
        role="search"
      >
        <MagnifyingGlassIcon />
      </Button>
    </form>
  );
};
