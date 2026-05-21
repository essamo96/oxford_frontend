/* theme-manager.js */
(function () {
  // Available themes
  const THEMES = ['theme-dark', 'theme-light', 'theme-gold'];
  const STORAGE_KEY = 'oxford-academy-theme';
  const DEFAULT_THEME = 'theme-gold';

  // Apply theme to HTML tag
  function applyTheme(themeName) {
    THEMES.forEach(t => document.documentElement.classList.remove(t));
    document.documentElement.classList.add(themeName);
    localStorage.setItem(STORAGE_KEY, themeName);
    
    // Dispatch event for other scripts to listen
    const event = new CustomEvent('themechanged', { detail: { theme: themeName } });
    window.dispatchEvent(event);
    
    // Update theme switcher UI if exists
    updateThemeUI(themeName);
  }

  // Get active theme
  function getActiveTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved && THEMES.includes(saved) ? saved : DEFAULT_THEME;
  }

  // Icon shown on the cycle button = the icon for the CURRENT theme.
  const THEME_ICON = {
    'theme-dark':  'bi-moon-stars-fill',
    'theme-light': 'bi-sun-fill',
    'theme-gold':  'bi-award-fill'
  };

  function updateThemeUI(activeTheme) {
    const iconClass = THEME_ICON[activeTheme] || 'bi-award-fill';
    document.querySelectorAll('#themeCycleBtn, #themeCycleBtnMobile').forEach(btn => {
      btn.innerHTML = `<i class="bi ${iconClass}"></i>`;
      btn.setAttribute('data-current-theme', activeTheme);
    });
  }

  // Cycle to the next theme in THEMES order.
  function cycleTheme() {
    const current = getActiveTheme();
    const next = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length];
    applyTheme(next);
  }

  // Initialize immediately on load
  const initialTheme = getActiveTheme();
  applyTheme(initialTheme);

  // Bind events when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    updateThemeUI(initialTheme);

    document.querySelectorAll('#themeCycleBtn, #themeCycleBtnMobile').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        cycleTheme();
      });
    });
  });

  // Expose function globally
  window.ThemeManager = {
    applyTheme,
    cycleTheme,
    getActiveTheme
  };
})();
