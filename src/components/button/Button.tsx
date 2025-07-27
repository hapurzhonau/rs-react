import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'light' | 'dark';
  children: ReactNode;
}

export const Button = ({
  variant = 'light',
  children,
  className,
  ...rest
}: ButtonProps) => {
  const baseClasses =
    'border-2 rounded-sm px-3 bg-gray-700 cursor-pointer max-w-fit';
  const variants: Record<typeof variant, string> = {
    light: 'bg-gray-700 text-white hover:bg-gray-500',
    dark: 'bg-gray-300 text-black hover:bg-gray-600',
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className || ''}`}
      {...rest}
    >
      {children}
    </button>
  );
};
