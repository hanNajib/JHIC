import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  padding = 'md',
  shadow = 'lg',
  rounded = '2xl',
  background = 'white',
  onClick,
  ...props 
}) => {
  const baseClasses = 'overflow-clip';
  
  const paddings = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-6',
  };
  
  const shadows = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };
  
  const roundeds = {
    none: '',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
  };
  
  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-[#F8F9FA]',
    transparent: 'bg-transparent',
  };
  
  const paddingClasses = paddings[padding] || paddings.md;
  const shadowClasses = shadows[shadow] || shadows.lg;
  const roundedClasses = roundeds[rounded] || roundeds['2xl'];
  const backgroundClasses = backgrounds[background] || backgrounds.white;
  
  return (
    <div
      className={`${baseClasses} ${paddingClasses} ${shadowClasses} ${roundedClasses} ${backgroundClasses} ${className}`}
      {...props}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;