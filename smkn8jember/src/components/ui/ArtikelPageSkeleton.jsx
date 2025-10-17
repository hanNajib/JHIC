import React from "react";
import { SkeletonBox, SkeletonText, SkeletonNavbar, SkeletonFooter } from "./SkeletonComponents";

const ArtikelPageSkeleton = () => {
  return (
    <>
      <SkeletonNavbar />
      
      <section className="flex flex-col items-center justify-center py-20 bg-gray-300 animate-pulse">
        <div className="max-w-3xl text-center">
          <SkeletonBox className="h-12 md:h-16 w-64 md:w-80 mx-auto mb-4" />
          <SkeletonBox className="h-6 w-96 mx-auto hidden md:block" />
        </div>
      </section>

      <section className="bg-[#f9fafb] pt-10 pb-5 px-6 md:px-16 border-b border-gray-200 animate-pulse">
        <div className="max-w-6xl mx-auto w-full flex flex-col gap-6">
          <div className="border-b border-gray-200 pb-10 px-10">
            <SkeletonBox className="h-6 w-32 mb-2" />
            <SkeletonBox className="h-10 w-full rounded-full" />
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap gap-3">
              {[...Array(8)].map((_, i) => (
                <SkeletonBox key={i} className="h-6 w-12" />
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <SkeletonBox className="h-4 w-16" />
              <SkeletonBox className="h-10 w-32 rounded-md" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white flex flex-col items-center justify-center py-8 px-16 animate-pulse">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 w-full pt-10 gap-6 items-stretch pb-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
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
          ))}
        </div>
      </section>

      <div className="w-full py-6 bg-white animate-pulse">
        <div className="w-full max-w-6xl mx-auto px-6 md:px-16 flex justify-center">
          <SkeletonBox className="h-10 w-64 rounded-md" />
        </div>
      </div>

      <SkeletonFooter />
    </>
  );
};

export default ArtikelPageSkeleton;