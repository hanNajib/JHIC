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
import { useWebSettings } from '../../hooks/api/useWebSettings';
import DefaultLayout from '../../components/layout/DefaultLayout';

const HomePage = () => {
  const {data: webSettings} = useWebSettings();
  return (
    <DefaultLayout>
        <HeroSection judul={webSettings?.data?.find(setting => setting.title === 'judul_halaman')?.value} deskripsi={webSettings?.data?.find(setting => setting.title === 'deskripsi_halaman')?.value} />
        <AboutSection deskripsi={webSettings?.data?.find(setting => setting.title === 'deskripsi_about')?.value} />
        <ProgramsSection />
        <ArticlesSection />
        <AnnouncementsSection />
        <GallerySection />
    </DefaultLayout>
  );
};

export default HomePage;