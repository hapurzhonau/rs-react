import { useState } from 'react';

interface ColumnSelectorProps {
  selected: string[];
  onChange: (newSelected: string[]) => void;
}

export default function ColumnSelector({
  selected,
  onChange,
}: ColumnSelectorProps) {
  const [localState, setLocalState] = useState<string[]>(selected);

  const toggleColumn = (col: string) => {
    setLocalState((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="flex gap-2 items-center border-pink-400 border p-2 rounded-md">
          <label htmlFor="methane">Methane</label>
          <input
            id="methane"
            type="checkbox"
            checked={localState.includes('methane')}
            onChange={() => toggleColumn('methane')}
            className="w-[18px] h-[18px] cursor-pointer"
          />
        </div>

        <div className="flex gap-2 items-center border-pink-400 border p-2 rounded-md">
          <label htmlFor="oil-co2">Oil CO₂</label>
          <input
            id="oil-co2"
            type="checkbox"
            checked={localState.includes('oil-co2')}
            onChange={() => toggleColumn('oil-co2')}
            className="w-[18px] h-[18px] cursor-pointer"
          />
        </div>
      </div>
      <button
        onClick={() => onChange(localState)}
        className="border rounded-md max-w-fit px-2 pb-1 cursor-pointer bg-gray-700 hover:bg-gray-900"
      >
        Apply
      </button>
    </div>
  );
}
