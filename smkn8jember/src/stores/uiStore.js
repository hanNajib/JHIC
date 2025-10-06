import { create } from 'zustand';

export const useUIStore = create((set) => ({
  // About section state
  isAboutExpanded: false,
  toggleAboutExpanded: () => set((state) => ({ isAboutExpanded: !state.isAboutExpanded })),

  // Programs section state
  isProgramsExpanded: false,
  toggleProgramsExpanded: () => set((state) => ({ isProgramsExpanded: !state.isProgramsExpanded })),

  // Gallery filter state
  activeGalleryFilter: 'all',
  setActiveGalleryFilter: (filter) => set({ activeGalleryFilter: filter }),

  // Search state
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Mobile menu state
  isMobileMenuOpen: false,
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),

  // Loading states
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),


}));