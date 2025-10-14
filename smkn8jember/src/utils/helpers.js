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

export const getCategoryStyle = (color) => {
  if (!color) return {};

  let hex = color.startsWith('#') ? color.slice(1) : color;
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  const isLight = brightness > 200; // makin tinggi makin putih cerah

  const bgColor = `rgba(${r}, ${g}, ${b}, 0.1)`;

  const borderColor = isLight
    ? `rgba(0, 0, 0, 0.15)`
    : `rgba(${r}, ${g}, ${b}, 0.3)`;

  const textColor = isLight ? '#333' : color;

  return {
    background: bgColor,
    color: textColor,
    border: `1px solid ${borderColor}`,
  };
};
