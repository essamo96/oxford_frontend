const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const dirsToSearch = [
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
    
    // Replace all variations of logo
    const searchRegex = /(?:\.\.\/assets\/img\/)(avatar-default\.png|logo_backup\.png|logo\.png)/g;
    
    if (searchRegex.test(html)) {
      html = html.replace(searchRegex, '../assets/img/logo_backup.png');
      fs.writeFileSync(filePath, html, 'utf8');
      replacedCount++;
    }
  });
});

// Also check index.html
const indexHtmlPath = path.join(rootDir, 'index.html');
if (fs.existsSync(indexHtmlPath)) {
  let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
  const searchRegex = /(?:assets\/img\/)(avatar-default\.png|logo_backup\.png|logo\.png)/g;
  if (searchRegex.test(indexHtml)) {
    indexHtml = indexHtml.replace(searchRegex, 'assets/img/logo_backup.png');
    fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
    replacedCount++;
  }
}

console.log(`Replaced image paths in ${replacedCount} files.`);
