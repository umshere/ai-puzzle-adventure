import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'glass';
}

export function Card({
  children,
  className = '',
  variant = 'default',
  ...props
}: CardProps) {
  const baseClasses = 'rounded-lg transition-all duration-300';
  const variantClasses = {
    default: 'bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl',
    glass: 'glass backdrop-blur-md border border-white/10 shadow-lg hover:shadow-xl hover:border-white/20'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}