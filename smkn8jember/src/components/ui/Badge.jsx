import React from 'react';

const Badge = ({ 
  children, 
  variant = 'primary', 
  size = 'sm',
  className = '',
  ...props 
}) => {
  const baseClasses = 'font-poppins font-medium text-center inline-flex items-center justify-center rounded-2xl';
  
  const variants = {
    primary: 'text-[#ffffff] bg-[#ffa07b]',
    secondary: 'text-[#fff] bg-[#ffa07b]',
    info: 'text-[#0800E1] bg-[#0700e136]',
    warning: 'text-[#E10000] bg-[#e1000043]',
    success: 'text-white bg-green-500',
    orange: 'text-[#ffffff] bg-[#ff6000]',
  };
  
  const sizes = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-4 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-2 text-base',
  };
  
  const variantClasses = variants[variant] || variants.primary;
  const sizeClasses = sizes[size] || sizes.sm;
  
  return (
    <span
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;