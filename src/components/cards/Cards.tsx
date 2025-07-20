import { PureComponent, type ReactNode } from 'react';
import type { Character } from '../../interfaces/apiInterface';

interface Props {
  cards: Character[];
}

class Cards extends PureComponent<Props, object> {
  render(): ReactNode {
    return (
      <ul className="lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-4 grid">
        {this.props.cards.length ? (
          this.props.cards.map((card) => (
            <li key={card.id} className="bg-gray-700 rounded-sm p-1">
              <img
                className="w-full aspect-square object-cover rounded-t-sm"
                src={card.image}
                alt={card.name}
              />
              <p>{card.name}</p>
            </li>
          ))
        ) : (
          <h3>Nothing here</h3>
        )}
      </ul>
    );
  }
}
export default Cards;
