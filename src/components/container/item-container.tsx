import type { ReactNode } from 'react';

interface ItemContainerProps {
  children: ReactNode;
  className?: string;
}

export default function ItemContainer({
  children,
  className,
}: ItemContainerProps) {
  return (
    <div
      className={`w-full min-w-[25vw] px-2 flex border-gray-700 ${className}`}
    >
      {children}
    </div>
  );
}
