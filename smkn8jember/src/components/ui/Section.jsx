import React from 'react';

const Section = ({ 
  children, 
  title, 
  subtitle,
  background = 'white',
  padding = 'default',
  titleAlignment = 'center',
  className = '',
  id,
  ...props 
}) => {
  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-[#F8F9FA]',
    gradient: 'bg-gradient-to-b from-[#f7800027] to-[#f7800034]',
    gradientReverse: 'bg-gradient-to-b',
  };
  
  const paddings = {
    none: '',
    sm: 'px-6 py-8 md:px-12 md:py-10',
    default: 'px-6 py-12 md:px-16 md:py-16',
    lg: 'px-8 py-16 md:px-20 md:py-20',
  };
  
  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };
  
  const backgroundClasses = backgrounds[background] || backgrounds.white;
  const paddingClasses = paddings[padding] || paddings.default;
  const alignmentClasses = alignments[titleAlignment] || alignments.center;
  
  return (
    <section
      id={id}
      className={`flex justify-center items-center ${backgroundClasses} ${paddingClasses} flex-col ${className}`}
      {...props}
    >
      {(title || subtitle) && (
        <div className={`flex flex-col items-center justify-center gap-3 pb-5 ${alignmentClasses}`}>
          {title && (
            <h1 className='font-poppins text-[#212529] font-bold text-3xl md:text-4xl lg:text-[3rem]'>
              {title}
            </h1>
          )}
          {title && (
            <div className="w-1/2 h-1 bg-[#ff6000]"></div>
          )}
          {subtitle && (
            <p className='font-poppins text-[#495057] pt-4'>{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
};

export default Section;