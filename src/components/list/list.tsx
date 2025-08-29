import { use } from 'react';
import { getData } from '../../get-data/get-data';
import ItemContainer from '../item-container/item-container';

interface IYearRow {
  year: number;
  population?: number | null;
  co2?: number;
  [k: string]: number | string | null | undefined;
}

interface ICountryNode {
  iso_code: string;
  data: IYearRow[];
}

interface ICommonJson {
  countryType: Record<string, ICountryNode>;
}

const dataPromise = getData();

export default function List() {
  const rawData = use<ICommonJson>(dataPromise);
  const countries = Object.entries(rawData);
  return (
    <div className="flex max-w-fit mx-auto py-6">
      <ul className="flex flex-col gap-2">
        {countries.map(([name, node]) => {
          const latest = node.data.at(-1);
          return (
            <li
              key={name}
              className="flex border-1 border-gray-700 justify-center cursor-pointer"
            >
              <ItemContainer className="min-w-[40vw] border-r-1">
                {name}
              </ItemContainer>
              <ItemContainer className="border-r-1">
                {node.iso_code ?? 'N/A'}
              </ItemContainer>
              <ItemContainer>
                {latest.population ? latest.population : 'N/A'}
              </ItemContainer>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
