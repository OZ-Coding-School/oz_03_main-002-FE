// Button.tsx
import React from 'react';

type ButtonProps = {
  onClick: () => void;
  label: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  type = 'button',
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
