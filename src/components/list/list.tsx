import { use } from 'react';
import { getData } from '../../get-data/get-data';

const dataPromise = getData();

export default function List() {
  const rawData = use(dataPromise);
  const countries = Object.entries(rawData);
  return (
    <div>
      <ul>
        {countries.map((country) => (
          <li key={country}>{country}</li>
        ))}
      </ul>
    </div>
  );
}
