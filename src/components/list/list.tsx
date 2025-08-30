import { use, useState } from 'react';
import { getData } from '../../get-data/get-data';
import Container from '../container/container';
import CountryContainer from '../container/country-container';
import { Modal } from '../modal/modal';
import ColumnSelector from '../column-selector/column-selector';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  const handleOpen = (name: string) => {
    setOpenCountry((prev) => (prev === name ? null : name));
  };

  return (
    <div className="flex max-w-fit mx-auto py-6 flex-col gap-2">
      <button
        onClick={() => setIsModalOpen(true)}
        className="border rounded-md max-w-fit px-2 cursor-pointer bg-gray-700 hover:bg-gray-900"
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
                <ul className="max-w-11/12 mx-auto p-2 flex flex-col gap-1 bg-gray-700 text-pink-200 border border-pink-400 rounded-md shadow-black shadow-2xl cursor-auto mt-2">
                  <div className="flex font-bold border-b border-pink-300 pb-1 mb-1">
                    <CountryContainer>Year</CountryContainer>
                    <CountryContainer>Population</CountryContainer>
                    <CountryContainer>CO₂</CountryContainer>
                    <CountryContainer>CO₂ per capita</CountryContainer>
                    {selectedColumns.includes('methane') && (
                      <CountryContainer>Methane</CountryContainer>
                    )}
                    {selectedColumns.includes('oil-co2') && (
                      <CountryContainer>Oil CO₂</CountryContainer>
                    )}
                  </div>
                  {node.data.map((row) => (
                    <li
                      key={row.year}
                      className="flex justify-between border border-gray-600 px-1"
                    >
                      <CountryContainer>{row.year}</CountryContainer>
                      <CountryContainer>
                        {row.population ?? 'N/A'}
                      </CountryContainer>
                      <CountryContainer>{row.co2 ?? 'N/A'}</CountryContainer>
                      <CountryContainer>
                        {row.co2_per_capita ?? 'N/A'}
                      </CountryContainer>
                      {selectedColumns.includes('methane') && (
                        <CountryContainer>
                          {row.methane ?? 'N/A'}
                        </CountryContainer>
                      )}
                      {selectedColumns.includes('oil-co2') && (
                        <CountryContainer>
                          {row.oil_co2 ?? 'N/A'}
                        </CountryContainer>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ColumnSelector
          selected={selectedColumns}
          onChange={(newCols) => {
            setSelectedColumns(newCols);
            setIsModalOpen(false);
          }}
        />
      </Modal>
    </div>
  );
}
