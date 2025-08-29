import { use, useState } from 'react';
import { getData } from '../../get-data/get-data';
import ItemContainer from '../container/item-container';
import ItemYearContainer from '../container/item-year-container';

interface IYearRow {
  year: number;
  population?: number | null;
  co2?: number;
  co2_per_capita?: number;
  [k: string]: number | string | null | undefined;
}

interface ICountryNode {
  iso_code: string;
  data: IYearRow[];
}

interface ICommonJson {
  [key: string]: ICountryNode;
}

const dataPromise = getData();

export default function List() {
  const rawData = use<ICommonJson>(dataPromise);
  const countries = Object.entries(rawData);

  const [openCountry, setOpenCountry] = useState<string | null>(null);

  const handleOpen = (name: string) => {
    setOpenCountry((prev) => (prev === name ? null : name));
  };

  return (
    <div className="flex max-w-fit mx-auto py-6">
      <ul className="flex flex-col gap-2">
        {countries.map(([name, node]) => {
          const latest = node.data.at(-1);
          return (
            <li
              key={name}
              className="border-1 cursor-pointer border-gray-700"
              onClick={() => handleOpen(name)}
            >
              <div className="flex justify-center">
                <ItemContainer className="min-w-[40vw] border-r-1">
                  {name}
                </ItemContainer>
                <ItemContainer className="border-r-1">
                  {node.iso_code ?? 'N/A'}
                </ItemContainer>
                <ItemContainer>{latest?.population ?? 'N/A'}</ItemContainer>
              </div>

              {openCountry === name && (
                <div className="max-w-11/12 mx-auto p-2 flex flex-col gap-1 bg-gray-700 text-pink-200 border border-pink-400 rounded-md shadow-black shadow-2xl cursor-auto">
                  {node.data.map((row) => (
                    <div
                      key={row.year}
                      className="flex justify-between border border-gray-600 px-1"
                    >
                      <ItemYearContainer>{row.year}</ItemYearContainer>
                      <ItemYearContainer>
                        {row.population ?? 'N/A'}
                      </ItemYearContainer>
                      <ItemYearContainer>{row.co2 ?? 'N/A'}</ItemYearContainer>
                      <ItemYearContainer>
                        {row.co2_per_capita ?? 'N/A'}
                      </ItemYearContainer>
                    </div>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
