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

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <HeroSection />
        <AboutSection />
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