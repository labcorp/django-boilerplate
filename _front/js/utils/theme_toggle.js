document.addEventListener('DOMContentLoaded', () => {
  const html_tag = document.documentElement;
  const theme_toggle = document.getElementById('theme-toggle');
  if (!theme_toggle) return;

  const update_theme = (theme) => {
    html_tag.setAttribute('data-theme', theme);
  };

  theme_toggle.addEventListener('change', (event) => {
    const new_theme = event.target.checked ? 'dark' : 'light';
    update_theme(new_theme);
    localStorage.setItem('theme', new_theme);
  });

  // Load saved theme from localStorage
  const saved_theme = localStorage.getItem('theme');
  if (saved_theme) {
    update_theme(saved_theme);
    if (saved_theme === 'dark') {
      theme_toggle.checked = true;
    }
  } else {
    update_theme('light');
    localStorage.setItem('theme', 'light');
  }
});
