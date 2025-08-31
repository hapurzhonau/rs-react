import type { ReactNode } from 'react';

interface IButtonProps {
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
}
export default function ButtonSelect({
  onClick,
  className,
  children,
}: IButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`border rounded-md max-w-fit px-2 cursor-pointer bg-gray-700 hover:bg-gray-900 ${className}`}
    >
      {children}
    </button>
  );
}
