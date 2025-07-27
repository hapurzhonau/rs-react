import { useNavigate, useSearchParams } from 'react-router-dom';
import type { Character } from '../../interfaces/apiInterface';

interface Props {
  cards: Character[];
}

export const Cards = ({ cards }: Props) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const handleClick = (id: string) => {
    const prevParams = new URLSearchParams(searchParams);

    navigate({
      pathname: `details/${id}`,
      search: prevParams.toString(),
    });
  };
  return (
    <ul className="lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-4 grid">
      {cards.length ? (
        cards.map((card) => (
          <li key={card.id} className="bg-gray-700 rounded-sm p-1">
            <button
              onClick={() => handleClick(card.id.toString())}
              className="block w-full"
            >
              <img
                className="w-full aspect-square object-cover rounded-t-sm"
                src={card.image}
                alt={card.name}
              />
              <p>{card.name}</p>
            </button>
          </li>
        ))
      ) : (
        <h3>Nothing here</h3>
      )}
    </ul>
  );
};
