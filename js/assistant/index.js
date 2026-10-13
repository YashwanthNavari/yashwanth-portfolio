/**
 * Navari AI — Portfolio Intelligence Assistant
 * Main entry point and lifecycle manager
 */
(() => {
  const initNavariAI = () => {
    if (window.NavariAI && typeof window.NavariAI.init === 'function') {
      window.NavariAI.init();
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavariAI);
  } else {
    initNavariAI();
  }
})();
