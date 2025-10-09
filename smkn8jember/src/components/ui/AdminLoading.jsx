import React from 'react';
import { FaSpinner, FaCircleNotch } from 'react-icons/fa';
import { BiLoaderAlt } from 'react-icons/bi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const AdminLoading = ({ 
  type = 'page', 
  size = 'md', 
  message = 'Memuat data...',
  overlay = false 
}) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl', 
    lg: 'text-4xl',
    xl: 'text-6xl'
  };

  const PageLoading = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-orange-200 rounded-full animate-pulse"></div>
          <div className="absolute top-2 left-2 w-16 h-16 border-4 border-t-orange-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-orange-500 rounded-full animate-ping"></div>
        </div>
        <div className="mt-6 space-y-2">
          <h3 className="text-xl font-semibold text-gray-800">Sedang Memuat</h3>
          <p className="text-gray-600">{message}</p>
          <div className="flex justify-center space-x-1 mt-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const TableLoading = () => (
    <div className="bg-white rounded-lg p-6 space-y-4 animate-pulse">
      {/* Header skeleton */}
      <div className="flex justify-between items-center">
        <div className="h-8 bg-gray-200 rounded w-48"></div>
        <div className="flex space-x-2">
          <div className="h-10 bg-gray-200 rounded w-24"></div>
          <div className="h-10 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
      
      {/* Table skeleton */}
      <div className="space-y-3">
        {/* Table header */}
        <div className="flex space-x-4">
          <div className="h-4 bg-gray-300 rounded w-16"></div>
          <div className="h-4 bg-gray-300 rounded w-32"></div>
          <div className="h-4 bg-gray-300 rounded w-48"></div>
          <div className="h-4 bg-gray-300 rounded w-24"></div>
          <div className="h-4 bg-gray-300 rounded w-20"></div>
        </div>
        
        {/* Table rows */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex space-x-4">
            <div className="h-4 bg-gray-200 rounded w-16"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-4 bg-gray-200 rounded w-48"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
        ))}
      </div>
    </div>
  );

  // Loading untuk card
  const CardLoading = () => (
    <div className="bg-white rounded-lg p-6 animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        <div className="h-3 bg-gray-200 rounded"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  );

  // Loading inline untuk tombol
  const ButtonLoading = () => (
    <div className="flex items-center justify-center space-x-2">
      <AiOutlineLoading3Quarters className={`${sizeClasses[size]} animate-spin text-orange-500`} />
      <span className="text-gray-600">{message}</span>
    </div>
  );

  // Loading dengan overlay
  const OverlayLoading = () => (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 mx-4 max-w-sm w-full">
        <div className="text-center">
          <div className="relative mx-auto w-16 h-16 mb-4">
            <BiLoaderAlt className="w-16 h-16 text-orange-500 animate-spin" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Mohon Tunggu</h3>
          <p className="text-gray-600 text-sm">{message}</p>
        </div>
      </div>
    </div>
  );

  // Loading untuk form
  const FormLoading = () => (
    <div className="space-y-4 animate-pulse">
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-24"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-32"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-28"></div>
        <div className="h-24 bg-gray-200 rounded"></div>
      </div>
      <div className="flex space-x-4 justify-end">
        <div className="h-10 bg-gray-200 rounded w-24"></div>
        <div className="h-10 bg-gray-300 rounded w-24"></div>
      </div>
    </div>
  );

  if (overlay) return <OverlayLoading />;

  switch (type) {
    case 'table': return <TableLoading />;
    case 'card': return <CardLoading />;
    case 'button': return <ButtonLoading />;
    case 'form': return <FormLoading />;
    default: return <PageLoading />;
  }
};

export default AdminLoading;