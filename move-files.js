const fs = require('fs');
const path = require('path');

const studentDir = path.join(__dirname, 'student');
const teacherDir = path.join(__dirname, 'teacher');

if (!fs.existsSync(studentDir)) fs.mkdirSync(studentDir);
if (!fs.existsSync(teacherDir)) fs.mkdirSync(teacherDir);

function processFile(file, targetDir) {
  if (!fs.existsSync(file)) return;
  
  let html = fs.readFileSync(file, 'utf8');
  
  // Fix asset paths: css/, js/, assets/ -> ../css/, ../js/, ../assets/
  html = html.replace(/(href|src)="css\//g, '$1="../css/');
  html = html.replace(/(href|src)="js\//g, '$1="../js/');
  html = html.replace(/(href|src)="assets\//g, '$1="../assets/');
  
  // Fix login/register links (pointing back to root)
  html = html.replace(/(href)="index\.html"/g, '$1="../index.html"');
  html = html.replace(/(href)="student-login\.html"/g, '$1="../student-login.html"');
  html = html.replace(/(href)="teacher-login\.html"/g, '$1="../teacher-login.html"');
  
  // The sidebar links are like student-dashboard.html, student-academy.html
  // Since they are now in the same folder, they should just be dashboard.html, academy.html
  html = html.replace(/student-([a-z-]+)\.html/g, '$1.html');
  html = html.replace(/teacher-([a-z-]+)\.html/g, '$1.html');

  // Also fix the active link logic in dashboard.js which checks `window.location.pathname.split('/').pop()`
  // Wait, the active link logic handles `dashboard.html` properly if the links are updated.
  
  // Save to new dir
  const newName = file.replace('student-', '').replace('teacher-', '');
  fs.writeFileSync(path.join(targetDir, newName), html, 'utf8');
  
  // Remove original file
  fs.unlinkSync(file);
}

const files = fs.readdirSync(__dirname);

files.forEach(file => {
  if (file.startsWith('student-') && file !== 'student-login.html' && file !== 'student-register.html') {
    processFile(file, studentDir);
  } else if (file.startsWith('teacher-') && file !== 'teacher-login.html') {
    processFile(file, teacherDir);
  }
});

// Update the root login redirects
function updateLoginRedirect(loginFile, targetPath) {
  if (fs.existsSync(loginFile)) {
    let html = fs.readFileSync(loginFile, 'utf8');
    html = html.replace(/window\.location\.href\s*=\s*['"](student-dashboard\.html|teacher-dashboard\.html)['"]/g, `window.location.href = '${targetPath}'`);
    fs.writeFileSync(loginFile, html, 'utf8');
  }
}

updateLoginRedirect('student-login.html', 'student/dashboard.html');
updateLoginRedirect('teacher-login.html', 'teacher/dashboard.html');

console.log('Files successfully moved and paths updated.');
