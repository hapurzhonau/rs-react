import type { ChangeEvent } from 'react';

interface SortProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Sorter({ value, onChange }: SortProps) {
  return (
    <div className="flex gap-2 items-center">
      <p>Sort by</p>
      <select
        value={value}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          onChange(e.target.value)
        }
        name="sort"
        className="outline-0 border rounded-md px-2 pb-1 cursor-pointer bg-gray-600 hover:bg-gray-900"
      >
        <option value="name-asc">Name ▲</option>
        <option value="name-desc">Name ▼</option>
        <option value="population-asc">Population ▲</option>
        <option value="population-desc">Population ▼</option>
      </select>
    </div>
  );
}
