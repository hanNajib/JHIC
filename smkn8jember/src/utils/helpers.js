/**
 * Utility function to format numbers for display
 */
export const formatNumber = (num) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K+';
  }
  return num.toString();
};

/**
 * Utility function to format dates
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

/**
 * Utility function to truncate text
 */
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

/**
 * Utility function to generate unique IDs
 */
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Utility function to get icon component by name
 */
export const getIconComponent = (iconName) => {
  // This will be used with dynamic imports
  return iconName;
};

/**
 * Utility function to handle scroll to section
 */
export const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

/**
 * Utility function to debounce function calls
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};