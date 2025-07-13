import { PureComponent, type ReactNode } from 'react';

class CardsSkeleton extends PureComponent {
  render(): ReactNode {
    return (
      <ul className="lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-4 grid">
        {Array.from({ length: 20 }).map((_, i) => (
          <li key={i} className="bg-gray-700 rounded-sm p-1 animate-pulse">
            <div className="w-full aspect-square object-cover rounded-t-sm bg-gray-500 mb-1" />
            <p className="h-4 w-[90%] bg-gray-500 rounded-2"></p>
          </li>
        ))}
      </ul>
    );
  }
}
export default CardsSkeleton;
