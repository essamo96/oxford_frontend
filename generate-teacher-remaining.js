const fs = require('fs');
const path = require('path');

const teacherDir = path.join(__dirname, 'teacher');
const cssDir = path.join(__dirname, 'dashboard-assets', 'css');
const jsDir = path.join(__dirname, 'dashboard-assets', 'js');

// 1. Update sidebars across all teacher files
function updateTeacherSidebars() {
  if (!fs.existsSync(teacherDir)) return;
  const files = fs.readdirSync(teacherDir).filter(f => f.endsWith('.html'));
  files.forEach(file => {
    let html = fs.readFileSync(path.join(teacherDir, file), 'utf8');
    
    // Sessions
    html = html.replace(/sessions\.html#upcoming/g, 'teacher-sessions-upcoming.html');
    html = html.replace(/sessions\.html#live/g, 'teacher-sessions-live.html');
    html = html.replace(/sessions\.html#create/g, 'teacher-sessions-create.html');
    html = html.replace(/sessions\.html#archive/g, 'teacher-sessions-archive.html');
    
    // Exams
    html = html.replace(/exams\.html#tests/g, 'teacher-exams-tests.html');
    html = html.replace(/exams\.html#grading/g, 'teacher-exams-grading.html');
    html = html.replace(/exams\.html#scores/g, 'teacher-exams-scores.html');
    html = html.replace(/exams\.html#surveys/g, 'teacher-exams-surveys.html');
    
    // Reports
    html = html.replace(/reports\.html/g, 'teacher-reports.html');
    
    // Comm
    html = html.replace(/comm-messages\.html/g, 'teacher-comm-messages.html');
    html = html.replace(/comm-announcements\.html/g, 'teacher-comm-announcements.html');
    html = html.replace(/communication\.html#mass/g, 'teacher-comm-mass.html');
    
    // Profile
    html = html.replace(/profile-settings\.html/g, 'teacher-profile-settings.html');
    html = html.replace(/profile\.html#resume/g, 'teacher-profile-resume.html');
    html = html.replace(/profile\.html#settings/g, 'teacher-profile-config.html');
    
    fs.writeFileSync(path.join(teacherDir, file), html, 'utf8');
  });
}
updateTeacherSidebars();

// 2. CSS Content
const cssData = {
  // Sessions
  'teacher-sessions-upcoming.css': `
.session-card { transition: all 0.3s; border-left: 3px solid var(--separator-color); }
[dir="rtl"] .session-card { border-left: none; border-right: 3px solid var(--separator-color); }
.session-card:hover { border-color: var(--accent-color); background: rgba(197, 168, 128, 0.05); }
`,
  'teacher-sessions-live.css': `
.live-pulse-dot { width: 12px; height: 12px; background-color: #ff4757; border-radius: 50%; display: inline-block; animation: pulse-live 1.5s infinite; }
@keyframes pulse-live { 0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 71, 87, 0.7); } 70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(255, 71, 87, 0); } 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 71, 87, 0); } }
.room-control-btn { width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; transition: all 0.2s; background: var(--bg-secondary); border: 1px solid var(--separator-color); }
.room-control-btn:hover { background: rgba(197, 168, 128, 0.1); border-color: var(--accent-color); color: var(--accent-color); }
`,
  'teacher-sessions-create.css': `
.session-form input, .session-form select, .session-form textarea { background: rgba(0,0,0,0.2) !important; border-color: var(--separator-color) !important; color: var(--text-primary) !important; }
.session-form input:focus, .session-form select:focus, .session-form textarea:focus { border-color: var(--accent-color) !important; box-shadow: none !important; }
`,
  'teacher-sessions-archive.css': `
.archive-row { border-bottom: 1px solid var(--separator-color); transition: background 0.2s; }
.archive-row:hover { background: rgba(197, 168, 128, 0.05); }
`,

  // Exams
  'teacher-exams-tests.css': `
.test-card { border: 1px solid var(--separator-color); transition: all 0.3s; }
.test-card:hover { border-color: var(--accent-color); transform: translateY(-3px); }
.status-published { background: rgba(46, 204, 113, 0.1); color: #2ecc71; border: 1px solid #2ecc71; }
.status-draft { background: rgba(241, 196, 15, 0.1); color: #f1c40f; border: 1px solid #f1c40f; }
`,
  'teacher-exams-grading.css': `
.grading-queue-item { border-left: 4px solid var(--accent-color); background: linear-gradient(90deg, rgba(197,168,128,0.1) 0%, transparent 100%); }
[dir="rtl"] .grading-queue-item { border-left: none; border-right: 4px solid var(--accent-color); background: linear-gradient(-90deg, rgba(197,168,128,0.1) 0%, transparent 100%); }
`,
  'teacher-exams-scores.css': `
.score-badge { width: 45px; height: 45px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; }
`,
  'teacher-exams-surveys.css': `
.survey-card { transition: all 0.3s; }
.survey-card:hover { box-shadow: 0 10px 20px rgba(0,0,0,0.1); border-color: var(--accent-color); }
`,

  // Reports
  'teacher-reports.css': `
.report-stat { border-top: 2px solid var(--accent-color); }
.chart-container { height: 300px; border: 1px dashed var(--separator-color); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--text-secondary); }
`,

  // Communication
  'teacher-comm-messages.css': `
.chat-container { height: calc(100vh - 180px); display: flex; overflow: hidden; border: 1px solid var(--separator-color); }
.chat-sidebar { width: 300px; border-right: 1px solid var(--separator-color); overflow-y: auto; }
[dir="rtl"] .chat-sidebar { border-right: none; border-left: 1px solid var(--separator-color); }
.chat-user-item { cursor: pointer; transition: background 0.2s; padding: 12px; border-bottom: 1px solid var(--separator-color); }
.chat-user-item:hover, .chat-user-item.active { background: rgba(197, 168, 128, 0.1); }
.chat-area { flex: 1; display: flex; flex-direction: column; }
.chat-messages { flex: 1; overflow-y: auto; padding: 20px; }
.message-bubble { max-width: 70%; padding: 12px 16px; border-radius: 12px; margin-bottom: 12px; }
.message-bubble.sent { background: var(--accent-gradient); color: white; align-self: flex-end; border-bottom-right-radius: 0; }
[dir="rtl"] .message-bubble.sent { border-bottom-right-radius: 12px; border-bottom-left-radius: 0; }
.message-bubble.received { background: var(--bg-secondary); border: 1px solid var(--separator-color); align-self: flex-start; border-bottom-left-radius: 0; }
[dir="rtl"] .message-bubble.received { border-bottom-left-radius: 12px; border-bottom-right-radius: 0; }
`,
  'teacher-comm-announcements.css': `
.announcement-card { position: relative; overflow: hidden; transition: all 0.3s; }
.announcement-card::after { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: var(--accent-gradient); }
.announcement-card:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,0,0,0.15); }
`,
  'teacher-comm-mass.css': `
.audience-selector { transition: all 0.2s; cursor: pointer; border: 1px solid var(--separator-color); }
.audience-selector:hover, .audience-selector.active { border-color: var(--accent-color); background: rgba(197,168,128,0.05); }
`,

  // Profile
  'teacher-profile-settings.css': `
.profile-header { background: linear-gradient(135deg, rgba(197,168,128,0.2) 0%, transparent 100%); border-bottom: 1px solid var(--separator-color); }
.profile-avatar-wrapper { width: 120px; height: 120px; border-radius: 50%; padding: 4px; border: 2px dashed var(--accent-color); position: relative; }
.edit-avatar-btn { position: absolute; bottom: 0; right: 0; background: var(--accent-color); color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; }
[dir="rtl"] .edit-avatar-btn { right: auto; left: 0; }
`,
  'teacher-profile-resume.css': `
.cert-item { border: 1px solid var(--separator-color); transition: all 0.2s; }
.cert-item:hover { border-color: var(--accent-color); background: rgba(197,168,128,0.05); }
`,
  'teacher-profile-config.css': `
.setting-row { padding: 16px 0; border-bottom: 1px solid var(--separator-color); display: flex; justify-content: space-between; align-items: center; }
.form-switch .form-check-input { width: 3em; height: 1.5em; cursor: pointer; }
.form-switch .form-check-input:checked { background-color: var(--accent-color); border-color: var(--accent-color); }
`
};

for (const [file, content] of Object.entries(cssData)) {
  fs.writeFileSync(path.join(cssDir, file), content, 'utf8');
}

// 3. JS Content (Minimal placeholder logic)
const jsData = {
  'teacher-sessions-upcoming.js': '', 'teacher-sessions-live.js': '', 'teacher-sessions-create.js': '', 'teacher-sessions-archive.js': '',
  'teacher-exams-tests.js': '', 'teacher-exams-grading.js': '', 'teacher-exams-scores.js': '', 'teacher-exams-surveys.js': '',
  'teacher-reports.js': '',
  'teacher-comm-messages.js': '', 'teacher-comm-announcements.js': '', 'teacher-comm-mass.js': '',
  'teacher-profile-settings.js': '', 'teacher-profile-resume.js': '', 'teacher-profile-config.js': ''
};

for (const [file, content] of Object.entries(jsData)) {
  fs.writeFileSync(path.join(jsDir, file), content, 'utf8');
}

// 4. HTML Content Generation
const baseHtml = fs.readFileSync(path.join(teacherDir, 'dashboard.html'), 'utf8');

const pages = [
  // ================= SESSIONS =================
  {
    name: 'teacher-sessions-upcoming.html', title: 'الجلسات القادمة | Upcoming',
    content: `
      <div class="container-fluid px-0">
        <h1 class="h3 fw-bold mb-4" style="color: var(--text-primary);" data-en="Upcoming Sessions" data-ar="الجلسات القادمة">Upcoming Sessions</h1>
        
        <div class="d-flex flex-column gap-3">
          <div class="glass-panel rounded-3 p-4 session-card d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div class="d-flex align-items-center gap-3">
              <div class="p-3 rounded-circle" style="background: rgba(197, 168, 128, 0.1); color: var(--accent-color);"><i class="bi bi-camera-video fs-4"></i></div>
              <div>
                <h6 class="fw-bold mb-1" style="color: var(--text-primary);" data-en="Calculus Live Q&A" data-ar="جلسة تفاضل وتكامل (أسئلة وأجوبة)">Calculus Live Q&A</h6>
                <span class="text-xs opacity-75">Today • 10:00 AM - 11:30 AM</span>
              </div>
            </div>
            <div class="d-flex gap-2">
              <button class="btn btn-luxury px-4 py-2" data-en="Prepare Room" data-ar="تجهيز القاعة">Prepare Room</button>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    name: 'teacher-sessions-live.html', title: 'الجلسة المباشرة | Live Room',
    content: `
      <div class="container-fluid px-0 h-100">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 class="h3 fw-bold mb-1" style="color: var(--text-primary);">
              <span class="live-pulse-dot me-2"></span><span data-en="Live: Calculus Q&A" data-ar="مباشر: أسئلة تفاضل وتكامل">Live: Calculus Q&A</span>
            </h1>
            <span class="text-sm opacity-75">45 Students Connected</span>
          </div>
          <button class="btn btn-danger px-4 py-2 fw-bold" data-en="End Broadcast" data-ar="إنهاء البث">End Broadcast</button>
        </div>
        
        <div class="row g-4">
          <div class="col-lg-8">
            <div class="glass-panel rounded-4 p-0 overflow-hidden" style="aspect-ratio: 16/9; background: #000; position: relative;">
              <!-- Video Placeholder -->
              <div class="d-flex flex-column align-items-center justify-content-center h-100 text-white opacity-50">
                <i class="bi bi-camera-video-off fs-1 mb-3"></i>
                <span data-en="Camera is OFF" data-ar="الكاميرا مغلقة">Camera is OFF</span>
              </div>
              
              <!-- Controls -->
              <div class="position-absolute bottom-0 w-100 p-3 d-flex justify-content-center gap-3" style="background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%);">
                <button class="room-control-btn"><i class="bi bi-mic-mute"></i></button>
                <button class="room-control-btn"><i class="bi bi-camera-video-off"></i></button>
                <button class="room-control-btn"><i class="bi bi-display"></i></button>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="glass-panel rounded-4 p-3 h-100 d-flex flex-column">
              <h6 class="fw-bold mb-3 border-bottom pb-2" style="border-color: var(--separator-color) !important;" data-en="Live Chat" data-ar="المحادثة المباشرة">Live Chat</h6>
              <div class="flex-1 overflow-auto d-flex flex-column justify-content-end mb-3" style="min-height: 200px;">
                <div class="mb-2">
                  <span class="fw-bold text-xs" style="color: var(--accent-color);">Ahmad:</span>
                  <span class="text-sm opacity-75">Can we review question 4?</span>
                </div>
              </div>
              <input type="text" class="form-control bg-transparent border text-white" style="border-color: var(--separator-color);" placeholder="Type..." data-en="Type..." data-ar="اكتب...">
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    name: 'teacher-sessions-create.html', title: 'إنشاء جلسة | Create Session',
    content: `
      <div class="container-fluid px-0">
        <h1 class="h3 fw-bold mb-4" style="color: var(--text-primary);" data-en="Create New Session" data-ar="إنشاء جلسة جديدة">Create New Session</h1>
        
        <div class="glass-panel rounded-4 p-4 p-md-5">
          <form class="session-form row g-4">
            <div class="col-md-12">
              <label class="form-label text-sm opacity-75" data-en="Session Title" data-ar="عنوان الجلسة">Session Title</label>
              <input type="text" class="form-control p-3">
            </div>
            <div class="col-md-6">
              <label class="form-label text-sm opacity-75" data-en="Course" data-ar="المادة التعليمية">Course</label>
              <select class="form-select p-3">
                <option>Advanced Calculus</option>
                <option>Physics Fundamentals</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label text-sm opacity-75" data-en="Target Audience" data-ar="الجمهور المستهدف">Target Audience</label>
              <select class="form-select p-3">
                <option>All Enrolled Students</option>
                <option>Group A Only</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label text-sm opacity-75" data-en="Date" data-ar="التاريخ">Date</label>
              <input type="date" class="form-control p-3">
            </div>
            <div class="col-md-6">
              <label class="form-label text-sm opacity-75" data-en="Time" data-ar="الوقت">Time</label>
              <input type="time" class="form-control p-3">
            </div>
            <div class="col-12 text-end mt-4">
              <button class="btn btn-luxury px-5 py-3 fw-bold" data-en="Schedule Session" data-ar="جدولة الجلسة">Schedule Session</button>
            </div>
          </form>
        </div>
      </div>
    `
  },
  {
    name: 'teacher-sessions-archive.html', title: 'الأرشيف | Archive',
    content: `
      <div class="container-fluid px-0">
        <h1 class="h3 fw-bold mb-4" style="color: var(--text-primary);" data-en="Sessions Archive" data-ar="أرشيف الجلسات">Sessions Archive</h1>
        
        <div class="glass-panel rounded-4 overflow-hidden p-0">
          <div class="p-4 d-flex justify-content-between align-items-center archive-row">
            <div>
              <h6 class="fw-bold mb-1" style="color: var(--text-primary);">Integration by Parts - Recap</h6>
              <span class="text-xs opacity-75">Oct 5, 2023 • Duration: 1h 20m</span>
            </div>
            <button class="btn btn-glass border py-1 px-3 text-sm" data-en="View Recording" data-ar="عرض التسجيل">View Recording</button>
          </div>
        </div>
      </div>
    `
  },

  // ================= EXAMS & ASSESSMENTS =================
  {
    name: 'teacher-exams-tests.html', title: 'إدارة الامتحانات | Tests Management',
    content: `
      <div class="container-fluid px-0">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h1 class="h3 fw-bold mb-0" style="color: var(--text-primary);" data-en="Tests Management" data-ar="إدارة الامتحانات">Tests Management</h1>
          <button class="btn btn-luxury px-4 py-2 text-sm"><i class="bi bi-plus-lg me-2"></i><span data-en="Create Exam" data-ar="إنشاء امتحان">Create Exam</span></button>
        </div>
        
        <div class="row g-4">
          <div class="col-md-6">
            <div class="glass-panel rounded-4 p-4 test-card">
              <div class="d-flex justify-content-between align-items-start mb-3">
                <h5 class="fw-bold mb-1" style="color: var(--text-primary);">Physics Midterm</h5>
                <span class="badge status-published px-3 py-1 rounded-pill" data-en="Published" data-ar="منشور">Published</span>
              </div>
              <p class="text-sm opacity-75 mb-4">Scheduled for Oct 20, 2023. 40 Multiple Choice Questions.</p>
              <div class="d-flex gap-2">
                <button class="btn btn-glass border py-2 px-3 text-sm" data-en="Edit Questions" data-ar="تعديل الأسئلة">Edit Questions</button>
                <button class="btn btn-glass border py-2 px-3 text-sm" data-en="Settings" data-ar="الإعدادات">Settings</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    name: 'teacher-exams-grading.html', title: 'التصحيح | Grading',
    content: `
      <div class="container-fluid px-0">
        <h1 class="h3 fw-bold mb-4" style="color: var(--text-primary);" data-en="Manual Grading Queue" data-ar="طابور التصحيح اليدوي">Manual Grading Queue</h1>
        
        <div class="glass-panel rounded-4 overflow-hidden p-0">
          <div class="p-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center border-bottom grading-queue-item" style="border-bottom-color: var(--separator-color) !important;">
            <div>
              <h6 class="fw-bold mb-1" style="color: var(--text-primary);">Calculus Essay Assignment</h6>
              <span class="text-xs opacity-75">Student: Ahmad Ali • Submitted 2 hrs ago</span>
            </div>
            <button class="btn btn-luxury px-4 py-2 mt-3 mt-md-0" data-en="Grade Now" data-ar="قيّم الآن">Grade Now</button>
          </div>
        </div>
      </div>
    `
  },
  {
    name: 'teacher-exams-scores.html', title: 'الدرجات | Scores',
    content: `
      <div class="container-fluid px-0">
        <h1 class="h3 fw-bold mb-4" style="color: var(--text-primary);" data-en="Exam Scores" data-ar="درجات الامتحانات">Exam Scores</h1>
        
        <div class="glass-panel rounded-4 p-4">
          <div class="table-responsive">
            <table class="table table-dark mb-0 align-middle" style="--bs-table-bg: transparent;">
              <thead>
                <tr style="border-bottom: 2px solid var(--separator-color);">
                  <th class="py-3 text-xs opacity-75" data-en="Student" data-ar="الطالب">Student</th>
                  <th class="py-3 text-xs opacity-75" data-en="Physics Midterm" data-ar="نصفي الفيزياء">Physics Midterm</th>
                  <th class="py-3 text-xs opacity-75" data-en="Math Quiz" data-ar="اختبار الرياضيات">Math Quiz</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-color: var(--separator-color);">
                  <td class="py-3">Ahmad Ali</td>
                  <td class="py-3"><div class="score-badge bg-success bg-opacity-25 text-success">95</div></td>
                  <td class="py-3"><div class="score-badge bg-success bg-opacity-25 text-success">100</div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `
  },
  {
    name: 'teacher-exams-surveys.html', title: 'الاستبيانات | Surveys',
    content: `
      <div class="container-fluid px-0">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h1 class="h3 fw-bold mb-0" style="color: var(--text-primary);" data-en="Course Surveys" data-ar="استبيانات المادة">Course Surveys</h1>
          <button class="btn btn-glass border py-2 px-3 text-sm" data-en="Create Survey" data-ar="إنشاء استبيان">Create Survey</button>
        </div>
        
        <div class="glass-panel rounded-4 p-4 survey-card">
          <h5 class="fw-bold mb-1" style="color: var(--text-primary);" data-en="Mid-Course Feedback" data-ar="تقييم منتصف الفصل">Mid-Course Feedback</h5>
          <p class="text-sm opacity-75 mb-3" data-en="78% Participation Rate" data-ar="نسبة المشاركة 78%">78% Participation Rate</p>
          <div class="progress mb-3" style="height: 8px; background: var(--separator-color);">
            <div class="progress-bar bg-success" style="width: 78%;"></div>
          </div>
          <button class="btn btn-luxury w-100 py-2" data-en="View Results" data-ar="عرض النتائج">View Results</button>
        </div>
      </div>
    `
  },

  // ================= REPORTS =================
  {
    name: 'teacher-reports.html', title: 'التقارير | Reports',
    content: `
      <div class="container-fluid px-0">
        <h1 class="h3 fw-bold mb-4" style="color: var(--text-primary);" data-en="Analytics & Reports" data-ar="التحليلات والتقارير">Analytics & Reports</h1>
        
        <div class="row g-4 mb-4">
          <div class="col-md-4">
            <div class="glass-panel rounded-4 p-4 report-stat text-center">
              <span class="d-block text-sm opacity-75 mb-2" data-en="Total Enrollment" data-ar="إجمالي التسجيل">Total Enrollment</span>
              <h2 class="display-5 fw-bold mb-0" style="color: var(--text-primary);">240</h2>
            </div>
          </div>
        </div>

        <div class="glass-panel rounded-4 p-4">
          <h5 class="fw-bold mb-4" style="color: var(--text-primary);" data-en="Attendance Trends" data-ar="مؤشرات الحضور">Attendance Trends</h5>
          <div class="chart-container">
            <i class="bi bi-bar-chart-line fs-1 me-2"></i> Chart Data Visualization
          </div>
        </div>
      </div>
    `
  },

  // ================= COMMUNICATION =================
  {
    name: 'teacher-comm-messages.html', title: 'الرسائل | Messages',
    content: `
      <div class="container-fluid px-0">
        <h1 class="h3 fw-bold mb-4" style="color: var(--text-primary);" data-en="Student Messages" data-ar="رسائل الطلاب">Student Messages</h1>
        
        <div class="glass-panel rounded-4 p-0 chat-container">
          <!-- Sidebar -->
          <div class="chat-sidebar d-flex flex-column">
            <div class="p-3 border-bottom" style="border-color: var(--separator-color) !important;">
              <input type="text" class="form-control bg-transparent border text-white" style="border-color: var(--separator-color);" placeholder="Search students..." data-en="Search students..." data-ar="ابحث عن طالب...">
            </div>
            <div class="flex-1">
              <div class="chat-user-item active d-flex align-items-center gap-3">
                <img src="../assets/img/logo_backup.png" class="rounded-circle" style="width: 40px; height: 40px;">
                <div>
                  <h6 class="fw-bold mb-0 text-sm" style="color: var(--text-primary);" data-en="Ahmad Ali" data-ar="أحمد علي">Ahmad Ali</h6>
                  <span class="text-xs opacity-75" data-en="Doctor, I have a question..." data-ar="دكتور، لدي سؤال...">Doctor, I have a...</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Chat Area -->
          <div class="chat-area">
            <div class="p-3 border-bottom d-flex justify-content-between align-items-center" style="border-color: var(--separator-color) !important; background: rgba(0,0,0,0.2);">
              <div class="d-flex align-items-center gap-3">
                <img src="../assets/img/logo_backup.png" class="rounded-circle" style="width: 40px; height: 40px;">
                <h5 class="fw-bold mb-0" style="color: var(--text-primary);" data-en="Ahmad Ali" data-ar="أحمد علي">Ahmad Ali</h5>
              </div>
            </div>
            
            <div class="chat-messages d-flex flex-column">
              <div class="message-bubble received">
                <span class="d-block text-sm" data-en="Doctor, I have a question regarding integration." data-ar="دكتور، لدي سؤال بخصوص التكامل.">Doctor, I have a question...</span>
                <span class="text-xs opacity-50 mt-1 d-block text-end">10:05 AM</span>
              </div>
              <div class="message-bubble sent">
                <span class="d-block text-sm" data-en="Sure, we can discuss it tomorrow." data-ar="بالتأكيد، نناقش ذلك غداً.">Sure, we can discuss it.</span>
                <span class="text-xs opacity-75 mt-1 d-block text-end">10:10 AM</span>
              </div>
            </div>

            <div class="p-3 border-top" style="border-color: var(--separator-color) !important; background: rgba(0,0,0,0.2);">
              <div class="d-flex gap-2">
                <input type="text" class="form-control bg-transparent border text-white" style="border-color: var(--separator-color);" placeholder="Type a message..." data-en="Type a message..." data-ar="اكتب رسالة...">
                <button class="btn btn-luxury px-4"><i class="bi bi-send-fill"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    name: 'teacher-comm-announcements.html', title: 'الإعلانات | Announcements',
    content: `
      <div class="container-fluid px-0">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h1 class="h3 fw-bold mb-0" style="color: var(--text-primary);" data-en="My Announcements" data-ar="إعلاناتي">My Announcements</h1>
          <button class="btn btn-luxury px-4 py-2 text-sm" data-en="Post Announcement" data-ar="نشر إعلان">Post Announcement</button>
        </div>
        
        <div class="glass-panel rounded-4 p-4 announcement-card mb-4">
          <h5 class="fw-bold mb-2" style="color: var(--text-primary);" data-en="Exam Postponed" data-ar="تأجيل الامتحان">Exam Postponed</h5>
          <p class="text-sm opacity-75 mb-3" data-en="The midterm exam is postponed to next week." data-ar="تم تأجيل امتحان المنتصف للأسبوع القادم.">The midterm exam is postponed to next week.</p>
          <span class="text-xs opacity-50">Posted to: Calculus Class • 1 day ago</span>
        </div>
      </div>
    `
  },
  {
    name: 'teacher-comm-mass.html', title: 'إرسال إشعار جماعي | Mass Notification',
    content: `
      <div class="container-fluid px-0">
        <h1 class="h3 fw-bold mb-4" style="color: var(--text-primary);" data-en="Mass Notification" data-ar="إرسال إشعار جماعي">Mass Notification</h1>
        
        <div class="glass-panel rounded-4 p-4 p-md-5">
          <h5 class="fw-bold mb-4" style="color: var(--accent-color);" data-en="Select Audience" data-ar="اختر الجمهور المستهدف">Select Audience</h5>
          
          <div class="row g-3 mb-4">
            <div class="col-md-4">
              <div class="audience-selector rounded-3 p-3 text-center active">
                <i class="bi bi-people-fill fs-3 mb-2 d-block text-accent"></i>
                <span class="fw-bold text-sm" data-en="All Students" data-ar="كافة الطلاب">All Students</span>
              </div>
            </div>
            <div class="col-md-4">
              <div class="audience-selector rounded-3 p-3 text-center">
                <i class="bi bi-book-half fs-3 mb-2 d-block"></i>
                <span class="fw-bold text-sm" data-en="Specific Course" data-ar="مادة معينة">Specific Course</span>
              </div>
            </div>
          </div>
          
          <div class="mb-4">
            <label class="form-label text-sm opacity-75" data-en="Message Title" data-ar="عنوان الرسالة">Message Title</label>
            <input type="text" class="form-control bg-transparent border text-white p-3" style="border-color: var(--separator-color);">
          </div>
          <div class="mb-4">
            <label class="form-label text-sm opacity-75" data-en="Message Body" data-ar="نص الرسالة">Message Body</label>
            <textarea class="form-control bg-transparent border text-white p-3" style="border-color: var(--separator-color); height: 120px;"></textarea>
          </div>
          <button class="btn btn-luxury w-100 py-3 fw-bold" data-en="Send Notification" data-ar="إرسال الإشعار">Send Notification</button>
        </div>
      </div>
    `
  },

  // ================= PROFILE =================
  {
    name: 'teacher-profile-settings.html', title: 'الملف الشخصي | Profile',
    content: `
      <div class="container-fluid px-0">
        <h1 class="h3 fw-bold mb-4" style="color: var(--text-primary);" data-en="Teacher Profile" data-ar="الملف الشخصي للمعلم">Teacher Profile</h1>
        
        <div class="glass-panel rounded-4 p-0 overflow-hidden mb-4">
          <div class="profile-header p-5 d-flex flex-column align-items-center text-center">
            <div class="profile-avatar-wrapper mb-3">
              <img src="../assets/img/logo_backup.png" class="w-100 h-100 rounded-circle object-cover">
              <div class="edit-avatar-btn"><i class="bi bi-camera-fill"></i></div>
            </div>
            <h3 class="fw-bold mb-1" style="color: var(--text-primary);" data-en="Dr. Sarah" data-ar="د. سارة">Dr. Sarah</h3>
            <span class="text-sm opacity-75 badge bg-gold text-dark" data-en="Senior Physics Instructor" data-ar="مدرس فيزياء أول">Senior Physics Instructor</span>
          </div>
          
          <div class="p-4 p-md-5">
            <form class="row g-4">
              <div class="col-md-6">
                <label class="form-label text-sm opacity-75" data-en="Full Name" data-ar="الاسم الكامل">Full Name</label>
                <input type="text" class="form-control bg-transparent border text-white p-3" style="border-color: var(--separator-color);" value="Dr. Sarah Ahmad">
              </div>
              <div class="col-md-6">
                <label class="form-label text-sm opacity-75" data-en="Email Address" data-ar="البريد الإلكتروني">Email Address</label>
                <input type="email" class="form-control bg-transparent border text-white p-3" style="border-color: var(--separator-color);" value="sarah@fullmark.edu">
              </div>
              <div class="col-12 text-end mt-4">
                <button class="btn btn-luxury px-5 py-3 fw-bold" data-en="Save Changes" data-ar="حفظ التغييرات">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `
  },
  {
    name: 'teacher-profile-resume.html', title: 'الشهادات والخبرات | Resume',
    content: `
      <div class="container-fluid px-0">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h1 class="h3 fw-bold mb-0" style="color: var(--text-primary);" data-en="Resume & Certifications" data-ar="الشهادات والخبرات">Resume & Certifications</h1>
          <button class="btn btn-luxury px-4 py-2 text-sm" data-en="Add Entry" data-ar="إضافة قيد">Add Entry</button>
        </div>
        
        <div class="glass-panel rounded-4 p-4 mb-4">
          <h5 class="fw-bold mb-4" style="color: var(--text-primary);" data-en="Professional Experience" data-ar="الخبرة المهنية">Professional Experience</h5>
          <div class="cert-item rounded-3 p-3 mb-3">
            <h6 class="fw-bold mb-1" style="color: var(--text-primary);" data-en="PhD in Theoretical Physics" data-ar="دكتوراه في الفيزياء النظرية">PhD in Theoretical Physics</h6>
            <span class="text-xs opacity-75" data-en="University of Oxford • 2018" data-ar="جامعة أكسفورد • 2018">University of Oxford • 2018</span>
          </div>
        </div>
      </div>
    `
  },
  {
    name: 'teacher-profile-config.html', title: 'إعدادات الحساب | Settings',
    content: `
      <div class="container-fluid px-0">
        <h1 class="h3 fw-bold mb-4" style="color: var(--text-primary);" data-en="Account Settings" data-ar="إعدادات الحساب">Account Settings</h1>
        
        <div class="glass-panel rounded-4 p-4 p-md-5">
          <h5 class="fw-bold mb-4" style="color: var(--accent-color);" data-en="System Preferences" data-ar="تفضيلات النظام">System Preferences</h5>
          
          <div class="setting-row">
            <div>
              <h6 class="fw-bold mb-1" style="color: var(--text-primary);" data-en="Auto-Publish Recordings" data-ar="نشر التسجيلات تلقائياً">Auto-Publish Recordings</h6>
              <span class="text-sm opacity-75" data-en="Publish live sessions automatically after ending." data-ar="نشر الجلسات المباشرة فور انتهائها.">Publish live sessions automatically.</span>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" checked>
            </div>
          </div>
          
          <div class="setting-row border-0 pb-0">
            <div>
              <h6 class="fw-bold mb-1" style="color: var(--text-primary);" data-en="Dark Mode" data-ar="الوضع الليلي">Dark Mode</h6>
              <span class="text-sm opacity-75" data-en="Force dark theme." data-ar="إجبار الوضع الداكن.">Force dark theme.</span>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" checked>
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
  html = html.replace(/<title>.*?<\/title>/, '<title>' + page.title + ' | Full Mark Academy Teacher</title>');
  
  // Replace Main Content
  html = html.replace(/<main class="dashboard-main[^>]*>[\s\S]*?<\/main>/i, '<main class="dashboard-main flex-1 d-flex flex-column">\n' + page.content + '\n</main>');
  
  // Inject custom CSS and JS
  const cssFile = page.name.replace('.html', '.css');
  const jsFile = page.name.replace('.html', '.js');
  
  // Add CSS before </head>
  html = html.replace('</head>', '  <link rel="stylesheet" href="../dashboard-assets/css/' + cssFile + '">\n</head>');
  
  // Add JS before </body>
  html = html.replace('</body>', '  <script src="../dashboard-assets/js/' + jsFile + '"></script>\n</body>');

  fs.writeFileSync(path.join(teacherDir, page.name), html, 'utf8');
});

console.log('Remaining teacher pages generated successfully!');
