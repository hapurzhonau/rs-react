import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import type { Character } from '../../interfaces/apiInterface';
import { API_URL } from '../../constants/Constants';
import { Button } from '../button/Button';

export const Details = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const handleGoHome = () =>
    navigate({ pathname: '/', search: searchParams.toString() });
  const [isLoading, setIsLoading] = useState(false);
  const [character, setCharacter] = useState<Character | null>(null);
  useEffect(() => {
    if (!id) return;
    const getOneCharacter = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/${id}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        setIsLoading(false);
        setCharacter(data);
        return data;
      } catch (err) {
        return { error: err instanceof Error ? err.message : 'Unknown error' };
      }
    };
    getOneCharacter();
  }, [id]);
  if (isLoading) return <p>Loading details...</p>;
  if (!character) return null;
  return (
    <div className="flex flex-col gap-4">
      <Button onClick={handleGoHome}>Close</Button>
      <h2 className="text-xl font-bold">{character.name}</h2>
      <img src={character.image} alt={character.name} />
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
    </div>
  );
};
