const fs = require('fs');
const path = require('path');

const dirsToSearch = [
  path.join(__dirname, 'student'),
  path.join(__dirname, 'teacher')
];

let replacedCount = 0;

dirsToSearch.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Replace logo_backup.png with avatar-default.png
    if (html.includes('logo_backup.png')) {
      html = html.replace(/logo_backup\.png/g, 'avatar-default.png');
      fs.writeFileSync(filePath, html, 'utf8');
      replacedCount++;
    }
  });
});

console.log(`Replaced avatars in ${replacedCount} files.`);
