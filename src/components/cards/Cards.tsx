import { useNavigate, useSearchParams } from 'react-router-dom';
import type { Character } from '../../interfaces/apiInterface';
import { useCardsStore } from '../../store/useCardsStore';

interface Props {
  cards: Character[];
}

export const Cards = ({ cards }: Props) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toggleCard, isSelected } = useCardsStore();
  const handleClick = (id: string) => {
    const prevParams = new URLSearchParams(searchParams);
    navigate({
      pathname: `details/${id}`,
      search: prevParams.toString(),
    });
  };
  return (
    <ul className="lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-4 grid justify-center">
      {cards.length ? (
        cards.map((card) => (
          <li
            key={card.id}
            className="bg-gray-700 rounded-sm p-1 pb-0 max-w-fit max-h-fit dark:bg-gray-500"
          >
            <button
              onClick={() => handleClick(card.id.toString())}
              className="block w-full border-0"
            >
              <img
                className="w-full object-cover rounded-t-sm"
                src={card.image}
                alt={card.name}
              />
              <p>{card.name}</p>
            </button>
            <input
              type="checkbox"
              checked={isSelected(card.id)}
              name="card-checkbox"
              onChange={() => toggleCard(card)}
              className="w-4 aspect-square"
            />
          </li>
        ))
      ) : (
        <h3>Nothing here</h3>
      )}
    </ul>
  );
};
