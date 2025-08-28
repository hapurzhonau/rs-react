import { useEffect, useState } from 'react';
import { getData } from '../../get-data/get-data';

export default function List() {
  const [data, setData] = useState<string[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const rawData = await getData();
      const countries = Object.keys(rawData);
      setData(countries);
    };
    fetch();
  }, []);

  return (
    <div>
      <ul>
        {data.map((country) => (
          <li key={country}>{country}</li>
        ))}
      </ul>
    </div>
  );
}
