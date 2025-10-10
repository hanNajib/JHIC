import React from 'react';

const SimpleLoading = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2', 
    lg: 'w-8 h-8 border-2',
    xl: 'w-12 h-12 border-4'
  };

  return (
    <div className={`
      ${sizeClasses[size]} 
      border-orange-500 
      border-t-transparent 
      rounded-full 
      animate-spin 
      ${className}
    `} />
  );
};

export default SimpleLoading;