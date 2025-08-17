'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Character } from '../../interfaces/apiInterface';
import { useCardsCheckboxStore } from '../../store/useCardsCheckboxStore';
import { Button } from '../button/Button';
import Image from 'next/image';

interface Props {
  cards: Character[];
  isError?: boolean;
  error?: Error | null;
}

export const Cards = ({ cards, isError, error }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const navigate = (path: string) => {
    router.push(path);
  };

  const { toggleCard, isSelected } = useCardsCheckboxStore();
  const handleClick = (id: string) => {
    const prevParams = new URLSearchParams(searchParams || '');
    navigate(`/${id}?${prevParams.toString()}`);
  };

  if (isError) {
    return <p className="text-red-300">{error?.message}</p>;
  }

  return (
    <ul className="lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-4 grid justify-center">
      {cards.map((card) => (
        <li
          key={card.id}
          className="bg-gray-700 rounded-sm p-1 pb-0 max-w-fit max-h-fit dark:bg-gray-500"
        >
          <Button
            onClick={() => handleClick(card.id.toString())}
            className="block w-full border-0"
          >
            <Image
              width={300}
              height={300}
              className="w-full object-cover rounded-t-sm"
              src={card.image}
              alt={card.name}
            />
            <p>{card.name}</p>
          </Button>
          <input
            type="checkbox"
            checked={isSelected(card.id)}
            name="card-checkbox"
            onChange={() => toggleCard(card)}
            className="w-4 aspect-square"
          />
        </li>
      ))}
    </ul>
  );
};
