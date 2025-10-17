import React from "react";
import {
  SkeletonNavbar,
  SkeletonHeroSection,
  SkeletonAboutSection,
  SkeletonSubjectsSection,
  SkeletonCareersSection,
  SkeletonArticlesSection,
  SkeletonPartnersSection,
  SkeletonFooter,
} from "./SkeletonComponents";

const MajorDetailSkeleton = () => {
  return (
    <>
      <SkeletonNavbar />
      <SkeletonHeroSection />
      <SkeletonAboutSection />
      <SkeletonSubjectsSection />
      <SkeletonCareersSection />
      <SkeletonArticlesSection />
      <SkeletonPartnersSection />
      <SkeletonFooter />
    </>
  );
};

export default MajorDetailSkeleton;