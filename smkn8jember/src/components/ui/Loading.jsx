import React from 'react';

const Loading = ({ 
  variant = 'spinner', 
  size = 'md', 
  color = 'orange', 
  text = '', 
  fullScreen = false ,
  direction = 'flex-col',
  skeletonTotal = 3
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    orange: 'border-orange-500 text-orange-500',
    blue: 'border-blue-500 text-blue-500',
    green: 'border-green-500 text-green-500',
    gray: 'border-gray-500 text-gray-500',
    white: 'border-white text-white'
  };

  // Spinner Loading
  const SpinnerLoader = () => (
    <div className={`
      ${sizeClasses[size]} 
      border-2 border-t-transparent 
      ${colorClasses[color]} 
      rounded-full 
      animate-spin
    `} />
  );

  // Dots Loading
  const DotsLoader = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`
            ${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-5 h-5'} 
            ${colorClasses[color].split(' ')[1]} 
            rounded-full 
            animate-bounce
          `}
          style={{
            animationDelay: `${i * 0.1}s`,
            backgroundColor: 'currentColor'
          }}
        />
      ))}
    </div>
  );

  // Pulse Loading
  const PulseLoader = () => (
    <div className={`
      ${sizeClasses[size]} 
      ${colorClasses[color].split(' ')[1]} 
      rounded-full 
      animate-pulse
    `} style={{ backgroundColor: 'currentColor' }} />
  );

  // Wave Loading
  const WaveLoader = () => (
    <div className="flex items-end space-x-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`
            ${size === 'sm' ? 'w-1' : size === 'md' ? 'w-1.5' : size === 'lg' ? 'w-2' : 'w-3'} 
            ${colorClasses[color].split(' ')[1]}
          `}
          style={{
            height: size === 'sm' ? '16px' : size === 'md' ? '24px' : size === 'lg' ? '32px' : '40px',
            backgroundColor: 'currentColor',
            animation: `wave 0.8s ease-in-out ${i * 0.1}s infinite alternate`
          }}
        />
      ))}
      <style jsx>{`
        @keyframes wave {
          0% { height: ${size === 'sm' ? '4px' : size === 'md' ? '6px' : size === 'lg' ? '8px' : '10px'}; }
          100% { height: ${size === 'sm' ? '16px' : size === 'md' ? '24px' : size === 'lg' ? '32px' : '40px'}; }
        }
      `}</style>
    </div>
  );

  const SkeletonLoader = () => (
    <div className={`animate-pulse space-y-3 w-full flex ${direction} gap-2`}>
      {Array.from({ length: skeletonTotal }).map((_, index) => (
        <div key={index} className="bg-gray-300 rounded h-4 w-3/4"></div>
      ))}
    </div>
  );

  const renderLoader = () => {
    switch (variant) {
      case 'dots': return <DotsLoader />;
      case 'pulse': return <PulseLoader />;
      case 'wave': return <WaveLoader />;
      case 'skeleton': return <SkeletonLoader />;
      default: return <SpinnerLoader />;
    }
  };

  const LoaderContent = () => (
    <div className="flex flex-col items-center justify-center space-y-3">
      {renderLoader()}
      {text && (
        <p className={`text-sm font-medium ${colorClasses[color].split(' ')[1]} animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <LoaderContent />
        </div>
      </div>
    );
  }

  return <LoaderContent />;
};

export default Loading;