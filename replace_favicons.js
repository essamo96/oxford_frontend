const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const dirsToSearch = [
  rootDir,
  path.join(rootDir, 'student'),
  path.join(rootDir, 'teacher')
];

let replacedCount = 0;

dirsToSearch.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Favicon replacements
    let modified = false;
    
    // match <link rel="icon" ... href="...favicon.png"> and replace the href
    const regex1 = /(<link[^>]*rel="icon"[^>]*href=")([^"]+favicon\.png)(")/ig;
    if (regex1.test(html)) {
      html = html.replace(regex1, (match, p1, p2, p3) => {
        const prefix = p2.startsWith('../') ? '../' : '';
        return p1 + prefix + 'assets/img/logo_backup.png' + p3;
      });
      modified = true;
    }

    const regex2 = /(<link[^>]*rel="shortcut icon"[^>]*href=")([^"]+favicon\.ico)(")/ig;
    if (regex2.test(html)) {
      html = html.replace(regex2, (match, p1, p2, p3) => {
        const prefix = p2.startsWith('../') ? '../' : '';
        return p1 + prefix + 'assets/img/logo_backup.png' + p3;
      });
      modified = true;
    }

    const regex3 = /(<link[^>]*rel="apple-touch-icon"[^>]*href=")([^"]+favicon\.png)(")/ig;
    if (regex3.test(html)) {
      html = html.replace(regex3, (match, p1, p2, p3) => {
        const prefix = p2.startsWith('../') ? '../' : '';
        return p1 + prefix + 'assets/img/logo_backup.png' + p3;
      });
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(filePath, html, 'utf8');
      replacedCount++;
    }
  });
});

console.log(`Replaced favicons in ${replacedCount} files.`);
