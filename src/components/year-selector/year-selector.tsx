interface YearSelectorProps {
  years: number[];
  selectedYear: number;
  onChange: (year: number) => void;
}

export function YearSelector({
  years,
  selectedYear,
  onChange,
}: YearSelectorProps) {
  return (
    <div className="border rounded-md px-2 bg-gray-700 hover:bg-gray-900">
      <label htmlFor="year-select"></label>
      <select
        id="year-select"
        value={selectedYear}
        onChange={(e) => onChange(Number(e.target.value))}
        className="cursor-pointer outline-0"
      >
        {years.map((year) => (
          <option key={year} value={year} className="bg-gray-600">
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
