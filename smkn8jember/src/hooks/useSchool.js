import { useState } from 'react';
import { 
  SCHOOL_STATS, 
  SCHOOL_PROGRAMS, 
  SAMPLE_ARTICLES, 
  SAMPLE_ANNOUNCEMENTS, 
  SAMPLE_GALLERY 
} from '../constants/schoolData';

/**
 * Hook for managing school programs
 */
export const useSchoolPrograms = () => {
  const [isProgramsExpanded, setIsProgramsExpanded] = useState(false);

  const toggleExpanded = () => setIsProgramsExpanded(!isProgramsExpanded);
  
  const visiblePrograms = isProgramsExpanded 
    ? SCHOOL_PROGRAMS 
    : SCHOOL_PROGRAMS.slice(0, 3);

  return {
    programs: SCHOOL_PROGRAMS,
    visiblePrograms,
    isExpanded: isProgramsExpanded,
    toggleExpanded,
  };
};

/**
 * Hook for managing articles
 */
export const useArticles = () => {
  const visibleArticles = SAMPLE_ARTICLES.slice(0, 5);

  return {
    articles: SAMPLE_ARTICLES,
    visibleArticles,
    isLoading: false,
  };
};

/**
 * Hook for managing announcements
 */
export const useAnnouncements = () => {
  return {
    announcements: SAMPLE_ANNOUNCEMENTS,
    isLoading: false,
  };
};

/**
 * Hook for managing gallery
 */
export const useGallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredGallery = activeFilter === 'all' 
    ? SAMPLE_GALLERY 
    : SAMPLE_GALLERY.filter(item => item.category === activeFilter);

  const setFilter = (category) => {
    setActiveFilter(category);
  };

  return {
    gallery: SAMPLE_GALLERY,
    filteredGallery,
    activeFilter,
    setFilter,
  };
};

/**
 * Hook for managing about section
 */
export const useAbout = () => {
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);

  const toggleExpanded = () => setIsAboutExpanded(!isAboutExpanded);

  return {
    stats: SCHOOL_STATS,
    isExpanded: isAboutExpanded,
    toggleExpanded,
  };
};