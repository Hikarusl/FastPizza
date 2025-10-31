import { Link } from 'react-router';
import * as React from "react";

const base =
  'inline-block text-sm rounded-full  font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed';

const styles = {
  primary: base + ' bg-yellow-400 px-4 py-3 md:px-6 md:py-4',
  small: base + ' bg-yellow-400 px-4 py-2 md:px-5 md:py-2.5 text-xs',
  secondary:
    'bg-yellow-400 inline-block text-sm rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5',
};

type ButtonVariant = keyof typeof styles;

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  to?: string;
  type?: ButtonVariant;
}

function Button({ children, disabled, to, type = 'primary' }: ButtonProps) {
  let buttonStyle = styles[type]

  if (to)
    return (
      <Link to={to} className={buttonStyle}>
        {children}
      </Link>
    );

  return (
    <button disabled={disabled} className={buttonStyle}>
      {children}
    </button>
  );
}

export default Button;
