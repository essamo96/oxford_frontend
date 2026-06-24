const fs = require('fs');
const path = require('path');

const studentDir = path.join(__dirname, 'student');
const teacherDir = path.join(__dirname, 'teacher');
const dashboardAssetsCss = path.join(__dirname, 'dashboard-assets', 'css');
const dashboardAssetsJs = path.join(__dirname, 'dashboard-assets', 'js');

// Create directories
if (!fs.existsSync(path.join(__dirname, 'dashboard-assets'))) fs.mkdirSync(path.join(__dirname, 'dashboard-assets'));
if (!fs.existsSync(dashboardAssetsCss)) fs.mkdirSync(dashboardAssetsCss);
if (!fs.existsSync(dashboardAssetsJs)) fs.mkdirSync(dashboardAssetsJs);

// 1. Move dashboard CSS and JS
const oldCss = path.join(__dirname, 'css', 'dashboard.css');
const oldJs = path.join(__dirname, 'js', 'dashboard.js');

if (fs.existsSync(oldCss)) {
  fs.copyFileSync(oldCss, path.join(dashboardAssetsCss, 'dashboard.css'));
  fs.unlinkSync(oldCss);
}
if (fs.existsSync(oldJs)) {
  fs.copyFileSync(oldJs, path.join(dashboardAssetsJs, 'dashboard.js'));
  fs.unlinkSync(oldJs);
}

// 2. New vanilla CSS for Accordion
const cssContent = fs.readFileSync(path.join(dashboardAssetsCss, 'dashboard.css'), 'utf8');
const newCss = cssContent + `

/* Vanilla Accordion Styles */
.sidebar-submenu-wrapper {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}
.sidebar-submenu-wrapper.expanded {
  max-height: 500px; /* Arbitrary large height */
}
.sidebar-nav-item[aria-expanded="true"] .sidebar-nav-item-chevron {
  transform: rotate(180deg);
}
`;
fs.writeFileSync(path.join(dashboardAssetsCss, 'dashboard.css'), newCss, 'utf8');

// 3. New vanilla JS for Accordion
const newJs = `
document.addEventListener('DOMContentLoaded', () => {
  const triggers = document.querySelectorAll('.sidebar-nav-item.accordion-trigger');
  
  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault(); // prevent jumping
      const targetId = trigger.getAttribute('href').substring(1);
      const targetMenu = document.getElementById(targetId);
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      // Close all others
      triggers.forEach(other => {
        if (other !== trigger) {
          other.setAttribute('aria-expanded', 'false');
          const otherTargetId = other.getAttribute('href').substring(1);
          const otherMenu = document.getElementById(otherTargetId);
          if (otherMenu) otherMenu.classList.remove('expanded');
        }
      });

      // Toggle current
      if (isExpanded) {
        trigger.setAttribute('aria-expanded', 'false');
        targetMenu.classList.remove('expanded');
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        targetMenu.classList.add('expanded');
      }
    });
  });

  // Active state handling
  const currentPath = window.location.pathname.split('/').pop() || 'dashboard.html';
  const activeSubLink = document.querySelector(\`.sidebar-submenu-item[href="\${currentPath}"]\`) || document.querySelector(\`.sidebar-submenu-item[href^="\${currentPath}#"]\`);
  
  if (activeSubLink) {
    activeSubLink.classList.add('active');
    const parentMenu = activeSubLink.closest('.sidebar-submenu-wrapper');
    if (parentMenu) {
      parentMenu.classList.add('expanded');
      const triggerId = parentMenu.getAttribute('id');
      const trigger = document.querySelector(\`.sidebar-nav-item[href="#\${triggerId}"]\`);
      if (trigger) trigger.setAttribute('aria-expanded', 'true');
    }
  } else {
    const activeMainLink = document.querySelector(\`.sidebar-nav-item[href="\${currentPath}"]\`);
    if (activeMainLink) activeMainLink.classList.add('active');
  }
});
`;
fs.writeFileSync(path.join(dashboardAssetsJs, 'dashboard.js'), newJs, 'utf8');

// 4. Process all HTML files
function processHtml(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    if (!file.endsWith('.html')) return;
    const filePath = path.join(dir, file);
    let html = fs.readFileSync(filePath, 'utf8');

    // Update asset paths
    html = html.replace(/\.\.\/css\/dashboard\.css/g, '../dashboard-assets/css/dashboard.css');
    html = html.replace(/\.\.\/js\/dashboard\.js/g, '../dashboard-assets/js/dashboard.js');

    // Refactor HTML to use custom accordion instead of bootstrap collapse
    // Remove data-bs-toggle="collapse"
    html = html.replace(/data-bs-toggle="collapse"/g, '');
    
    // Add custom trigger class
    html = html.replace(/class="sidebar-nav-item"/g, (match, offset, str) => {
      // Check if it has aria-controls (which means it's an accordion trigger)
      const isTrigger = str.substring(offset, offset + 150).includes('aria-controls');
      return isTrigger ? 'class="sidebar-nav-item accordion-trigger"' : match;
    });

    // Replace <ul class="collapse sidebar-submenu" with <ul class="sidebar-submenu-wrapper sidebar-submenu"
    html = html.replace(/class="collapse sidebar-submenu"/g, 'class="sidebar-submenu-wrapper sidebar-submenu"');

    fs.writeFileSync(filePath, html, 'utf8');
  });
}

processHtml(studentDir);
processHtml(teacherDir);

console.log('Refactor complete!');
