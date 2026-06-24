const fs = require('fs');
const path = require('path');

const studentPages = [
  { name: 'student-academy.html', source: 'academy.html', title: 'الأكاديمية', enTitle: 'Academy' },
  { name: 'student-exams.html', source: 'test-session.html', title: 'الامتحانات والتقييمات', enTitle: 'Exams & Assessments' },
  { name: 'student-financials.html', source: 'financials.html', title: 'المالية', enTitle: 'Financials' },
  { name: 'student-communication.html', source: 'conversations.html', title: 'التواصل', enTitle: 'Communication' },
  { name: 'student-profile.html', source: 'profile.html', title: 'حسابي', enTitle: 'Profile' }
];

const teacherPages = [
  { name: 'teacher-academy.html', source: 'academy.html', title: 'الإدارة الأكاديمية', enTitle: 'Academic Management' },
  { name: 'teacher-students.html', source: 'profile.html', title: 'الطلاب', enTitle: 'Students' },
  { name: 'teacher-content.html', source: 'library.html', title: 'المحتوى التعليمي', enTitle: 'Educational Content' },
  { name: 'teacher-sessions.html', source: 'test-session.html', title: 'الجلسات والمحاضرات', enTitle: 'Sessions & Lectures' },
  { name: 'teacher-exams.html', source: 'test-session.html', title: 'الامتحانات', enTitle: 'Exams' },
  { name: 'teacher-reports.html', source: 'reports.html', title: 'التقارير', enTitle: 'Reports' },
  { name: 'teacher-communication.html', source: 'conversations.html', title: 'التواصل', enTitle: 'Communication' },
  { name: 'teacher-profile.html', source: 'profile.html', title: 'حسابي', enTitle: 'Profile' }
];

function extractMainContent(sourceHtml) {
  if (!fs.existsSync(sourceHtml)) return `<div class="container py-8"><h1 class="text-on-surface">Content Coming Soon...</h1></div>`;
  const html = fs.readFileSync(sourceHtml, 'utf8');
  // Match everything inside <main>...</main>
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (mainMatch) {
    let inner = mainMatch[1];
    // remove footer inside main if present to avoid duplicate footers
    inner = inner.replace(/<footer[^>]*>[\s\S]*?<\/footer>/i, '');
    return inner;
  }
  return `<div class="container py-8"><h1 class="text-on-surface">Content Not Found</h1></div>`;
}

function processPages(pages, templateFile) {
  const template = fs.readFileSync(templateFile, 'utf8');
  
  pages.forEach(page => {
    console.log('Generating', page.name);
    const sourcePath = path.join('.stitch', 'designs', page.source);
    const content = extractMainContent(sourcePath);
    
    // Replace the main content in the template
    let newHtml = template.replace(
      /<main class="dashboard-main flex-1[^>]*>[\s\S]*?(?=<\/main>)/i,
      `<main class="dashboard-main flex-1 d-flex flex-column">\n${content}\n`
    );
    
    // Update the title
    newHtml = newHtml.replace(/<title>.*?<\/title>/, `<title>${page.title} | ${templateFile.includes('student') ? 'Student Portal' : 'Teacher Portal'}</title>`);
    
    fs.writeFileSync(page.name, newHtml, 'utf8');
  });
}

processPages(studentPages, 'student-dashboard.html');
processPages(teacherPages, 'teacher-dashboard.html');
console.log('Scaffolding complete!');
