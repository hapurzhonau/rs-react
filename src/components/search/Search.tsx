import { useState, type ChangeEvent, type FormEvent } from 'react';

interface Props {
  handleGetSearchValue: (value: string) => void;
}

export const Search = ({ handleGetSearchValue }: Props) => {
  const [inputState, setInputState] = useState(
    localStorage.getItem('search') || ''
  );
  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value);
  };
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget).get('search');
    if (formData) handleGetSearchValue(formData.toString());
    else handleGetSearchValue('');
  };
  return (
    <form
      onSubmit={handleFormSubmit}
      style={{ display: 'flex' }}
      className="gap-3"
    >
      <input
        name="search"
        type="text"
        placeholder=" Search"
        className="border-2 rounded-sm w-sm"
        value={inputState}
        onChange={handleOnchange}
      />
      <button className="border-2 cursor-pointer rounded-sm px-3 py-1 bg-gray-700">
        Search
      </button>
    </form>
  );
};
