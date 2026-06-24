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
    
    // Academic Mgmt
    html = html.replace(/academy-programs\.html/g, 'teacher-programs.html');
    html = html.replace(/academy-courses\.html/g, 'teacher-courses.html');
    html = html.replace(/academy-groups\.html/g, 'teacher-groups.html');
    html = html.replace(/academy\.html#schedule/g, 'teacher-schedule.html');
    
    // Students
    html = html.replace(/students\.html#all/g, 'teacher-students-all.html');
    html = html.replace(/students\.html#course/g, 'teacher-students-course.html');
    html = html.replace(/students\.html#attendance/g, 'teacher-students-attendance.html');
    html = html.replace(/students\.html#performance/g, 'teacher-students-performance.html');
    html = html.replace(/students\.html#notes/g, 'teacher-students-notes.html');
    
    // Content
    html = html.replace(/content\.html#files/g, 'teacher-content-files.html');
    html = html.replace(/content\.html#videos/g, 'teacher-content-videos.html');
    html = html.replace(/content\.html#recordings/g, 'teacher-content-recordings.html');
    html = html.replace(/content\.html#assignments/g, 'teacher-content-assignments.html');
    html = html.replace(/content\.html#resources/g, 'teacher-content-resources.html');
    
    fs.writeFileSync(path.join(teacherDir, file), html, 'utf8');
  });
}
updateTeacherSidebars();

// 2. CSS Content
const cssData = {
  // Academic
  'teacher-programs.css': `
.program-card { transition: all 0.3s; border: 1px solid var(--separator-color); }
.program-card:hover { border-color: var(--accent-color); transform: translateY(-5px); box-shadow: 0 10px 30px rgba(197,168,128,0.15); }
.stats-badge { background: rgba(197, 168, 128, 0.1); color: var(--accent-color); }
`,
  'teacher-courses.css': `
.course-list-item { transition: all 0.2s; border-left: 3px solid transparent; }
[dir="rtl"] .course-list-item { border-left: none; border-right: 3px solid transparent; }
.course-list-item:hover { border-color: var(--accent-color); background: rgba(197,168,128,0.05); }
.progress-bar-custom { height: 6px; background: var(--separator-color); border-radius: 3px; overflow: hidden; }
.progress-bar-fill { height: 100%; background: var(--accent-gradient); width: 0; transition: width 1s ease; }
`,
  'teacher-groups.css': `
.group-card { border-top: 3px solid var(--accent-color); }
.member-avatar { width: 32px; height: 32px; border-radius: 50%; border: 2px solid var(--bg-primary); margin-left: -10px; }
[dir="rtl"] .member-avatar { margin-left: 0; margin-right: -10px; }
.member-avatar:first-child { margin-left: 0; margin-right: 0; }
`,
  'teacher-schedule.css': `
.schedule-slot { border-left: 2px solid var(--separator-color); padding-left: 20px; position: relative; padding-bottom: 30px; }
[dir="rtl"] .schedule-slot { border-left: none; border-right: 2px solid var(--separator-color); padding-left: 0; padding-right: 20px; }
.schedule-slot::before { content: ''; position: absolute; left: -6px; top: 0; width: 10px; height: 10px; border-radius: 50%; background: var(--accent-color); }
[dir="rtl"] .schedule-slot::before { left: auto; right: -6px; }
.schedule-slot.live::before { background: #ff4757; box-shadow: 0 0 10px rgba(255,71,87,0.5); animation: pulse 1.5s infinite; }
@keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.5; } 100% { transform: scale(1); opacity: 1; } }
`,

  // Students
  'teacher-students-all.css': `
.student-row { transition: background 0.2s; }
.student-row:hover { background: rgba(255,255,255,0.02); }
.status-active { color: #2ecc71; background: rgba(46,204,113,0.1); }
.status-inactive { color: #ff4757; background: rgba(255,71,87,0.1); }
`,
  'teacher-students-course.css': `
.course-filter-btn { transition: all 0.2s; border: 1px solid var(--separator-color); color: var(--text-primary); }
.course-filter-btn:hover, .course-filter-btn.active { background: var(--accent-gradient); color: white; border-color: transparent; }
`,
  'teacher-students-attendance.css': `
.attendance-grid { display: grid; grid-template-columns: 2fr repeat(5, 1fr); gap: 10px; align-items: center; }
.att-cell { width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
.att-present { background: rgba(46,204,113,0.15); color: #2ecc71; border: 1px solid #2ecc71; }
.att-absent { background: rgba(255,71,87,0.15); color: #ff4757; border: 1px solid #ff4757; }
.att-late { background: rgba(241,196,15,0.15); color: #f1c40f; border: 1px solid #f1c40f; }
`,
  'teacher-students-performance.css': `
.perf-card { background: linear-gradient(135deg, rgba(197,168,128,0.05) 0%, transparent 100%); border: 1px solid var(--separator-color); }
.chart-placeholder { height: 200px; border: 1px dashed var(--separator-color); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--text-secondary); }
`,
  'teacher-students-notes.css': `
.note-card { border-left: 3px solid var(--accent-color); }
[dir="rtl"] .note-card { border-left: none; border-right: 3px solid var(--accent-color); }
`,

  // Content
  'teacher-content-files.css': `
.file-card { transition: all 0.2s; cursor: pointer; border: 1px solid transparent; }
.file-card:hover { border-color: var(--accent-color); background: rgba(197,168,128,0.05); }
.upload-zone { border: 2px dashed var(--separator-color); border-radius: 16px; padding: 40px; text-align: center; transition: all 0.3s; cursor: pointer; }
.upload-zone:hover { border-color: var(--accent-color); background: rgba(197,168,128,0.05); }
`,
  'teacher-content-videos.css': `
.video-thumbnail { position: relative; border-radius: 12px; overflow: hidden; aspect-ratio: 16/9; background: #000; }
.play-btn { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 50px; height: 50px; background: rgba(197,168,128,0.9); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; transition: transform 0.2s; }
.video-thumbnail:hover .play-btn { transform: translate(-50%, -50%) scale(1.1); }
`,
  'teacher-content-recordings.css': `
.recording-row { border-bottom: 1px solid var(--separator-color); transition: background 0.2s; }
.recording-row:hover { background: rgba(255,255,255,0.02); }
`,
  'teacher-content-assignments.css': `
.assignment-card { border: 1px solid var(--separator-color); transition: all 0.3s; }
.assignment-card:hover { border-color: var(--accent-color); box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
.due-badge { background: rgba(255,71,87,0.1); color: #ff4757; }
`,
  'teacher-content-resources.css': `
.resource-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
`
};

for (const [file, content] of Object.entries(cssData)) {
  fs.writeFileSync(path.join(cssDir, file), content, 'utf8');
}

// 3. JS Content (Minimal placeholder logic)
const jsData = {
  'teacher-programs.js': '', 'teacher-courses.js': '', 'teacher-groups.js': '', 'teacher-schedule.js': '',
  'teacher-students-all.js': '', 'teacher-students-course.js': '', 'teacher-students-attendance.js': '', 'teacher-students-performance.js': '', 'teacher-students-notes.js': '',
  'teacher-content-files.js': '', 'teacher-content-videos.js': '', 'teacher-content-recordings.js': '', 'teacher-content-assignments.js': '', 'teacher-content-resources.js': ''
};

for (const [file, content] of Object.entries(jsData)) {
  fs.writeFileSync(path.join(jsDir, file), content, 'utf8');
}

// 4. HTML Content Generation
const baseHtml = fs.readFileSync(path.join(teacherDir, 'dashboard.html'), 'utf8');

const pages = [
  // ================= ACADEMIC =================
  {
    name: 'teacher-programs.html', title: 'البرامج الدراسية | Programs',
    content: `
      <div class="container-fluid px-0">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h1 class="h3 fw-bold mb-0" style="color: var(--text-primary);" data-en="Manage Programs" data-ar="إدارة البرامج الدراسية">Manage Programs</h1>
          <button class="btn btn-luxury px-4 py-2 fw-bold text-sm"><i class="bi bi-plus-lg me-2"></i><span data-en="New Program" data-ar="برنامج جديد">New Program</span></button>
        </div>
        
        <div class="row g-4">
          <div class="col-md-6 col-lg-4">
            <div class="glass-panel rounded-4 p-4 program-card">
              <div class="d-flex justify-content-between align-items-start mb-3">
                <div class="p-3 rounded-circle bg-gold bg-opacity-10 text-gold"><i class="bi bi-mortarboard fs-4 text-accent"></i></div>
                <div class="dropdown">
                  <button class="btn btn-glass border-0 p-1" data-bs-toggle="dropdown"><i class="bi bi-three-dots-vertical"></i></button>
                  <ul class="dropdown-menu dropdown-menu-end bg-dark border-secondary">
                    <li><a class="dropdown-item text-white hover:bg-gold/20" href="#" data-en="Edit" data-ar="تعديل">Edit</a></li>
                    <li><a class="dropdown-item text-danger hover:bg-danger/20" href="#" data-en="Archive" data-ar="أرشيف">Archive</a></li>
                  </ul>
                </div>
              </div>
              <h5 class="fw-bold mb-2" style="color: var(--text-primary);" data-en="Tawjihi Science Track" data-ar="مسار التوجيهي العلمي">Tawjihi Science Track</h5>
              <p class="text-sm opacity-75 mb-4" data-en="Full curriculum covering Physics, Chemistry, Math, and Biology." data-ar="منهج كامل يغطي الفيزياء، الكيمياء، الرياضيات والأحياء.">Full curriculum covering Physics...</p>
              
              <div class="d-flex gap-2 mb-4">
                <span class="badge stats-badge px-3 py-2 rounded-pill"><i class="bi bi-people-fill me-1"></i> 120</span>
                <span class="badge stats-badge px-3 py-2 rounded-pill"><i class="bi bi-book-fill me-1"></i> 4 Courses</span>
              </div>
              <button class="btn btn-glass border w-100 py-2" data-en="View Details" data-ar="عرض التفاصيل">View Details</button>
            </div>
          </div>
          
          <!-- Add more program cards as needed -->
        </div>
      </div>
    `
  },
  {
    name: 'teacher-courses.html', title: 'المواد التعليمية | Courses',
    content: `
      <div class="container-fluid px-0">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h1 class="h3 fw-bold mb-0" style="color: var(--text-primary);" data-en="My Courses" data-ar="المواد التعليمية">My Courses</h1>
          <button class="btn btn-luxury px-4 py-2 text-sm"><i class="bi bi-plus-lg me-2"></i><span data-en="Add Course" data-ar="إضافة مادة">Add Course</span></button>
        </div>

        <div class="glass-panel rounded-4 overflow-hidden p-0">
          <!-- Course Item -->
          <div class="p-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center border-bottom course-list-item" style="border-bottom-color: var(--separator-color) !important;">
            <div class="d-flex align-items-center gap-4 mb-3 mb-md-0">
              <div class="p-3 rounded-3" style="background: rgba(197, 168, 128, 0.1);"><i class="bi bi-calculator fs-3" style="color: var(--accent-color);"></i></div>
              <div>
                <h5 class="fw-bold mb-1" style="color: var(--text-primary);" data-en="Advanced Calculus" data-ar="التفاضل والتكامل المتقدم">Advanced Calculus</h5>
                <span class="text-xs opacity-75" data-en="Tawjihi Science Track • 45 Students" data-ar="مسار التوجيهي العلمي • 45 طالب">Tawjihi Science Track • 45 Students</span>
              </div>
            </div>
            <div class="d-flex flex-column flex-md-row align-items-md-center gap-4">
              <div style="min-width: 150px;">
                <div class="d-flex justify-content-between text-xs mb-1">
                  <span data-en="Completion" data-ar="نسبة الإنجاز">Completion</span>
                  <span class="fw-bold" style="color: var(--accent-color);">65%</span>
                </div>
                <div class="progress-bar-custom"><div class="progress-bar-fill" style="width: 65%;"></div></div>
              </div>
              <button class="btn btn-glass border px-4 py-2" data-en="Manage" data-ar="إدارة">Manage</button>
            </div>
          </div>
          
          <!-- Course Item -->
          <div class="p-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center course-list-item">
            <div class="d-flex align-items-center gap-4 mb-3 mb-md-0">
              <div class="p-3 rounded-3" style="background: rgba(197, 168, 128, 0.1);"><i class="bi bi-magnet fs-3" style="color: var(--accent-color);"></i></div>
              <div>
                <h5 class="fw-bold mb-1" style="color: var(--text-primary);" data-en="Physics Fundamentals" data-ar="أساسيات الفيزياء">Physics Fundamentals</h5>
                <span class="text-xs opacity-75" data-en="Tawjihi Science Track • 38 Students" data-ar="مسار التوجيهي العلمي • 38 طالب">Tawjihi Science Track • 38 Students</span>
              </div>
            </div>
            <div class="d-flex flex-column flex-md-row align-items-md-center gap-4">
              <div style="min-width: 150px;">
                <div class="d-flex justify-content-between text-xs mb-1">
                  <span data-en="Completion" data-ar="نسبة الإنجاز">Completion</span>
                  <span class="fw-bold" style="color: var(--accent-color);">40%</span>
                </div>
                <div class="progress-bar-custom"><div class="progress-bar-fill" style="width: 40%;"></div></div>
              </div>
              <button class="btn btn-glass border px-4 py-2" data-en="Manage" data-ar="إدارة">Manage</button>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    name: 'teacher-groups.html', title: 'المجموعات | Study Groups',
    content: `
      <div class="container-fluid px-0">
        <h1 class="h3 fw-bold mb-4" style="color: var(--text-primary);" data-en="Study Groups" data-ar="المجموعات الدراسية">Study Groups</h1>
        
        <div class="row g-4">
          <div class="col-md-6 col-lg-4">
            <div class="glass-panel rounded-4 p-4 group-card">
              <div class="d-flex justify-content-between align-items-start mb-3">
                <h5 class="fw-bold mb-0" style="color: var(--text-primary);" data-en="Group A - Math" data-ar="المجموعة أ - رياضيات">Group A - Math</h5>
                <span class="badge bg-success bg-opacity-25 text-success rounded-pill px-3">Active</span>
              </div>
              <p class="text-sm opacity-75 mb-4" data-en="Focus: Chapter 3 Integration" data-ar="التركيز: الفصل 3 التكامل">Focus: Chapter 3 Integration</p>
              
              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex">
                  <img src="../assets/img/logo_backup.png" class="member-avatar bg-dark">
                  <img src="../assets/img/logo_backup.png" class="member-avatar bg-dark">
                  <img src="../assets/img/logo_backup.png" class="member-avatar bg-dark">
                  <div class="member-avatar bg-dark d-flex align-items-center justify-content-center text-xs" style="color: var(--accent-color);">+12</div>
                </div>
                <button class="btn btn-glass border py-1 px-3 text-sm" data-en="Open Chat" data-ar="فتح المحادثة">Open Chat</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    name: 'teacher-schedule.html', title: 'الجدول الأكاديمي | Schedule',
    content: `
      <div class="container-fluid px-0">
        <h1 class="h3 fw-bold mb-4" style="color: var(--text-primary);" data-en="Academic Schedule" data-ar="الجدول الأكاديمي">Academic Schedule</h1>
        
        <div class="glass-panel rounded-4 p-4 p-md-5">
          <h5 class="fw-bold mb-4" style="color: var(--accent-color);" data-en="Today's Timeline" data-ar="الخط الزمني لليوم">Today's Timeline</h5>
          
          <div class="ps-3 pt-2">
            <!-- Timeline Item -->
            <div class="schedule-slot live">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <h6 class="fw-bold mb-0 text-danger" data-en="Live Session: Calculus" data-ar="جلسة مباشرة: تفاضل وتكامل">Live Session: Calculus</h6>
                <span class="text-xs fw-bold text-danger">10:00 AM - 11:30 AM</span>
              </div>
              <p class="text-sm opacity-75 mb-2" data-en="Group A & B combined." data-ar="المجموعة أ و ب معاً.">Group A & B combined.</p>
              <button class="btn btn-danger text-white px-4 py-1 text-sm rounded-pill" data-en="Join Room" data-ar="دخول القاعة">Join Room</button>
            </div>
            
            <!-- Timeline Item -->
            <div class="schedule-slot pb-0 border-0">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <h6 class="fw-bold mb-0" style="color: var(--text-primary);" data-en="Physics Recording Upload" data-ar="رفع تسجيل الفيزياء">Physics Recording Upload</h6>
                <span class="text-xs opacity-75">01:00 PM</span>
              </div>
              <p class="text-sm opacity-75 mb-0" data-en="Scheduled automatic upload for chapter 4." data-ar="رفع تلقائي مبرمج للفصل الرابع.">Scheduled automatic upload for chapter 4.</p>
            </div>
          </div>
        </div>
      </div>
    `
  },

  // ================= STUDENTS =================
  {
    name: 'teacher-students-all.html', title: 'جميع الطلاب | All Students',
    content: `
      <div class="container-fluid px-0">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h1 class="h3 fw-bold mb-0" style="color: var(--text-primary);" data-en="All Enrolled Students" data-ar="جميع الطلاب المسجلين">All Enrolled Students</h1>
          <div class="d-flex gap-2">
            <input type="text" class="form-control bg-transparent border text-white" style="border-color: var(--separator-color);" placeholder="Search students..." data-en="Search students..." data-ar="ابحث عن طالب...">
          </div>
        </div>
        
        <div class="glass-panel rounded-4 overflow-hidden p-0">
          <div class="table-responsive">
            <table class="table table-dark table-hover mb-0 align-middle" style="--bs-table-bg: transparent;">
              <thead>
                <tr style="border-bottom: 2px solid var(--separator-color);">
                  <th class="py-3 px-4 text-uppercase text-xs opacity-75" data-en="Student Name" data-ar="اسم الطالب">Student Name</th>
                  <th class="py-3 px-4 text-uppercase text-xs opacity-75" data-en="ID" data-ar="الرقم التعريفي">ID</th>
                  <th class="py-3 px-4 text-uppercase text-xs opacity-75" data-en="Program" data-ar="البرنامج">Program</th>
                  <th class="py-3 px-4 text-uppercase text-xs opacity-75" data-en="Status" data-ar="الحالة">Status</th>
                  <th class="py-3 px-4 text-end" data-en="Actions" data-ar="إجراءات">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr class="student-row" style="border-color: var(--separator-color);">
                  <td class="py-3 px-4">
                    <div class="d-flex align-items-center gap-3">
                      <img src="../assets/img/logo_backup.png" class="rounded-circle" style="width: 36px; height: 36px;">
                      <span class="fw-bold" style="color: var(--text-primary);" data-en="Ahmad Ali" data-ar="أحمد علي">Ahmad Ali</span>
                    </div>
                  </td>
                  <td class="py-3 px-4">#ST-2023-01</td>
                  <td class="py-3 px-4" data-en="Tawjihi Science" data-ar="توجيهي علمي">Tawjihi Science</td>
                  <td class="py-3 px-4"><span class="badge status-active px-3 py-1 rounded-pill" data-en="Active" data-ar="نشط">Active</span></td>
                  <td class="py-3 px-4 text-end">
                    <button class="btn btn-glass border py-1 px-2 text-sm"><i class="bi bi-eye"></i></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `
  },
  {
    name: 'teacher-students-course.html', title: 'طلاب المادة | Course Students',
    content: `
      <div class="container-fluid px-0">
        <h1 class="h3 fw-bold mb-4" style="color: var(--text-primary);" data-en="Course Students" data-ar="طلاب المادة">Course Students</h1>
        
        <!-- Filters -->
        <div class="d-flex flex-wrap gap-2 mb-4">
          <button class="btn course-filter-btn active px-4 py-2 rounded-pill" data-en="All Courses" data-ar="جميع المواد">All Courses</button>
          <button class="btn course-filter-btn px-4 py-2 rounded-pill" data-en="Calculus" data-ar="تفاضل وتكامل">Calculus</button>
          <button class="btn course-filter-btn px-4 py-2 rounded-pill" data-en="Physics" data-ar="فيزياء">Physics</button>
        </div>
        
        <!-- Content identical to All Students but filtered -->
        <div class="glass-panel rounded-4 p-5 text-center">
          <i class="bi bi-people fs-1 opacity-50 mb-3 d-block"></i>
          <h5 class="fw-bold" style="color: var(--text-primary);" data-en="Select a course to view enrolled students." data-ar="اختر مادة لعرض الطلاب المسجلين بها.">Select a course to view enrolled students.</h5>
        </div>
      </div>
    `
  },
  {
    name: 'teacher-students-attendance.html', title: 'الحضور والغياب | Attendance',
    content: `
      <div class="container-fluid px-0">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h1 class="h3 fw-bold mb-0" style="color: var(--text-primary);" data-en="Attendance Sheet" data-ar="كشف الحضور">Attendance Sheet</h1>
          <button class="btn btn-luxury px-4 py-2 text-sm" data-en="Save Records" data-ar="حفظ السجل">Save Records</button>
        </div>
        
        <div class="glass-panel rounded-4 overflow-hidden p-4">
          <div class="attendance-grid mb-3 border-bottom pb-3 text-xs fw-bold opacity-75 text-center" style="border-color: var(--separator-color) !important;">
            <div class="text-start px-2" data-en="Student" data-ar="الطالب">Student</div>
            <div>Oct 1</div>
            <div>Oct 3</div>
            <div>Oct 5</div>
            <div>Oct 8</div>
            <div>Oct 10</div>
          </div>
          
          <div class="attendance-grid mb-2 align-items-center">
            <div class="fw-bold text-sm px-2" style="color: var(--text-primary);" data-en="Ahmad Ali" data-ar="أحمد علي">Ahmad Ali</div>
            <div class="att-cell att-present" title="Present">P</div>
            <div class="att-cell att-present" title="Present">P</div>
            <div class="att-cell att-absent" title="Absent">A</div>
            <div class="att-cell att-present" title="Present">P</div>
            <div class="att-cell att-late" title="Late">L</div>
          </div>
        </div>
      </div>
    `
  },
  {
    name: 'teacher-students-performance.html', title: 'الأداء الأكاديمي | Performance',
    content: `
      <div class="container-fluid px-0">
        <h1 class="h3 fw-bold mb-4" style="color: var(--text-primary);" data-en="Class Performance Analytics" data-ar="تحليلات الأداء الصفي">Class Performance Analytics</h1>
        
        <div class="row g-4">
          <div class="col-lg-8">
            <div class="glass-panel rounded-4 p-4 perf-card h-100">
              <h5 class="fw-bold mb-4" style="color: var(--text-primary);" data-en="Average Scores Over Time" data-ar="متوسط الدرجات عبر الزمن">Average Scores Over Time</h5>
              <div class="chart-placeholder">
                <i class="bi bi-graph-up fs-2 me-2"></i> Chart Area (Chart.js implementation)
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="glass-panel rounded-4 p-4 perf-card h-100">
              <h5 class="fw-bold mb-4" style="color: var(--text-primary);" data-en="Top Performers" data-ar="الطلاب المتميزون">Top Performers</h5>
              <div class="d-flex justify-content-between border-bottom pb-2 mb-2" style="border-color: var(--separator-color) !important;">
                <span class="fw-bold text-sm" data-en="Ahmad Ali" data-ar="أحمد علي">Ahmad Ali</span>
                <span class="text-success fw-bold text-sm">98%</span>
              </div>
              <div class="d-flex justify-content-between border-bottom pb-2 mb-2" style="border-color: var(--separator-color) !important;">
                <span class="fw-bold text-sm" data-en="Sara Rami" data-ar="سارة رامي">Sara Rami</span>
                <span class="text-success fw-bold text-sm">96%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    name: 'teacher-students-notes.html', title: 'ملاحظات أكاديمية | Academic Notes',
    content: `
      <div class="container-fluid px-0">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h1 class="h3 fw-bold mb-0" style="color: var(--text-primary);" data-en="Academic Notes" data-ar="ملاحظات أكاديمية">Academic Notes</h1>
          <button class="btn btn-luxury px-4 py-2 text-sm" data-en="Add Note" data-ar="إضافة ملاحظة">Add Note</button>
        </div>
        
        <div class="d-flex flex-column gap-3">
          <div class="glass-panel rounded-4 p-4 note-card">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <h6 class="fw-bold mb-0" style="color: var(--text-primary);" data-en="Regarding Ahmad's Project" data-ar="بخصوص مشروع أحمد">Regarding Ahmad's Project</h6>
              <span class="text-xs opacity-75">Oct 12, 2023</span>
            </div>
            <p class="text-sm opacity-75 mb-0" data-en="Ahmad needs more guidance on chapter 4 mechanics. Recommended extra reading." data-ar="أحمد يحتاج إلى مزيد من التوجيه في ميكانيكا الفصل الرابع. أوصيت بقراءة إضافية.">Ahmad needs more guidance...</p>
          </div>
        </div>
      </div>
    `
  },

  // ================= CONTENT =================
  {
    name: 'teacher-content-files.html', title: 'الملفات التعليمية | Files',
    content: `
      <div class="container-fluid px-0">
        <h1 class="h3 fw-bold mb-4" style="color: var(--text-primary);" data-en="Course Materials" data-ar="المواد التعليمية (الملفات)">Course Materials</h1>
        
        <div class="upload-zone mb-5 glow-card">
          <i class="bi bi-cloud-arrow-up fs-1 mb-3 d-block" style="color: var(--accent-color);"></i>
          <h5 class="fw-bold mb-2" style="color: var(--text-primary);" data-en="Drag & Drop Files Here" data-ar="اسحب وأفلت الملفات هنا">Drag & Drop Files Here</h5>
          <p class="text-sm opacity-75 mb-4" data-en="Supports PDF, DOCX, PPTX (Max 50MB)" data-ar="يدعم ملفات PDF, DOCX, PPTX (كحد أقصى 50 ميجابايت)">Supports PDF, DOCX...</p>
          <button class="btn btn-luxury px-4 py-2 rounded-pill" data-en="Browse Files" data-ar="تصفح الملفات">Browse Files</button>
        </div>

        <h5 class="fw-bold mb-3" style="color: var(--text-primary);" data-en="Recent Uploads" data-ar="الملفات المرفوعة حديثاً">Recent Uploads</h5>
        <div class="row g-3">
          <div class="col-md-4">
            <div class="glass-panel rounded-3 p-3 file-card d-flex align-items-center gap-3">
              <div class="fs-2 text-danger"><i class="bi bi-file-earmark-pdf-fill"></i></div>
              <div class="flex-1 overflow-hidden">
                <h6 class="fw-bold mb-0 text-truncate text-sm" style="color: var(--text-primary);">Chapter_3_Summary.pdf</h6>
                <span class="text-xs opacity-75">2.4 MB • Calculus</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    name: 'teacher-content-videos.html', title: 'الفيديوهات | Videos',
    content: `
      <div class="container-fluid px-0">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h1 class="h3 fw-bold mb-0" style="color: var(--text-primary);" data-en="Video Lectures" data-ar="محاضرات الفيديو">Video Lectures</h1>
          <button class="btn btn-luxury px-4 py-2 text-sm"><i class="bi bi-cloud-upload me-2"></i><span data-en="Upload Video" data-ar="رفع فيديو">Upload Video</span></button>
        </div>
        
        <div class="row g-4">
          <div class="col-md-6 col-lg-4">
            <div class="glass-panel rounded-4 p-3">
              <div class="video-thumbnail mb-3">
                <div class="play-btn"><i class="bi bi-play-fill"></i></div>
                <span class="position-absolute bottom-0 end-0 m-2 px-2 py-1 bg-black bg-opacity-75 text-white text-xs rounded">45:20</span>
              </div>
              <h6 class="fw-bold mb-1" style="color: var(--text-primary);" data-en="Introduction to Kinematics" data-ar="مقدمة في علم الحركة">Introduction to Kinematics</h6>
              <span class="text-xs opacity-75">Physics • Uploaded 2 days ago</span>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    name: 'teacher-content-recordings.html', title: 'التسجيلات | Recordings',
    content: `
      <div class="container-fluid px-0">
        <h1 class="h3 fw-bold mb-4" style="color: var(--text-primary);" data-en="Live Session Recordings" data-ar="تسجيلات الجلسات المباشرة">Live Session Recordings</h1>
        
        <div class="glass-panel rounded-4 p-0 overflow-hidden">
          <!-- Row -->
          <div class="p-3 d-flex justify-content-between align-items-center recording-row">
            <div class="d-flex align-items-center gap-3">
              <div class="p-2 rounded-circle bg-danger bg-opacity-10 text-danger"><i class="bi bi-record-circle"></i></div>
              <div>
                <h6 class="fw-bold mb-0 text-sm" style="color: var(--text-primary);" data-en="Live Session: Integration Part 1" data-ar="الجلسة المباشرة: التكامل الجزء الأول">Live Session: Integration Part 1</h6>
                <span class="text-xs opacity-75">Recorded on Oct 10, 2023 • 1h 15m</span>
              </div>
            </div>
            <div class="d-flex gap-2">
              <button class="btn btn-glass border py-1 px-3 text-sm" data-en="Publish" data-ar="نشر للطلاب">Publish</button>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    name: 'teacher-content-assignments.html', title: 'الواجبات | Assignments',
    content: `
      <div class="container-fluid px-0">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h1 class="h3 fw-bold mb-0" style="color: var(--text-primary);" data-en="Assignments" data-ar="الواجبات">Assignments</h1>
          <button class="btn btn-luxury px-4 py-2 text-sm" data-en="Create Assignment" data-ar="إنشاء واجب">Create Assignment</button>
        </div>
        
        <div class="row g-4">
          <div class="col-md-6">
            <div class="glass-panel rounded-4 p-4 assignment-card position-relative overflow-hidden">
              <div class="d-flex justify-content-between align-items-start mb-3">
                <h5 class="fw-bold mb-0" style="color: var(--text-primary);" data-en="Calculus Homework 2" data-ar="واجب التفاضل رقم 2">Calculus Homework 2</h5>
                <span class="badge due-badge px-2 py-1 rounded">Due: Tomorrow</span>
              </div>
              <p class="text-sm opacity-75 mb-4" data-en="Solve problems 1 to 15 on page 42." data-ar="حل المسائل من 1 إلى 15 في صفحة 42.">Solve problems 1 to 15 on page 42.</p>
              <div class="d-flex justify-content-between align-items-center border-top pt-3" style="border-color: var(--separator-color) !important;">
                <span class="text-sm fw-bold" style="color: var(--accent-color);">35/40 Submitted</span>
                <button class="btn btn-glass border py-1 px-3 text-sm" data-en="Grade" data-ar="تقييم">Grade</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    name: 'teacher-content-resources.html', title: 'الموارد التعليمية | External Resources',
    content: `
      <div class="container-fluid px-0">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h1 class="h3 fw-bold mb-0" style="color: var(--text-primary);" data-en="External Resources" data-ar="روابط وموارد خارجية">External Resources</h1>
          <button class="btn btn-luxury px-4 py-2 text-sm" data-en="Add Link" data-ar="إضافة رابط">Add Link</button>
        </div>
        
        <div class="resource-grid">
          <div class="glass-panel rounded-3 p-3 d-flex align-items-center gap-3 transition-all hover:bg-white/5 border border-transparent hover:border-accent cursor-pointer">
            <div class="fs-2" style="color: var(--accent-color);"><i class="bi bi-link-45deg"></i></div>
            <div>
              <h6 class="fw-bold mb-1 text-sm" style="color: var(--text-primary);" data-en="Interactive Physics Simulators" data-ar="محاكيات تفاعلية للفيزياء">Interactive Physics Simulators</h6>
              <span class="text-xs opacity-75 text-truncate d-block" style="max-width: 150px;">https://phet.colorado.edu/</span>
            </div>
          </div>
        </div>
      </div>
    `
  }
];

pages.forEach(page => {
  let html = baseHtml;
  
  // Replace title using regex literal and string concatenation
  html = html.replace(/<title>.*?<\/title>/, '<title>' + page.title + ' | Full Mark Academy Teacher</title>');
  
  // Replace Main Content using regex literal and string concatenation
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

console.log('Teacher pages generated successfully!');
