import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
  HeroSection,
  AboutSection,
  ProgramsSection,
  ArticlesSection,
  AnnouncementsSection,
  GallerySection,
} from '../../components/sections';
import SambutanSection from '../../components/sections/SambutanSection';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <HeroSection />
        <AboutSection />
        {/* <SambutanSection /> */}
        <ProgramsSection />
        <ArticlesSection />
        <AnnouncementsSection />
        <GallerySection />
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;