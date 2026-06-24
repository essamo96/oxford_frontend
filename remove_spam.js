const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(f => {
    const fullPath = path.join(dir, f);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!f.includes('node_modules') && !f.includes('.git') && !f.includes('assets')) {
        walk(fullPath);
      }
    } else if (fullPath.endsWith('.html')) {
      let html = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      // 1. Remove the span next to navbar-logo (like in program-details.html)
      const navbarRegex = /(<img id="navbar-logo"[^>]*>)\s*(<span[^>]*class="[^"]*logo-text[^>]*>.*?<\/span>)/gs;
      if (navbarRegex.test(html)) {
        html = html.replace(navbarRegex, '$1');
        changed = true;
      }

      // 2. Remove the h3 and span below the logo in dashboard sidebars
      const sidebarRegex = /(<img src="\.\.\/assets\/favicon-removebg-preview\.png"[^>]*>\s*<\/div>)\s*<h3[^>]*data-en="FULL MARK ACADEMY"[^>]*>.*?<\/h3>\s*<span[^>]*data-en="[^"]*Portal"[^>]*>.*?<\/span>/gs;
      if (sidebarRegex.test(html)) {
        html = html.replace(sidebarRegex, '$1');
        changed = true;
      }

      // 3. Just in case there is a span near hero-splash-logo
      const splashRegex = /(<img id="hero-splash-logo"[^>]*>)\s*<span[^>]*>.*?<\/span>/gs;
      if (splashRegex.test(html)) {
        html = html.replace(splashRegex, '$1');
        changed = true;
      }

      if (changed) {
        fs.writeFileSync(fullPath, html, 'utf8');
      }
    }
  });
}

walk(rootDir);
console.log('Spam/span removed from headers successfully.');
