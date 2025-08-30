import { use, useState } from 'react';
import { getData } from '../../get-data/get-data';
import Container from '../container/container';
import CountryContainer from '../container/country-container';
import { Modal } from '../modal/modal';

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex max-w-fit mx-auto py-6 flex-col gap-2">
      <button
        onClick={() => setIsModalOpen(true)}
        className="border rounded-md max-w-fit px-2 cursor-pointer bg-gray-900 hover:bg-gray-700"
      >
        Select columns
      </button>
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
                <Container className="min-w-[40vw] border-r-1">
                  {name}
                </Container>
                <Container className="border-r-1">
                  {node.iso_code ?? 'N/A'}
                </Container>
                <Container>{latest?.population ?? 'N/A'}</Container>
              </div>

              {openCountry === name && (
                <div className="max-w-11/12 mx-auto p-2 flex flex-col gap-1 bg-gray-700 text-pink-200 border border-pink-400 rounded-md shadow-black shadow-2xl cursor-auto mt-2">
                  <div className="flex font-bold border-b border-pink-300 pb-1 mb-1">
                    <CountryContainer>Year</CountryContainer>
                    <CountryContainer>Population</CountryContainer>
                    <CountryContainer>CO₂</CountryContainer>
                    <CountryContainer>CO₂ per capita</CountryContainer>
                  </div>
                  {node.data.map((row) => (
                    <div
                      key={row.year}
                      className="flex justify-between border border-gray-600 px-1"
                    >
                      <CountryContainer className="flex border-r border-gray-600 px-2 w-full">
                        {row.year}
                      </CountryContainer>
                      <CountryContainer className="flex border-r border-gray-600 px-2 w-full">
                        {row.population ?? 'N/A'}
                      </CountryContainer>
                      <CountryContainer className="flex border-r border-gray-600 px-2 w-full">
                        {row.co2 ?? 'N/A'}
                      </CountryContainer>
                      <CountryContainer className="flex border-r border-gray-600 px-2 w-full">
                        {row.co2_per_capita ?? 'N/A'}
                      </CountryContainer>
                    </div>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        Select columns
      </Modal>
    </div>
  );
}
