import type { ChangeEvent } from 'react';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchInput({ value, onChange }: InputProps) {
  return (
    <input
      type="search"
      name="search"
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      className="border rounded-md bg-gray-700 px-2 outline-0 focus:bg-gray-900"
      placeholder="Search..."
    ></input>
  );
}
