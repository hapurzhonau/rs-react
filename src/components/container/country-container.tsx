import type { ReactNode } from 'react';

interface ItemContainerProps {
  children: ReactNode;
  className?: string;
}

export default function CountryContainer({
  children,
  className,
}: ItemContainerProps) {
  return (
    <div className={`flex border-r border-gray-600 px-2 w-full ${className}`}>
      {children}
    </div>
  );
}
