const fs = require('fs');
const path = require('path');

const studentDir = path.join(__dirname, 'student');
const teacherDir = path.join(__dirname, 'teacher');
const cssDir = path.join(__dirname, 'dashboard-assets', 'css');
const jsDir = path.join(__dirname, 'dashboard-assets', 'js');

// 1. Update sidebars across all files to use real links for Financials, Comm, Profile
function updateSidebars(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
  files.forEach(file => {
    let html = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Financials
    html = html.replace(/financials\.html#records/g, 'finance-records.html');
    html = html.replace(/financials\.html#invoices/g, 'finance-invoices.html');
    html = html.replace(/financials\.html#payments/g, 'finance-payments.html');
    html = html.replace(/financials\.html#alerts/g, 'finance-alerts.html');
    
    // Communication
    html = html.replace(/communication\.html#messages/g, 'comm-messages.html');
    html = html.replace(/communication\.html#announcements/g, 'comm-announcements.html');
    html = html.replace(/communication\.html#notifications/g, 'comm-notifications.html');
    html = html.replace(/communication\.html#support/g, 'comm-support.html');
    
    // Profile
    html = html.replace(/profile\.html#data/g, 'profile-data.html');
    html = html.replace(/profile\.html#profile/g, 'profile-settings.html');
    html = html.replace(/profile\.html#security/g, 'profile-security.html');
    
    fs.writeFileSync(path.join(dir, file), html, 'utf8');
  });
}
updateSidebars(studentDir);
updateSidebars(teacherDir);

// 2. CSS Content
const cssData = {
  // Finance
  'finance-records.css': `
.finance-stat-card { border-top: 4px solid var(--accent-color); transition: transform 0.3s; }
.finance-stat-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(197, 168, 128, 0.15); }
.transaction-row { transition: all 0.2s; border-bottom: 1px solid var(--separator-color); }
.transaction-row:hover { background: rgba(197, 168, 128, 0.05); padding-left: 8px; }
[dir="rtl"] .transaction-row:hover { padding-left: 0; padding-right: 8px; }
`,
  'finance-invoices.css': `
.invoice-card { transition: all 0.3s ease; border: 1px solid var(--separator-color); }
.invoice-card:hover { border-color: var(--accent-color); box-shadow: 0 0 20px rgba(197, 168, 128, 0.1); }
.status-badge.paid { background: rgba(46, 204, 113, 0.1); color: #2ecc71; border: 1px solid #2ecc71; }
.status-badge.unpaid { background: rgba(255, 71, 87, 0.1); color: #ff4757; border: 1px solid #ff4757; }
`,
  'finance-payments.css': `
.payment-method-card { cursor: pointer; transition: all 0.3s; border: 2px solid transparent; }
.payment-method-card:hover { background: rgba(197, 168, 128, 0.1); }
.payment-method-card.selected { border-color: var(--accent-color); background: rgba(197, 168, 128, 0.05); }
`,
  'finance-alerts.css': `
.alert-item { border-left: 3px solid var(--accent-color); }
[dir="rtl"] .alert-item { border-left: none; border-right: 3px solid var(--accent-color); }
.alert-icon { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
`,

  // Communication
  'comm-messages.css': `
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
  'comm-announcements.css': `
.announcement-card { position: relative; overflow: hidden; transition: all 0.3s; }
.announcement-card::after { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: var(--accent-gradient); }
.announcement-card:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,0,0,0.15); }
`,
  'comm-notifications.css': `
.notif-item { transition: all 0.2s; border-bottom: 1px solid var(--separator-color); }
.notif-item.unread { background: rgba(197, 168, 128, 0.05); }
.notif-item:hover { background: rgba(255,255,255,0.02); }
`,
  'comm-support.css': `
.ticket-card { transition: all 0.3s; border: 1px solid transparent; }
.ticket-card:hover { border-color: var(--accent-color); }
.status-open { color: #2ecc71; background: rgba(46,204,113,0.1); }
.status-closed { color: var(--text-secondary); background: var(--bg-secondary); }
`,

  // Profile
  'profile-data.css': `
.profile-header { background: linear-gradient(135deg, rgba(197,168,128,0.2) 0%, transparent 100%); border-bottom: 1px solid var(--separator-color); }
.profile-avatar-wrapper { width: 120px; height: 120px; border-radius: 50%; padding: 4px; border: 2px dashed var(--accent-color); position: relative; }
.edit-avatar-btn { position: absolute; bottom: 0; right: 0; background: var(--accent-color); color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; }
[dir="rtl"] .edit-avatar-btn { right: auto; left: 0; }
`,
  'profile-settings.css': `
.setting-row { padding: 16px 0; border-bottom: 1px solid var(--separator-color); display: flex; justify-content: space-between; align-items: center; }
.form-switch .form-check-input { width: 3em; height: 1.5em; cursor: pointer; }
.form-switch .form-check-input:checked { background-color: var(--accent-color); border-color: var(--accent-color); }
`,
  'profile-security.css': `
.security-shield { font-size: 4rem; color: #2ecc71; text-shadow: 0 0 20px rgba(46,204,113,0.3); }
.login-history-item { border-left: 2px solid var(--separator-color); padding-left: 16px; margin-bottom: 16px; }
[dir="rtl"] .login-history-item { border-left: none; border-right: 2px solid var(--separator-color); padding-left: 0; padding-right: 16px; }
`
};

for (const [file, content] of Object.entries(cssData)) {
  fs.writeFileSync(path.join(cssDir, file), content, 'utf8');
}

// 3. JS Content (Minimal placeholder logic)
const jsData = {
  'finance-records.js': '', 'finance-invoices.js': '', 'finance-payments.js': '', 'finance-alerts.js': '',
  'comm-messages.js': '', 'comm-announcements.js': '', 'comm-notifications.js': '', 'comm-support.js': '',
  'profile-data.js': '', 'profile-settings.js': '', 'profile-security.js': ''
};

for (const [file, content] of Object.entries(jsData)) {
  fs.writeFileSync(path.join(jsDir, file), content, 'utf8');
}

// 4. HTML Content Generation
const baseHtml = fs.readFileSync(path.join(studentDir, 'dashboard.html'), 'utf8');

const pages = [
  // ================= FINANCIALS =================
  {
    name: 'finance-records.html', title: 'السجل المالي | Financial Records',
    content: `
      <div class="container-fluid px-0">
        <h1 class="h3 fw-bold mb-4" style="color: var(--text-primary);" data-en="Financial Records" data-ar="السجل المالي">Financial Records</h1>
        
        <div class="row g-4 mb-5">
          <div class="col-md-4">
            <div class="glass-panel rounded-4 p-4 finance-stat-card glow-card text-center">
              <span class="d-block text-sm opacity-75 mb-2" data-en="Total Balance" data-ar="إجمالي الرصيد">Total Balance</span>
              <h2 class="display-6 fw-bold mb-0 text-success">$1,250.00</h2>
            </div>
          </div>
          <div class="col-md-4">
            <div class="glass-panel rounded-4 p-4 finance-stat-card glow-card text-center" style="border-top-color: #ff4757;">
              <span class="d-block text-sm opacity-75 mb-2" data-en="Outstanding Dues" data-ar="المستحقات غير المدفوعة">Outstanding Dues</span>
              <h2 class="display-6 fw-bold mb-0 text-danger">$300.00</h2>
            </div>
          </div>
        </div>

        <div class="glass-panel rounded-4 overflow-hidden">
          <div class="p-4 border-bottom" style="border-color: var(--separator-color) !important;">
            <h5 class="fw-bold mb-0" data-en="Recent Transactions" data-ar="العمليات الأخيرة">Recent Transactions</h5>
          </div>
          <div class="p-0">
            <!-- Transaction -->
            <div class="p-3 d-flex justify-content-between align-items-center transaction-row">
              <div class="d-flex align-items-center gap-3">
                <div class="p-2 rounded-circle bg-success bg-opacity-10 text-success"><i class="bi bi-arrow-down-right"></i></div>
                <div>
                  <h6 class="mb-0 fw-bold" style="color: var(--text-primary);" data-en="Course Payment: Calculus" data-ar="دفعة مادة التفاضل والتكامل">Course Payment: Calculus</h6>
                  <span class="text-xs opacity-75">Oct 12, 2023 • Credit Card</span>
                </div>
              </div>
              <span class="fw-bold text-success">+$150.00</span>
            </div>
            <!-- Transaction -->
            <div class="p-3 d-flex justify-content-between align-items-center transaction-row">
              <div class="d-flex align-items-center gap-3">
                <div class="p-2 rounded-circle bg-danger bg-opacity-10 text-danger"><i class="bi bi-arrow-up-right"></i></div>
                <div>
                  <h6 class="mb-0 fw-bold" style="color: var(--text-primary);" data-en="Exam Fee" data-ar="رسوم الامتحان">Exam Fee</h6>
                  <span class="text-xs opacity-75">Oct 10, 2023 • Wallet</span>
                </div>
              </div>
              <span class="fw-bold text-danger">-$25.00</span>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    name: 'finance-invoices.html', title: 'الفواتير | Invoices',
    content: `
      <div class="container-fluid px-0">
        <h1 class="h3 fw-bold mb-4" style="color: var(--text-primary);" data-en="My Invoices" data-ar="فواتيري">My Invoices</h1>
        
        <div class="row g-4">
          <!-- Unpaid Invoice -->
          <div class="col-lg-6">
            <div class="glass-panel rounded-4 p-4 invoice-card">
              <div class="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h5 class="fw-bold mb-1" style="color: var(--text-primary);">INV-2023-009</h5>
                  <span class="text-xs opacity-75" data-en="Due: Oct 30, 2023" data-ar="مستحقة في: 30 أكتوبر 2023">Due: Oct 30, 2023</span>
                </div>
                <span class="badge status-badge unpaid px-3 py-1 rounded-pill" data-en="Unpaid" data-ar="غير مدفوعة">Unpaid</span>
              </div>
              <h3 class="fw-bold mb-3" style="color: var(--text-primary);">$300.00</h3>
              <p class="text-sm opacity-75 mb-4" data-en="Tawjihi Science Package - Month 3" data-ar="باقة التوجيهي العلمي - الشهر 3">Tawjihi Science Package - Month 3</p>
              <div class="d-flex gap-2">
                <button class="btn btn-luxury w-100 py-2" data-en="Pay Now" data-ar="ادفع الآن">Pay Now</button>
                <button class="btn btn-glass border py-2 px-3"><i class="bi bi-download"></i></button>
              </div>
            </div>
          </div>

          <!-- Paid Invoice -->
          <div class="col-lg-6">
            <div class="glass-panel rounded-4 p-4 invoice-card">
              <div class="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h5 class="fw-bold mb-1" style="color: var(--text-primary);">INV-2023-008</h5>
                  <span class="text-xs opacity-75" data-en="Paid: Sep 28, 2023" data-ar="دُفعت في: 28 سبتمبر 2023">Paid: Sep 28, 2023</span>
                </div>
                <span class="badge status-badge paid px-3 py-1 rounded-pill" data-en="Paid" data-ar="مدفوعة">Paid</span>
              </div>
              <h3 class="fw-bold mb-3" style="color: var(--text-primary);">$150.00</h3>
              <p class="text-sm opacity-75 mb-4" data-en="Calculus Course Registration" data-ar="تسجيل مادة التفاضل والتكامل">Calculus Course Registration</p>
              <div class="d-flex gap-2">
                <button class="btn btn-glass border w-100 py-2" data-en="View Receipt" data-ar="عرض الإيصال">View Receipt</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    name: 'finance-payments.html', title: 'الدفعات | Payments',
    content: `
      <div class="container-fluid px-0">
        <h1 class="h3 fw-bold mb-4" style="color: var(--text-primary);" data-en="Payment Methods" data-ar="طرق الدفع">Payment Methods</h1>
        
        <div class="row g-4">
          <div class="col-lg-8">
            <div class="glass-panel rounded-4 p-4 p-md-5">
              <h5 class="fw-bold mb-4" data-en="Select Payment Method" data-ar="اختر طريقة الدفع">Select Payment Method</h5>
              
              <div class="row g-3 mb-4">
                <div class="col-md-6">
                  <div class="glass-panel rounded-3 p-3 text-center payment-method-card selected">
                    <i class="bi bi-credit-card fs-2 mb-2 d-block" style="color: var(--accent-color);"></i>
                    <span class="fw-bold" data-en="Credit Card" data-ar="بطاقة ائتمان">Credit Card</span>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="glass-panel rounded-3 p-3 text-center payment-method-card">
                    <i class="bi bi-paypal fs-2 mb-2 d-block text-primary"></i>
                    <span class="fw-bold">PayPal</span>
                  </div>
                </div>
              </div>

              <form>
                <div class="mb-3">
                  <label class="form-label text-sm opacity-75" data-en="Card Number" data-ar="رقم البطاقة">Card Number</label>
                  <input type="text" class="form-control bg-transparent border text-white p-3" style="border-color: var(--separator-color);" placeholder="0000 0000 0000 0000">
                </div>
                <div class="row g-3">
                  <div class="col-6">
                    <label class="form-label text-sm opacity-75" data-en="Expiry Date" data-ar="تاريخ الانتهاء">Expiry Date</label>
                    <input type="text" class="form-control bg-transparent border text-white p-3" style="border-color: var(--separator-color);" placeholder="MM/YY">
                  </div>
                  <div class="col-6">
                    <label class="form-label text-sm opacity-75" data-en="CVC" data-ar="رمز التحقق">CVC</label>
                    <input type="text" class="form-control bg-transparent border text-white p-3" style="border-color: var(--separator-color);" placeholder="123">
                  </div>
                </div>
                <button class="btn btn-luxury w-100 py-3 mt-4 fw-bold" data-en="Save Payment Method" data-ar="حفظ طريقة الدفع">Save Payment Method</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    name: 'finance-alerts.html', title: 'الإشعارات المالية | Financial Alerts',
    content: `
      <div class="container-fluid px-0">
        <h1 class="h3 fw-bold mb-4" style="color: var(--text-primary);" data-en="Financial Alerts" data-ar="الإشعارات المالية">Financial Alerts</h1>
        
        <div class="glass-panel rounded-4 p-0 overflow-hidden">
          <div class="p-4 border-bottom alert-item d-flex gap-3 align-items-center" style="border-color: var(--separator-color) !important; background: rgba(255, 71, 87, 0.05);">
            <div class="alert-icon bg-danger bg-opacity-25 text-danger"><i class="bi bi-exclamation-triangle-fill"></i></div>
            <div class="flex-1">
              <h6 class="fw-bold mb-1 text-danger" data-en="Invoice Overdue" data-ar="فاتورة متأخرة الدفع">Invoice Overdue</h6>
              <p class="text-sm opacity-75 mb-0" data-en="Invoice INV-2023-009 is 3 days overdue. Please pay to avoid suspension." data-ar="الفاتورة INV-2023-009 متأخرة 3 أيام. يرجى السداد لتجنب الإيقاف.">Invoice is overdue.</p>
            </div>
          </div>
          
          <div class="p-4 border-bottom d-flex gap-3 align-items-center" style="border-color: var(--separator-color) !important;">
            <div class="alert-icon bg-success bg-opacity-25 text-success"><i class="bi bi-check-circle-fill"></i></div>
            <div class="flex-1">
              <h6 class="fw-bold mb-1" style="color: var(--text-primary);" data-en="Payment Received" data-ar="تم استلام الدفعة">Payment Received</h6>
              <p class="text-sm opacity-75 mb-0" data-en="Thank you! We received your payment of $150.00." data-ar="شكراً لك! استلمنا دفعتك بقيمة $150.00.">Payment received.</p>
            </div>
          </div>
        </div>
      </div>
    `
  },

  // ================= COMMUNICATION =================
  {
    name: 'comm-messages.html', title: 'الرسائل | Messages',
    content: `
      <div class="container-fluid px-0">
        <h1 class="h3 fw-bold mb-4" style="color: var(--text-primary);" data-en="Messages" data-ar="الرسائل">Messages</h1>
        
        <div class="glass-panel rounded-4 p-0 chat-container">
          <!-- Sidebar -->
          <div class="chat-sidebar d-flex flex-column">
            <div class="p-3 border-bottom" style="border-color: var(--separator-color) !important;">
              <input type="text" class="form-control bg-transparent border text-white" style="border-color: var(--separator-color);" placeholder="Search chats..." data-en="Search chats..." data-ar="ابحث في المحادثات...">
            </div>
            <div class="flex-1">
              <div class="chat-user-item active d-flex align-items-center gap-3">
                <img src="../assets/img/logo_backup.png" class="rounded-circle" style="width: 40px; height: 40px;">
                <div>
                  <h6 class="fw-bold mb-0 text-sm" style="color: var(--text-primary);" data-en="Dr. Sami Yousef" data-ar="د. سامي يوسف">Dr. Sami Yousef</h6>
                  <span class="text-xs opacity-75" data-en="Sure, we can discuss it." data-ar="بالتأكيد، يمكننا مناقشة ذلك.">Sure, we can discuss it.</span>
                </div>
              </div>
              <div class="chat-user-item d-flex align-items-center gap-3">
                <img src="../assets/img/logo_backup.png" class="rounded-circle grayscale" style="width: 40px; height: 40px;">
                <div>
                  <h6 class="fw-bold mb-0 text-sm" style="color: var(--text-primary);" data-en="Study Group A" data-ar="المجموعة الدراسية أ">Study Group A</h6>
                  <span class="text-xs opacity-75" data-en="Ahmad: Has anyone finished..." data-ar="أحمد: هل أنهى أحدكم الواجب...">Ahmad: Has anyone finished...</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Chat Area -->
          <div class="chat-area">
            <div class="p-3 border-bottom d-flex justify-content-between align-items-center" style="border-color: var(--separator-color) !important; background: rgba(0,0,0,0.2);">
              <div class="d-flex align-items-center gap-3">
                <img src="../assets/img/logo_backup.png" class="rounded-circle" style="width: 40px; height: 40px;">
                <h5 class="fw-bold mb-0" style="color: var(--text-primary);" data-en="Dr. Sami Yousef" data-ar="د. سامي يوسف">Dr. Sami Yousef</h5>
              </div>
            </div>
            
            <div class="chat-messages d-flex flex-column">
              <div class="message-bubble received">
                <span class="d-block text-sm" data-en="Hello Ahmad, did you understand chapter 3?" data-ar="أهلاً أحمد، هل فهمت الفصل الثالث جيداً؟">Hello Ahmad...</span>
                <span class="text-xs opacity-50 mt-1 d-block text-end">10:00 AM</span>
              </div>
              <div class="message-bubble sent">
                <span class="d-block text-sm" data-en="Yes Doctor, but I have a question regarding integration by parts." data-ar="نعم يا دكتور، لكن لدي سؤال بخصوص التكامل بالأجزاء.">Yes Doctor...</span>
                <span class="text-xs opacity-75 mt-1 d-block text-end">10:05 AM</span>
              </div>
              <div class="message-bubble received">
                <span class="d-block text-sm" data-en="Sure, we can discuss it in the next live session." data-ar="بالتأكيد، يمكننا مناقشة ذلك في الجلسة المباشرة القادمة.">Sure, we can discuss it.</span>
                <span class="text-xs opacity-50 mt-1 d-block text-end">10:10 AM</span>
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
    name: 'comm-announcements.html', title: 'الإعلانات | Announcements',
    content: `
      <div class="container-fluid px-0">
        <h1 class="h3 fw-bold mb-4" style="color: var(--text-primary);" data-en="Academy Announcements" data-ar="إعلانات الأكاديمية">Academy Announcements</h1>
        
        <div class="row g-4">
          <div class="col-12">
            <div class="glass-panel rounded-4 p-4 announcement-card">
              <span class="badge bg-danger mb-2" data-en="URGENT" data-ar="عاجل">URGENT</span>
              <h4 class="fw-bold mb-2" style="color: var(--text-primary);" data-en="Final Exams Schedule Released" data-ar="إصدار جدول الامتحانات النهائية">Final Exams Schedule Released</h4>
              <p class="text-sm opacity-75 mb-3" data-en="Please check the academy portal for the updated final exams schedule. Note that all exams will be held in virtual halls." data-ar="يرجى مراجعة بوابة الأكاديمية للحصول على جدول الامتحانات النهائية المحدث. جميع الامتحانات ستعقد في القاعات الافتراضية.">Please check...</p>
              <span class="text-xs opacity-50">Admin • 2 hours ago</span>
            </div>
          </div>
          <div class="col-12">
            <div class="glass-panel rounded-4 p-4 announcement-card">
              <span class="badge bg-info text-dark mb-2" data-en="UPDATE" data-ar="تحديث">UPDATE</span>
              <h4 class="fw-bold mb-2" style="color: var(--text-primary);" data-en="New Courses Available" data-ar="مواد جديدة متاحة">New Courses Available</h4>
              <p class="text-sm opacity-75 mb-3" data-en="We have added new enrichment courses for the science track. Enroll now from the Academy section." data-ar="أضفنا مواد إثرائية جديدة للمسار العلمي. بادر بالتسجيل الآن من قسم الأكاديمية.">We have added...</p>
              <span class="text-xs opacity-50">Admin • 1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    name: 'comm-notifications.html', title: 'الإشعارات | Notifications',
    content: `
      <div class="container-fluid px-0">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h1 class="h3 fw-bold mb-0" style="color: var(--text-primary);" data-en="Notifications" data-ar="الإشعارات">Notifications</h1>
          <button class="btn btn-glass border py-1 px-3 text-sm" data-en="Mark all as read" data-ar="تحديد الكل كمقروء">Mark all as read</button>
        </div>
        
        <div class="glass-panel rounded-4 p-0 overflow-hidden">
          <div class="p-3 d-flex gap-3 align-items-center notif-item unread">
            <div class="p-2 rounded-circle bg-primary bg-opacity-25 text-primary"><i class="bi bi-journal-text"></i></div>
            <div class="flex-1">
              <h6 class="fw-bold mb-1 text-sm" style="color: var(--text-primary);" data-en="New Assignment Added" data-ar="تم إضافة واجب جديد">New Assignment Added</h6>
              <p class="text-xs opacity-75 mb-0" data-en="Dr. Sami added a new assignment in Calculus." data-ar="قام د. سامي بإضافة واجب جديد في التفاضل والتكامل.">New assignment.</p>
            </div>
            <span class="text-xs opacity-50">10m ago</span>
          </div>
          <div class="p-3 d-flex gap-3 align-items-center notif-item">
            <div class="p-2 rounded-circle bg-success bg-opacity-25 text-success"><i class="bi bi-check-circle"></i></div>
            <div class="flex-1">
              <h6 class="fw-bold mb-1 text-sm" style="color: var(--text-primary);" data-en="Exam Graded" data-ar="تم رصد درجة الامتحان">Exam Graded</h6>
              <p class="text-xs opacity-75 mb-0" data-en="Your Physics Midterm has been graded." data-ar="تم رصد درجة امتحان الفيزياء النصفي الخاص بك.">Exam graded.</p>
            </div>
            <span class="text-xs opacity-50">2d ago</span>
          </div>
        </div>
      </div>
    `
  },
  {
    name: 'comm-support.html', title: 'الدعم الفني | Support',
    content: `
      <div class="container-fluid px-0">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h1 class="h3 fw-bold mb-0" style="color: var(--text-primary);" data-en="Technical Support" data-ar="الدعم الفني">Technical Support</h1>
          <button class="btn btn-luxury px-4 py-2" data-en="New Ticket" data-ar="تذكرة جديدة">+ New Ticket</button>
        </div>
        
        <div class="row g-4">
          <div class="col-12">
            <div class="glass-panel rounded-4 p-4 ticket-card">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <h5 class="fw-bold mb-0" style="color: var(--text-primary);" data-en="Video playback issue in Safari" data-ar="مشكلة تشغيل الفيديو في متصفح سفاري">Video playback issue in Safari</h5>
                <span class="badge status-open px-3 py-1 rounded-pill" data-en="Open" data-ar="مفتوحة">Open</span>
              </div>
              <p class="text-sm opacity-75 mb-3" data-en="Ticket #1024 • Submitted 2 hours ago" data-ar="تذكرة #1024 • أُرسلت منذ ساعتين">Ticket #1024</p>
              <div class="p-3 rounded bg-black/10 border" style="border-color: var(--separator-color) !important;">
                <span class="text-sm fw-bold d-block mb-1 text-accent" data-en="Support Team Response:" data-ar="رد فريق الدعم:">Support Team Response:</span>
                <p class="text-sm mb-0 opacity-75" data-en="We are investigating this issue. Please try using Chrome in the meantime." data-ar="نحن نحقق في هذه المشكلة. يرجى تجربة استخدام متصفح كروم في الوقت الحالي.">We are investigating...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },

  // ================= PROFILE =================
  {
    name: 'profile-data.html', title: 'بياناتي | My Data',
    content: `
      <div class="container-fluid px-0">
        <h1 class="h3 fw-bold mb-4" style="color: var(--text-primary);" data-en="My Profile Data" data-ar="بيانات الملف الشخصي">My Profile Data</h1>
        
        <div class="glass-panel rounded-4 p-0 overflow-hidden mb-4">
          <div class="profile-header p-5 d-flex flex-column align-items-center text-center">
            <div class="profile-avatar-wrapper mb-3">
              <img src="../assets/img/logo_backup.png" class="w-100 h-100 rounded-circle object-cover">
              <div class="edit-avatar-btn"><i class="bi bi-camera-fill"></i></div>
            </div>
            <h3 class="fw-bold mb-1" style="color: var(--text-primary);" data-en="Ahmad Mohammad" data-ar="أحمد محمد">Ahmad Mohammad</h3>
            <span class="text-sm opacity-75 badge bg-gold text-dark" data-en="Tawjihi Science Student" data-ar="طالب توجيهي علمي">Tawjihi Science Student</span>
          </div>
          
          <div class="p-4 p-md-5">
            <form class="row g-4">
              <div class="col-md-6">
                <label class="form-label text-sm opacity-75" data-en="Full Name" data-ar="الاسم الرباعي">Full Name</label>
                <input type="text" class="form-control bg-transparent border text-white p-3" style="border-color: var(--separator-color);" value="Ahmad Mohammad Ali">
              </div>
              <div class="col-md-6">
                <label class="form-label text-sm opacity-75" data-en="Email Address" data-ar="البريد الإلكتروني">Email Address</label>
                <input type="email" class="form-control bg-transparent border text-white p-3" style="border-color: var(--separator-color);" value="ahmad@example.com">
              </div>
              <div class="col-md-6">
                <label class="form-label text-sm opacity-75" data-en="Phone Number" data-ar="رقم الهاتف">Phone Number</label>
                <input type="tel" class="form-control bg-transparent border text-white p-3" style="border-color: var(--separator-color);" value="+962 79 000 0000">
              </div>
              <div class="col-md-6">
                <label class="form-label text-sm opacity-75" data-en="Date of Birth" data-ar="تاريخ الميلاد">Date of Birth</label>
                <input type="date" class="form-control bg-transparent border text-white p-3" style="border-color: var(--separator-color);" value="2005-05-15">
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
    name: 'profile-settings.html', title: 'إعدادات الحساب | Account Settings',
    content: `
      <div class="container-fluid px-0">
        <h1 class="h3 fw-bold mb-4" style="color: var(--text-primary);" data-en="Account Settings" data-ar="إعدادات الحساب">Account Settings</h1>
        
        <div class="glass-panel rounded-4 p-4 p-md-5">
          <h5 class="fw-bold mb-4" style="color: var(--accent-color);" data-en="Preferences" data-ar="التفضيلات">Preferences</h5>
          
          <div class="setting-row">
            <div>
              <h6 class="fw-bold mb-1" style="color: var(--text-primary);" data-en="Email Notifications" data-ar="إشعارات البريد الإلكتروني">Email Notifications</h6>
              <span class="text-sm opacity-75" data-en="Receive daily summary of tasks." data-ar="استلام ملخص يومي للمهام.">Receive daily summary.</span>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" checked>
            </div>
          </div>

          <div class="setting-row">
            <div>
              <h6 class="fw-bold mb-1" style="color: var(--text-primary);" data-en="SMS Alerts" data-ar="تنبيهات الرسائل القصيرة">SMS Alerts</h6>
              <span class="text-sm opacity-75" data-en="Get SMS for urgent announcements." data-ar="استلام رسائل للإعلانات العاجلة.">Get SMS for urgent announcements.</span>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox">
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
  },
  {
    name: 'profile-security.html', title: 'الأمان | Security',
    content: `
      <div class="container-fluid px-0">
        <h1 class="h3 fw-bold mb-4" style="color: var(--text-primary);" data-en="Security & Login" data-ar="الأمان وتسجيل الدخول">Security & Login</h1>
        
        <div class="row g-4">
          <div class="col-lg-6">
            <div class="glass-panel rounded-4 p-4 p-md-5 h-100">
              <div class="text-center mb-4">
                <i class="bi bi-shield-lock-fill security-shield"></i>
                <h4 class="fw-bold mt-3" style="color: var(--text-primary);" data-en="Change Password" data-ar="تغيير كلمة المرور">Change Password</h4>
              </div>
              <form>
                <div class="mb-3">
                  <input type="password" class="form-control bg-transparent border text-white p-3" style="border-color: var(--separator-color);" placeholder="Current Password" data-en="Current Password" data-ar="كلمة المرور الحالية">
                </div>
                <div class="mb-3">
                  <input type="password" class="form-control bg-transparent border text-white p-3" style="border-color: var(--separator-color);" placeholder="New Password" data-en="New Password" data-ar="كلمة المرور الجديدة">
                </div>
                <div class="mb-4">
                  <input type="password" class="form-control bg-transparent border text-white p-3" style="border-color: var(--separator-color);" placeholder="Confirm New Password" data-en="Confirm New Password" data-ar="تأكيد كلمة المرور الجديدة">
                </div>
                <button class="btn btn-luxury w-100 py-3 fw-bold" data-en="Update Password" data-ar="تحديث كلمة المرور">Update Password</button>
              </form>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="glass-panel rounded-4 p-4 p-md-5 h-100">
              <h5 class="fw-bold mb-4" style="color: var(--accent-color);" data-en="Login History" data-ar="سجل تسجيل الدخول">Login History</h5>
              
              <div class="login-history-item">
                <h6 class="fw-bold mb-1 text-sm" style="color: var(--text-primary);" data-en="Windows • Chrome" data-ar="ويندوز • كروم">Windows • Chrome</h6>
                <p class="text-xs opacity-75 mb-0" data-en="Amman, Jordan • IP: 192.168.1.1" data-ar="عمان، الأردن • IP: 192.168.1.1">Amman, Jordan</p>
                <span class="badge bg-success bg-opacity-25 text-success mt-2" data-en="Active Now" data-ar="نشط الآن">Active Now</span>
              </div>

              <div class="login-history-item">
                <h6 class="fw-bold mb-1 text-sm" style="color: var(--text-primary);" data-en="iPhone 13 • Safari" data-ar="آيفون 13 • سفاري">iPhone 13 • Safari</h6>
                <p class="text-xs opacity-75 mb-0" data-en="Amman, Jordan • IP: 10.0.0.5" data-ar="عمان، الأردن • IP: 10.0.0.5">Amman, Jordan</p>
                <span class="text-xs opacity-50 mt-2 d-block" data-en="Yesterday at 14:30" data-ar="أمس في 14:30">Yesterday at 14:30</span>
              </div>
              
              <button class="btn btn-outline-danger w-100 py-2 mt-4 text-sm fw-bold" data-en="Sign out from all devices" data-ar="تسجيل الخروج من كافة الأجهزة">Sign out from all devices</button>
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
  html = html.replace(/<title>.*?<\/title>/, '<title>' + page.title + ' | Full Mark Academy</title>');
  
  // Replace Main Content using regex literal and string concatenation
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

console.log('Remaining pages generated successfully!');
