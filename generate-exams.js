const fs = require('fs');
const path = require('path');

const studentDir = path.join(__dirname, 'student');
const teacherDir = path.join(__dirname, 'teacher');
const cssDir = path.join(__dirname, 'dashboard-assets', 'css');
const jsDir = path.join(__dirname, 'dashboard-assets', 'js');

// 1. Update sidebars across all files to use real links for Exams
function updateSidebars(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
  files.forEach(file => {
    let html = fs.readFileSync(path.join(dir, file), 'utf8');
    // For student
    html = html.replace(/exams\.html#exams/g, 'exams-main.html');
    html = html.replace(/exams\.html#results/g, 'exams-results.html');
    html = html.replace(/exams\.html#assessments/g, 'exams-assessments.html');
    html = html.replace(/exams\.html#certificates/g, 'exams-certificates.html');
    fs.writeFileSync(path.join(dir, file), html, 'utf8');
  });
}
updateSidebars(studentDir);
updateSidebars(teacherDir); // (Teacher links are teacher-exams.html#..., I'll leave them if they don't match exactly)

// 2. CSS Content
const cssData = {
  'exams-main.css': `
.exam-card { transition: all 0.3s ease; position: relative; overflow: hidden; }
.exam-card::before { content: ''; position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: var(--separator-color); transition: background 0.3s; }
[dir="rtl"] .exam-card::before { left: auto; right: 0; }
.exam-card:hover::before { background: var(--accent-color); }
.exam-card:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
.timer-pill { background: rgba(255, 71, 87, 0.1); color: #ff4757; border: 1px solid rgba(255, 71, 87, 0.2); }
`,
  'exams-results.css': `
.result-row { transition: background 0.2s; border-bottom: 1px solid var(--separator-color); }
.result-row:hover { background: rgba(197, 168, 128, 0.05); }
.grade-circle { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.1rem; }
.grade-a { background: rgba(46, 204, 113, 0.1); color: #2ecc71; border: 2px solid #2ecc71; }
.grade-b { background: rgba(241, 196, 15, 0.1); color: #f1c40f; border: 2px solid #f1c40f; }
.grade-c { background: rgba(230, 126, 34, 0.1); color: #e67e22; border: 2px solid #e67e22; }
`,
  'exams-assessments.css': `
.assessment-card { border-left: 3px solid var(--accent-color); background: linear-gradient(90deg, rgba(197,168,128,0.05) 0%, transparent 100%); }
[dir="rtl"] .assessment-card { border-left: none; border-right: 3px solid var(--accent-color); background: linear-gradient(-90deg, rgba(197,168,128,0.05) 0%, transparent 100%); }
.feedback-bubble { background: var(--bg-secondary); border-radius: 0 12px 12px 12px; padding: 12px 16px; border: 1px solid var(--separator-color); position: relative; }
[dir="rtl"] .feedback-bubble { border-radius: 12px 0 12px 12px; }
`,
  'exams-certificates.css': `
.certificate-card { 
  background: var(--bg-secondary); 
  border: 1px solid var(--separator-color); 
  position: relative; 
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.certificate-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(197,168,128,0) 0%, rgba(197,168,128,0.1) 100%);
  opacity: 0;
  transition: opacity 0.4s;
  pointer-events: none;
}
.certificate-card:hover { transform: translateY(-5px); border-color: var(--accent-color); box-shadow: 0 15px 30px rgba(197,168,128,0.15); }
.certificate-card:hover::after { opacity: 1; }
.cert-icon { font-size: 3rem; background: var(--accent-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
`
};

for (const [file, content] of Object.entries(cssData)) {
  fs.writeFileSync(path.join(cssDir, file), content, 'utf8');
}

// 3. JS Content
const jsData = {
  'exams-main.js': `// Exams main logic`,
  'exams-results.js': `// Results logic`,
  'exams-assessments.js': `// Assessments logic`,
  'exams-certificates.js': `// Certificates logic`
};

for (const [file, content] of Object.entries(jsData)) {
  fs.writeFileSync(path.join(jsDir, file), content, 'utf8');
}

// 4. HTML Content Generation
const baseHtml = fs.readFileSync(path.join(studentDir, 'dashboard.html'), 'utf8');

const pages = [
  {
    name: 'exams-main.html',
    title: 'الامتحانات | Exams',
    content: `
      <div class="container-fluid px-0">
        <div class="d-flex justify-content-between align-items-end mb-4">
          <div>
            <h1 class="h3 fw-bold mb-1" style="color: var(--text-primary);" data-en="Upcoming & Active Exams" data-ar="الامتحانات القادمة والنشطة">Upcoming & Active Exams</h1>
            <p class="text-sm opacity-75 mb-0" data-en="Prepare well for your scheduled evaluations." data-ar="استعد جيداً لاختباراتك المجدولة.">Prepare well for your scheduled evaluations.</p>
          </div>
        </div>

        <div class="row g-4">
          <!-- Active Exam -->
          <div class="col-12">
            <h4 class="h5 fw-bold mb-3" style="color: #ff4757;" data-en="Active Now" data-ar="نشط الآن">Active Now</h4>
            <div class="glass-panel rounded-4 p-4 exam-card border border-danger shadow-sm">
              <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                <div class="d-flex align-items-center gap-4">
                  <div class="p-3 rounded-circle d-flex align-items-center justify-content-center" style="background: rgba(255, 71, 87, 0.1); width: 64px; height: 64px;">
                    <i class="bi bi-file-earmark-code fs-2 text-danger"></i>
                  </div>
                  <div>
                    <h3 class="h5 fw-bold mb-1" style="color: var(--text-primary);" data-en="Physics Midterm" data-ar="امتحان الفيزياء النصفي">Physics Midterm</h3>
                    <p class="text-sm opacity-75 mb-2" data-en="Dr. Sami Yousef • 40 Questions • Multiple Choice" data-ar="د. سامي يوسف • 40 سؤال • اختيار من متعدد">Dr. Sami Yousef • 40 Questions</p>
                    <span class="badge timer-pill px-3 py-1 rounded-pill"><i class="bi bi-clock me-1"></i> <span data-en="Time remaining: 45:12" data-ar="الوقت المتبقي: 45:12">Time remaining: 45:12</span></span>
                  </div>
                </div>
                <button class="btn btn-luxury px-4 py-2 fw-bold" data-en="Enter Exam" data-ar="دخول الامتحان">Enter Exam</button>
              </div>
            </div>
          </div>

          <!-- Upcoming Exams -->
          <div class="col-12 mt-5">
            <h4 class="h5 fw-bold mb-3" style="color: var(--text-primary);" data-en="Upcoming Exams" data-ar="الامتحانات القادمة">Upcoming Exams</h4>
            
            <div class="d-flex flex-column gap-3">
              <!-- Item 1 -->
              <div class="glass-panel rounded-3 p-3 exam-card d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                <div class="d-flex align-items-center gap-3">
                  <div class="text-center px-3 border-end" style="border-color: var(--separator-color) !important;">
                    <span class="d-block fs-4 fw-bold" style="color: var(--accent-color);">15</span>
                    <span class="d-block text-xs opacity-75" data-en="OCT" data-ar="أكتوبر">OCT</span>
                  </div>
                  <div>
                    <h6 class="fw-bold mb-1" style="color: var(--text-primary);" data-en="Mathematics Quiz 2" data-ar="اختبار الرياضيات القصير 2">Mathematics Quiz 2</h6>
                    <span class="text-xs opacity-75" data-en="Calculus Chapter 3" data-ar="التفاضل والتكامل الفصل 3">Calculus Chapter 3</span>
                  </div>
                </div>
                <button class="btn btn-glass border px-3 py-1 text-sm" disabled data-en="Starts in 2 days" data-ar="يبدأ بعد يومين">Starts in 2 days</button>
              </div>

              <!-- Item 2 -->
              <div class="glass-panel rounded-3 p-3 exam-card d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                <div class="d-flex align-items-center gap-3">
                  <div class="text-center px-3 border-end" style="border-color: var(--separator-color) !important;">
                    <span class="d-block fs-4 fw-bold" style="color: var(--text-secondary);">22</span>
                    <span class="d-block text-xs opacity-75" data-en="OCT" data-ar="أكتوبر">OCT</span>
                  </div>
                  <div>
                    <h6 class="fw-bold mb-1" style="color: var(--text-primary);" data-en="English Final Exam" data-ar="امتحان اللغة الإنجليزية النهائي">English Final Exam</h6>
                    <span class="text-xs opacity-75" data-en="Grammar & Literature" data-ar="القواعد والأدب">Grammar & Literature</span>
                  </div>
                </div>
                <button class="btn btn-glass border px-3 py-1 text-sm" disabled data-en="Upcoming" data-ar="قادم">Upcoming</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    name: 'exams-results.html',
    title: 'النتائج | Results',
    content: `
      <div class="container-fluid px-0">
        <h1 class="h3 fw-bold mb-4" style="color: var(--text-primary);" data-en="Exam Results & Grades" data-ar="نتائج الامتحانات والعلامات">Exam Results & Grades</h1>
        
        <!-- Summary Cards -->
        <div class="row g-4 mb-4">
          <div class="col-md-4">
            <div class="glass-panel rounded-4 p-4 text-center glow-card">
              <span class="d-block text-sm opacity-75 mb-2" data-en="Overall Average" data-ar="المعدل العام">Overall Average</span>
              <h2 class="display-5 fw-bold mb-0" style="color: var(--text-primary);">94.5%</h2>
            </div>
          </div>
          <div class="col-md-4">
            <div class="glass-panel rounded-4 p-4 text-center glow-card">
              <span class="d-block text-sm opacity-75 mb-2" data-en="Exams Taken" data-ar="الامتحانات المنجزة">Exams Taken</span>
              <h2 class="display-5 fw-bold mb-0" style="color: var(--text-primary);">12</h2>
            </div>
          </div>
          <div class="col-md-4">
            <div class="glass-panel rounded-4 p-4 text-center glow-card">
              <span class="d-block text-sm opacity-75 mb-2" data-en="Class Rank" data-ar="الترتيب على الصف">Class Rank</span>
              <h2 class="display-5 fw-bold mb-0" style="color: var(--accent-color);">3rd</h2>
            </div>
          </div>
        </div>

        <div class="glass-panel rounded-4 overflow-hidden">
          <div class="p-4 border-bottom bg-black/5" style="border-color: var(--separator-color) !important;">
            <h5 class="fw-bold mb-0" data-en="Recent Results" data-ar="النتائج الأخيرة">Recent Results</h5>
          </div>
          
          <div class="p-0">
            <!-- Row 1 -->
            <div class="p-3 d-flex justify-content-between align-items-center result-row">
              <div>
                <h6 class="mb-1 fw-bold" style="color: var(--text-primary);" data-en="Biology Quiz 1" data-ar="اختبار الأحياء 1">Biology Quiz 1</h6>
                <span class="text-xs opacity-75" data-en="Taken on Oct 1, 2023" data-ar="تم التقديم في 1 أكتوبر 2023">Taken on Oct 1, 2023</span>
              </div>
              <div class="d-flex align-items-center gap-4">
                <span class="text-sm fw-bold">18 / 20</span>
                <div class="grade-circle grade-a">A</div>
              </div>
            </div>

            <!-- Row 2 -->
            <div class="p-3 d-flex justify-content-between align-items-center result-row">
              <div>
                <h6 class="mb-1 fw-bold" style="color: var(--text-primary);" data-en="Chemistry Midterm" data-ar="امتحان الكيمياء النصفي">Chemistry Midterm</h6>
                <span class="text-xs opacity-75" data-en="Taken on Sep 28, 2023" data-ar="تم التقديم في 28 سبتمبر 2023">Taken on Sep 28, 2023</span>
              </div>
              <div class="d-flex align-items-center gap-4">
                <span class="text-sm fw-bold">85 / 100</span>
                <div class="grade-circle grade-b">B</div>
              </div>
            </div>
            
            <!-- Row 3 -->
            <div class="p-3 d-flex justify-content-between align-items-center result-row">
              <div>
                <h6 class="mb-1 fw-bold" style="color: var(--text-primary);" data-en="Physics Assignment" data-ar="واجب الفيزياء">Physics Assignment</h6>
                <span class="text-xs opacity-75" data-en="Taken on Sep 15, 2023" data-ar="تم التقديم في 15 سبتمبر 2023">Taken on Sep 15, 2023</span>
              </div>
              <div class="d-flex align-items-center gap-4">
                <span class="text-sm fw-bold">7 / 10</span>
                <div class="grade-circle grade-c">C</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    name: 'exams-assessments.html',
    title: 'التقييمات | Assessments',
    content: `
      <div class="container-fluid px-0">
        <h1 class="h3 fw-bold mb-4" style="color: var(--text-primary);" data-en="Teacher Assessments & Feedback" data-ar="تقييمات وملاحظات المعلمين">Teacher Assessments & Feedback</h1>
        
        <div class="d-flex flex-column gap-4">
          <!-- Assessment Item -->
          <div class="glass-panel rounded-4 p-4 assessment-card">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <div class="d-flex align-items-center gap-3">
                <img src="../assets/img/logo_backup.png" class="rounded-circle" style="width: 48px; height: 48px; border: 2px solid var(--accent-color);" alt="Teacher">
                <div>
                  <h5 class="fw-bold mb-0" style="color: var(--text-primary);" data-en="Dr. Sami Yousef" data-ar="د. سامي يوسف">Dr. Sami Yousef</h5>
                  <span class="text-xs opacity-75" data-en="Mathematics Teacher" data-ar="مدرس الرياضيات">Mathematics Teacher</span>
                </div>
              </div>
              <span class="text-xs opacity-75" data-en="2 days ago" data-ar="منذ يومين">2 days ago</span>
            </div>
            
            <div class="feedback-bubble mb-3">
              <p class="text-sm mb-0" data-en="Ahmad is doing a great job in Calculus. He participates actively and asks insightful questions. Keep up the excellent analytical work!" data-ar="أحمد يقدم أداءً رائعاً في التفاضل والتكامل. يشارك بنشاط ويطرح أسئلة ذكية. واصل هذا العمل التحليلي الممتاز!">Ahmad is doing a great job in Calculus. He participates actively and asks insightful questions.</p>
            </div>
            
            <div class="d-flex gap-2">
              <span class="badge bg-success bg-opacity-25 text-success"><i class="bi bi-star-fill me-1"></i> <span data-en="Excellent Participation" data-ar="مشاركة ممتازة">Excellent Participation</span></span>
              <span class="badge bg-info bg-opacity-25 text-info"><i class="bi bi-lightbulb-fill me-1"></i> <span data-en="Quick Learner" data-ar="سريع التعلم">Quick Learner</span></span>
            </div>
          </div>

          <!-- Assessment Item -->
          <div class="glass-panel rounded-4 p-4 assessment-card" style="border-color: var(--text-secondary);">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <div class="d-flex align-items-center gap-3">
                <img src="../assets/img/logo_backup.png" class="rounded-circle grayscale" style="width: 48px; height: 48px; border: 2px solid var(--separator-color);" alt="Teacher">
                <div>
                  <h5 class="fw-bold mb-0" style="color: var(--text-primary);" data-en="Mr. Khaled" data-ar="أ. خالد">Mr. Khaled</h5>
                  <span class="text-xs opacity-75" data-en="English Teacher" data-ar="مدرس اللغة الإنجليزية">English Teacher</span>
                </div>
              </div>
              <span class="text-xs opacity-75" data-en="1 week ago" data-ar="منذ أسبوع">1 week ago</span>
            </div>
            
            <div class="feedback-bubble mb-3">
              <p class="text-sm mb-0" data-en="Good progress overall, but needs to focus more on essay writing structure. I recommend reviewing chapter 4 notes." data-ar="تقدم جيد بشكل عام، لكن يحتاج إلى التركيز أكثر على بنية كتابة المقالات. أوصي بمراجعة ملاحظات الفصل الرابع.">Good progress overall, but needs to focus more on essay writing structure.</p>
            </div>
            
            <div class="d-flex gap-2">
              <span class="badge bg-warning bg-opacity-25 text-warning"><i class="bi bi-pencil-fill me-1"></i> <span data-en="Needs Writing Practice" data-ar="يحتاج تدريب كتابي">Needs Writing Practice</span></span>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    name: 'exams-certificates.html',
    title: 'الشهادات | Certificates',
    content: `
      <div class="container-fluid px-0">
        <div class="d-flex justify-content-between align-items-end mb-4">
          <div>
            <h1 class="h3 fw-bold mb-1" style="color: var(--text-primary);" data-en="My Certificates" data-ar="شهاداتي">My Certificates</h1>
            <p class="text-sm opacity-75 mb-0" data-en="View and download your earned credentials." data-ar="عرض وتحميل اعتماداتك وشهاداتك المكتسبة.">View and download your earned credentials.</p>
          </div>
        </div>
        
        <div class="row g-4">
          <!-- Certificate 1 -->
          <div class="col-md-6 col-lg-4">
            <div class="rounded-4 p-4 text-center certificate-card">
              <div class="mb-3">
                <i class="bi bi-patch-check-fill cert-icon"></i>
              </div>
              <h5 class="fw-bold mb-1" style="color: var(--text-primary);" data-en="English Level B2" data-ar="مستوى اللغة الإنجليزية B2">English Level B2</h5>
              <p class="text-xs opacity-75 mb-3" data-en="Issued: Aug 2023" data-ar="تاريخ الإصدار: أغسطس 2023">Issued: Aug 2023</p>
              
              <div class="d-flex gap-2 justify-content-center">
                <button class="btn btn-luxury px-3 py-1 text-sm"><i class="bi bi-download me-1"></i> <span data-en="Download PDF" data-ar="تحميل PDF">Download PDF</span></button>
              </div>
            </div>
          </div>

          <!-- Certificate 2 -->
          <div class="col-md-6 col-lg-4">
            <div class="rounded-4 p-4 text-center certificate-card">
              <div class="mb-3">
                <i class="bi bi-award-fill cert-icon"></i>
              </div>
              <h5 class="fw-bold mb-1" style="color: var(--text-primary);" data-en="Physics Honors" data-ar="شرف الفيزياء">Physics Honors</h5>
              <p class="text-xs opacity-75 mb-3" data-en="Issued: Jun 2023" data-ar="تاريخ الإصدار: يونيو 2023">Issued: Jun 2023</p>
              
              <div class="d-flex gap-2 justify-content-center">
                <button class="btn btn-luxury px-3 py-1 text-sm"><i class="bi bi-download me-1"></i> <span data-en="Download PDF" data-ar="تحميل PDF">Download PDF</span></button>
              </div>
            </div>
          </div>
          
          <!-- Locked Certificate -->
          <div class="col-md-6 col-lg-4">
            <div class="rounded-4 p-4 text-center certificate-card opacity-50" style="filter: grayscale(1);">
              <div class="mb-3">
                <i class="bi bi-lock-fill cert-icon text-muted" style="background: none; color: var(--text-secondary) !important;"></i>
              </div>
              <h5 class="fw-bold mb-1" style="color: var(--text-primary);" data-en="Calculus Mastery" data-ar="إتقان التفاضل والتكامل">Calculus Mastery</h5>
              <p class="text-xs opacity-75 mb-3" data-en="Complete final exam to unlock" data-ar="أكمل الامتحان النهائي لفتح الشهادة">Complete final exam to unlock</p>
            </div>
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
  html = html.replace('</head>', '  <link rel="stylesheet" href="../dashboard-assets/css/' + cssFile + '">\n</head>');
  
  // Add JS before </body>
  html = html.replace('</body>', '  <script src="../dashboard-assets/js/' + jsFile + '"></script>\n</body>');

  fs.writeFileSync(path.join(studentDir, page.name), html, 'utf8');
});

console.log('Exams specific pages generated successfully!');
