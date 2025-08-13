import { type ButtonHTMLAttributes, type ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button className={`button ${className || ''}`} {...rest}>
      {children}
    </button>
  );
};
