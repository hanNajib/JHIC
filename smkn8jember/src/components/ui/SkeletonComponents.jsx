import React from "react";

// Base skeleton untuk elemen individual
export const SkeletonBox = ({ className = "", ...props }) => (
  <div className={`bg-gray-300 animate-pulse rounded ${className}`} {...props}></div>
);

export const SkeletonText = ({ lines = 1, className = "" }) => (
  <div className={`space-y-2 ${className}`}>
    {[...Array(lines)].map((_, i) => (
      <SkeletonBox 
        key={i} 
        className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`} 
      />
    ))}
  </div>
);

export const SkeletonCard = ({ className = "" }) => (
  <div className={`bg-white p-6 rounded-lg shadow-md animate-pulse ${className}`}>
    <div className="flex items-center gap-2 mb-3">
      <SkeletonBox className="w-5 h-5" />
      <SkeletonBox className="h-6 w-32" />
    </div>
    <SkeletonText lines={3} />
  </div>
);

export const SkeletonArticleCard = ({ className = "" }) => (
  <div className={`bg-white rounded-lg shadow-md overflow-hidden animate-pulse ${className}`}>
    <SkeletonBox className="h-48" />
    <div className="p-4 space-y-3">
      <SkeletonBox className="h-5 w-3/4" />
      <SkeletonText lines={2} />
      <div className="flex justify-between items-center">
        <SkeletonBox className="h-4 w-20" />
        <SkeletonBox className="h-4 w-16" />
      </div>
    </div>
  </div>
);

export const SkeletonCareerCard = ({ className = "" }) => (
  <div className={`flex flex-col items-center text-center gap-3 animate-pulse ${className}`}>
    <SkeletonBox className="w-16 h-16 rounded-full" />
    <SkeletonBox className="h-5 w-24" />
    <SkeletonBox className="h-4 w-20" />
  </div>
);

export const SkeletonPartnerCard = ({ className = "" }) => (
  <div className={`flex flex-col items-center gap-3 w-32 h-32 animate-pulse ${className}`}>
    <SkeletonBox className="w-24 h-16" />
    <SkeletonBox className="h-4 w-20" />
  </div>
);

// Section skeletons
export const SkeletonHeroSection = () => (
  <section className="flex flex-col items-center justify-center py-20 bg-gray-300 animate-pulse">
    <div className="max-w-3xl text-center">
      <SkeletonBox className="h-12 md:h-16 w-80 md:w-96 mx-auto mb-4" />
    </div>
  </section>
);

export const SkeletonAboutSection = () => (
  <section className="flex flex-col gap-4 items-center justify-center bg-[#F8F9FA] px-8 py-16 animate-pulse">
    <SkeletonBox className="h-8 w-64 mb-4" />
    <div className="w-full max-w-4xl">
      <SkeletonText lines={5} />
    </div>
  </section>
);

export const SkeletonSubjectsSection = () => (
  <section className="bg-[#eeeeee] py-16 flex flex-col items-center justify-center px-2 m-8 rounded-2xl animate-pulse">
    <SkeletonBox className="h-8 w-56 mb-8" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto px-6 w-full">
      {[...Array(6)].map((_, idx) => (
        <SkeletonCard key={idx} />
      ))}
    </div>
  </section>
);

export const SkeletonCareersSection = () => (
  <section className="bg-[#F77F00]/50 py-16 flex flex-col items-center justify-center px-6 m-8 rounded-lg animate-pulse">
    <SkeletonBox className="h-8 w-40 mb-10 bg-gray-300" />
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl w-full">
      {[...Array(8)].map((_, index) => (
        <SkeletonCareerCard key={index} />
      ))}
    </div>
  </section>
);

export const SkeletonArticlesSection = () => (
  <section className="py-16 flex flex-col items-center justify-center px-2 m-8 animate-pulse">
    <SkeletonBox className="h-8 w-32 mb-4" />
    <div className="flex gap-6 w-full pt-10 pb-4 overflow-x-auto no-scrollbar">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex-none w-72 sm:w-80 md:w-96">
          <SkeletonArticleCard />
        </div>
      ))}
    </div>
  </section>
);

export const SkeletonPartnersSection = () => (
  <div className="animate-pulse">
    <SkeletonBox className="h-8 w-72 mx-auto mb-4" />
    <section className="py-16 px-6 m-8 rounded-lg overflow-hidden">
      <div className="flex items-center gap-16 justify-center">
        {[...Array(6)].map((_, index) => (
          <SkeletonPartnerCard key={index} />
        ))}
      </div>
    </section>
  </div>
);

export const SkeletonNavbar = () => (
  <div className="w-full h-16 bg-white shadow-sm animate-pulse">
    <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
      <SkeletonBox className="h-8 w-32" />
      <div className="flex gap-4">
        {[...Array(4)].map((_, i) => (
          <SkeletonBox key={i} className="h-4 w-16" />
        ))}
      </div>
      <SkeletonBox className="h-8 w-20" />
    </div>
  </div>
);

export const SkeletonFooter = () => (
  <footer className="bg-gray-800 text-white py-16 animate-pulse">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="space-y-4">
          <SkeletonBox className="h-6 w-32 bg-gray-600" />
          <div className="space-y-2">
            {[...Array(4)].map((_, j) => (
              <SkeletonBox key={j} className="h-4 w-24 bg-gray-700" />
            ))}
          </div>
        </div>
      ))}
    </div>
  </footer>
);