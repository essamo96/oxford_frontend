const fs = require('fs');
const path = require('path');

const studentDir = path.join(__dirname, 'student');
const teacherDir = path.join(__dirname, 'teacher');
const cssDir = path.join(__dirname, 'dashboard-assets', 'css');
const jsDir = path.join(__dirname, 'dashboard-assets', 'js');

// 1. Update sidebars across all files to use real links for Academy
function updateSidebars(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
  files.forEach(file => {
    let html = fs.readFileSync(path.join(dir, file), 'utf8');
    // For student
    html = html.replace(/academy\.html#programs/g, 'academy-programs.html');
    html = html.replace(/academy\.html#courses/g, 'academy-courses.html');
    html = html.replace(/academy\.html#groups/g, 'academy-groups.html');
    html = html.replace(/academy\.html#sessions/g, 'academy-sessions.html');
    html = html.replace(/academy\.html#resources/g, 'academy-resources.html');
    fs.writeFileSync(path.join(dir, file), html, 'utf8');
  });
}
updateSidebars(studentDir);
updateSidebars(teacherDir); // (Teacher links are teacher-academy.html#..., I'll leave them for now unless they match exact string)

// 2. CSS Content
const cssData = {
  'academy-programs.css': `
.program-card { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.program-card:hover { transform: translateY(-8px) scale(1.02); box-shadow: 0 15px 30px rgba(197, 168, 128, 0.15); }
.program-badge { position: absolute; top: -12px; right: 24px; padding: 4px 12px; border-radius: 20px; font-weight: 700; font-size: 0.8rem; box-shadow: 0 4px 10px rgba(0,0,0,0.2); z-index: 2; }
[dir="rtl"] .program-badge { right: auto; left: 24px; }
`,
  'academy-courses.css': `
.course-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
.course-ring { transform: rotate(-90deg); transform-origin: 50% 50%; transition: stroke-dashoffset 1s ease-in-out; }
.course-card { transition: all 0.3s ease; }
.course-card:hover { border-color: var(--accent-color); box-shadow: 0 0 20px rgba(197, 168, 128, 0.1); }
`,
  'academy-groups.css': `
.avatar-stack { display: flex; align-items: center; }
.avatar-stack img { width: 36px; height: 36px; border-radius: 50%; border: 2px solid var(--bg-primary); margin-left: -12px; transition: transform 0.2s; }
.avatar-stack img:hover { transform: translateY(-4px); z-index: 10; }
[dir="rtl"] .avatar-stack img { margin-left: 0; margin-right: -12px; }
.group-card { border-left: 3px solid transparent; transition: all 0.3s ease; }
.group-card:hover { border-left-color: var(--accent-color); background: rgba(255,255,255,0.02); }
[dir="rtl"] .group-card { border-left: none; border-right: 3px solid transparent; }
[dir="rtl"] .group-card:hover { border-right-color: var(--accent-color); }
`,
  'academy-sessions.css': `
.session-timeline { position: relative; padding-left: 24px; border-left: 2px solid var(--separator-color); }
[dir="rtl"] .session-timeline { padding-left: 0; padding-right: 24px; border-left: none; border-right: 2px solid var(--separator-color); }
.session-dot { position: absolute; left: -9px; top: 0; width: 16px; height: 16px; border-radius: 50%; background: var(--bg-secondary); border: 2px solid var(--accent-color); }
[dir="rtl"] .session-dot { left: auto; right: -9px; }
.pulse-dot { animation: pulse 2s infinite; }
@keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.7); } 70% { box-shadow: 0 0 0 10px rgba(220, 53, 69, 0); } 100% { box-shadow: 0 0 0 0 rgba(220, 53, 69, 0); } }
`,
  'academy-resources.css': `
.resource-item { transition: all 0.2s ease; border-bottom: 1px solid var(--separator-color); }
.resource-item:hover { background: rgba(197, 168, 128, 0.05); padding-left: 8px; }
[dir="rtl"] .resource-item:hover { padding-left: 0; padding-right: 8px; }
.file-icon { font-size: 1.5rem; color: var(--accent-color); }
`
};

for (const [file, content] of Object.entries(cssData)) {
  fs.writeFileSync(path.join(cssDir, file), content, 'utf8');
}

// 3. JS Content
const jsData = {
  'academy-programs.js': `// Programs logic\nconsole.log('Programs loaded');`,
  'academy-courses.js': `
document.addEventListener('DOMContentLoaded', () => {
  const rings = document.querySelectorAll('.course-ring');
  setTimeout(() => {
    rings.forEach(ring => {
      const val = ring.getAttribute('data-value');
      const offset = 251.2 - (251.2 * val) / 100;
      ring.style.strokeDashoffset = offset;
    });
  }, 100);
});
`,
  'academy-groups.js': `// Groups logic\nconsole.log('Groups loaded');`,
  'academy-sessions.js': `// Sessions logic\nconsole.log('Sessions loaded');`,
  'academy-resources.js': `// Resources logic\nconsole.log('Resources loaded');`
};

for (const [file, content] of Object.entries(jsData)) {
  fs.writeFileSync(path.join(jsDir, file), content, 'utf8');
}

// 4. HTML Content Generation
const baseHtml = fs.readFileSync(path.join(studentDir, 'dashboard.html'), 'utf8');

const pages = [
  {
    name: 'academy-programs.html',
    title: 'البرامج الدراسية | Programs',
    content: `
      <div class="container-fluid px-0">
        <div class="d-flex justify-content-between align-items-end mb-4">
          <div>
            <h1 class="h3 fw-bold mb-1" style="color: var(--text-primary);" data-en="Academic Programs" data-ar="البرامج الدراسية">Academic Programs</h1>
            <p class="text-sm opacity-75 mb-0" data-en="Explore and enroll in our comprehensive educational tracks." data-ar="استكشف وسجل في مساراتنا التعليمية الشاملة.">Explore and enroll in our comprehensive educational tracks.</p>
          </div>
        </div>

        <div class="row g-4">
          <!-- Tawjihi Program -->
          <div class="col-lg-6">
            <div class="glass-panel rounded-4 p-4 position-relative program-card">
              <div class="program-badge bg-gold text-dark" data-en="Most Popular" data-ar="الأكثر شيوعاً">Most Popular</div>
              <div class="d-flex gap-4 align-items-start">
                <div class="p-3 rounded-4 d-flex align-items-center justify-content-center" style="background: rgba(197,168,128,0.1); width: 80px; height: 80px;">
                  <i class="bi bi-mortarboard-fill fs-1" style="color: var(--accent-color);"></i>
                </div>
                <div class="flex-1">
                  <h3 class="h4 fw-bold mb-2" style="color: var(--text-primary);" data-en="Tawjihi Program" data-ar="برنامج التوجيهي">Tawjihi Program</h3>
                  <p class="text-sm opacity-75 mb-3" data-en="Comprehensive preparation for high school seniors across all streams (Science, Literature, IT)." data-ar="إعداد شامل لطلبة الثانوية العامة في كافة الفروع (العلمي، الأدبي، وتكنولوجيا المعلومات).">Comprehensive preparation for high school seniors...</p>
                  <div class="d-flex gap-3 mb-4">
                    <span class="text-xs border px-2 py-1 rounded" style="border-color: var(--separator-color);"><i class="bi bi-clock me-1"></i> 9 Months</span>
                    <span class="text-xs border px-2 py-1 rounded" style="border-color: var(--separator-color);"><i class="bi bi-person me-1"></i> 1200+ Enrolled</span>
                  </div>
                  <button class="btn btn-luxury px-4 py-2 text-sm fw-bold w-100" data-en="View Program Details" data-ar="عرض تفاصيل البرنامج">View Program Details</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Children Program -->
          <div class="col-lg-6">
            <div class="glass-panel rounded-4 p-4 position-relative program-card">
              <div class="d-flex gap-4 align-items-start">
                <div class="p-3 rounded-4 d-flex align-items-center justify-content-center" style="background: rgba(0,240,255,0.1); width: 80px; height: 80px;">
                  <i class="bi bi-balloon-fill fs-1" style="color: #00f0ff;"></i>
                </div>
                <div class="flex-1">
                  <h3 class="h4 fw-bold mb-2" style="color: var(--text-primary);" data-en="Children's Program" data-ar="برنامج الأطفال">Children's Program</h3>
                  <p class="text-sm opacity-75 mb-3" data-en="Foundation building in math, languages, and sciences for primary stage students." data-ar="بناء الأساسيات في الرياضيات، اللغات، والعلوم لطلبة المرحلة الابتدائية.">Foundation building...</p>
                  <div class="d-flex gap-3 mb-4">
                    <span class="text-xs border px-2 py-1 rounded" style="border-color: var(--separator-color);"><i class="bi bi-clock me-1"></i> 6 Months</span>
                    <span class="text-xs border px-2 py-1 rounded" style="border-color: var(--separator-color);"><i class="bi bi-star me-1"></i> Grade 1-6</span>
                  </div>
                  <button class="btn btn-glass border px-4 py-2 text-sm fw-bold w-100" data-en="View Program Details" data-ar="عرض تفاصيل البرنامج">View Program Details</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    name: 'academy-courses.html',
    title: 'المواد التعليمية | Courses',
    content: `
      <div class="container-fluid px-0">
        <h1 class="h3 fw-bold mb-4" style="color: var(--text-primary);" data-en="My Enrolled Courses" data-ar="موادي التعليمية">My Enrolled Courses</h1>
        
        <div class="course-grid">
          <!-- Course Card -->
          <div class="glass-panel rounded-4 p-4 course-card d-flex flex-column">
            <div class="d-flex justify-content-between mb-3">
              <div class="p-2 rounded" style="background: rgba(197,168,128,0.1);">
                <i class="bi bi-calculator fs-4" style="color: var(--accent-color);"></i>
              </div>
              <div class="position-relative" style="width: 50px; height: 50px;">
                <svg viewBox="0 0 100 100" class="w-100 h-100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="var(--bg-tertiary)" stroke-width="8"></circle>
                  <circle class="course-ring" cx="50" cy="50" r="40" fill="none" stroke="var(--accent-color)" stroke-width="8" stroke-dasharray="251.2" stroke-dashoffset="251.2" stroke-linecap="round" data-value="65"></circle>
                </svg>
                <div class="position-absolute top-50 start-50 translate-middle text-xs fw-bold">65%</div>
              </div>
            </div>
            <h4 class="h5 fw-bold mb-1" style="color: var(--text-primary);" data-en="Mathematics (Calculus)" data-ar="الرياضيات (التفاضل والتكامل)">Mathematics (Calculus)</h4>
            <p class="text-xs opacity-75 mb-4" data-en="Dr. Sami Yousef • Tawjihi Track" data-ar="د. سامي يوسف • مسار التوجيهي">Dr. Sami Yousef • Tawjihi Track</p>
            
            <div class="mt-auto pt-3 border-t" style="border-color: var(--separator-color) !important;">
              <p class="text-xs mb-2"><i class="bi bi-play-circle me-1 text-primary"></i> <span data-en="Next: Integration Basics" data-ar="التالي: أساسيات التكامل">Next: Integration Basics</span></p>
              <button class="btn btn-luxury w-100 py-2 text-sm" data-en="Continue Learning" data-ar="متابعة التعلم">Continue Learning</button>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    name: 'academy-groups.html',
    title: 'المجموعات الدراسية | Study Groups',
    content: `
      <div class="container-fluid px-0">
        <h1 class="h3 fw-bold mb-4" style="color: var(--text-primary);" data-en="Study Groups" data-ar="المجموعات الدراسية">Study Groups</h1>
        
        <div class="glass-panel rounded-4 p-0 overflow-hidden">
          <!-- Group Item -->
          <div class="p-4 group-card d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 border-bottom" style="border-color: var(--separator-color) !important;">
            <div>
              <h4 class="h6 fw-bold mb-1" style="color: var(--text-primary);" data-en="Physics Study Cohort A" data-ar="مجموعة الفيزياء أ">Physics Study Cohort A</h4>
              <p class="text-sm opacity-75 mb-0" data-en="Active discussions on thermodynamics." data-ar="نقاشات نشطة حول الديناميكا الحرارية.">Active discussions...</p>
            </div>
            <div class="d-flex align-items-center gap-4">
              <div class="avatar-stack">
                <img src="../assets/img/logo_backup.png" alt="User">
                <img src="../assets/img/logo_backup.png" alt="User">
                <img src="../assets/img/logo_backup.png" alt="User">
                <div class="rounded-circle border d-flex align-items-center justify-content-center text-xs fw-bold" style="width: 36px; height: 36px; background: var(--bg-secondary); margin-left: -12px; z-index: 1;">+12</div>
              </div>
              <button class="btn btn-glass border py-1 px-3 text-sm" data-en="Join Room" data-ar="انضم للغرفة">Join Room</button>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    name: 'academy-sessions.html',
    title: 'الجلسات والمحاضرات | Sessions',
    content: `
      <div class="container-fluid px-0">
        <h1 class="h3 fw-bold mb-4" style="color: var(--text-primary);" data-en="Live Sessions & Calendar" data-ar="الجلسات المباشرة والتقويم">Live Sessions & Calendar</h1>
        
        <div class="glass-panel rounded-4 p-4 p-md-5">
          <h4 class="h5 fw-bold mb-4" data-en="Today's Schedule" data-ar="جدول اليوم">Today's Schedule</h4>
          
          <!-- Timeline Item -->
          <div class="session-timeline pb-4">
            <div class="session-dot pulse-dot border-danger bg-danger"></div>
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
              <div>
                <span class="badge bg-danger mb-2">LIVE</span>
                <h5 class="fw-bold mb-1" style="color: var(--text-primary);" data-en="Organic Chemistry Revision" data-ar="مراجعة الكيمياء العضوية">Organic Chemistry Revision</h5>
                <p class="text-sm opacity-75 mb-0" data-en="Started 10 mins ago • Hall A" data-ar="بدأت منذ 10 دقائق • قاعة أ">Started 10 mins ago</p>
              </div>
              <button class="btn btn-luxury px-4 py-2" data-en="Join Now" data-ar="انضمام الآن">Join Now</button>
            </div>
          </div>

          <!-- Timeline Item -->
          <div class="session-timeline pb-4 border-0">
            <div class="session-dot"></div>
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
              <div>
                <span class="text-sm fw-bold" style="color: var(--accent-color);">14:00 PM</span>
                <h5 class="fw-bold mb-1 mt-1" style="color: var(--text-primary);" data-en="Math Problem Solving" data-ar="حل مسائل الرياضيات">Math Problem Solving</h5>
                <p class="text-sm opacity-75 mb-0" data-en="Dr. Sami • Hall B" data-ar="د. سامي • قاعة ب">Dr. Sami • Hall B</p>
              </div>
              <button class="btn btn-glass border px-4 py-2" disabled data-en="Waiting..." data-ar="في الانتظار...">Waiting...</button>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    name: 'academy-resources.html',
    title: 'الموارد التعليمية | Resources',
    content: `
      <div class="container-fluid px-0">
        <h1 class="h3 fw-bold mb-4" style="color: var(--text-primary);" data-en="Educational Resources" data-ar="الموارد التعليمية">Educational Resources</h1>
        
        <div class="glass-panel rounded-4 overflow-hidden">
          <div class="p-4 border-bottom d-flex justify-content-between align-items-center" style="border-color: var(--separator-color) !important;">
            <input type="text" class="form-control bg-transparent border-0 text-white w-50" placeholder="Search resources..." data-en="Search resources..." data-ar="ابحث في الموارد...">
            <button class="btn btn-glass icon-btn"><i class="bi bi-filter"></i></button>
          </div>

          <!-- File Item -->
          <div class="p-3 d-flex justify-content-between align-items-center resource-item cursor-pointer">
            <div class="d-flex align-items-center gap-3">
              <i class="bi bi-file-earmark-pdf-fill text-danger file-icon"></i>
              <div>
                <h6 class="mb-0 text-sm fw-bold" style="color: var(--text-primary);" data-en="Physics Formula Sheet.pdf" data-ar="ورقة قوانين الفيزياء.pdf">Physics Formula Sheet.pdf</h6>
                <span class="text-xs opacity-75" data-en="2.4 MB • Added 2 days ago" data-ar="2.4 ميجابايت • أضيف منذ يومين">2.4 MB</span>
              </div>
            </div>
            <button class="btn btn-glass icon-btn"><i class="bi bi-download text-primary"></i></button>
          </div>

          <!-- File Item -->
          <div class="p-3 d-flex justify-content-between align-items-center resource-item cursor-pointer border-0">
            <div class="d-flex align-items-center gap-3">
              <i class="bi bi-link-45deg text-info file-icon"></i>
              <div>
                <h6 class="mb-0 text-sm fw-bold" style="color: var(--text-primary);" data-en="External Reference: Khan Academy" data-ar="مرجع خارجي: أكاديمية خان">External Reference: Khan Academy</h6>
                <span class="text-xs opacity-75" data-en="Web Link" data-ar="رابط إلكتروني">Web Link</span>
              </div>
            </div>
            <button class="btn btn-glass icon-btn"><i class="bi bi-box-arrow-up-right text-primary"></i></button>
          </div>
        </div>
      </div>
    `
  }
];

pages.forEach(page => {
  let html = baseHtml;
  
  // Replace title
  html = html.replace(/<title>.*?<\/title>/, '<title>' + page.title + ' | Full Mark Academy</title>');
  
  // Replace Main Content
  html = html.replace(/<main class="dashboard-main[^>]*>[\s\S]*?<\/main>/i, '<main class="dashboard-main flex-1 d-flex flex-column">\n' + page.content + '\n</main>');
  
  // Inject custom CSS and JS
  const cssFile = page.name.replace('.html', '.css');
  const jsFile = page.name.replace('.html', '.js');
  
  // Add CSS before </head>
  html = html.replace('</head>', '  <link rel="stylesheet" href="../dashboard-assets/css/' + cssFile + '">\\n</head>');
  
  // Add JS before </body>
  html = html.replace('</body>', '  <script src="../dashboard-assets/js/' + jsFile + '"></script>\\n</body>');

  fs.writeFileSync(path.join(studentDir, page.name), html, 'utf8');
});

console.log('Academy specific pages generated successfully!');
