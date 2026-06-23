# Academic Management Dashboard - Site Documentation

This file documents the site vision, structure, and development roadmap for the **Full Mark Academy / Academic Management Dashboard**.

---

## 1. Site Vision
A premium academic management platform for students and teachers of Full Mark Academy. The platform uses a high-end luxury dark-gold design theme, providing dashboard insights, course management, digital library access, financial reports, exam sessions, and communication features.

---

## 2. Technical Stack
- Core: Plain HTML5, Bootstrap 5.3, Tailwind CSS (via config), custom CSS (themes, animations)
- Scripting: Vanilla JS (theme-manager.js, animations.js, scroll-effects.js)
- Styling: Custom HSL-tailored premium gold theme variable system (`DESIGN.md` guidelines)

---

## 3. Stitch Project Metadata
- **Project Title**: Academic Management Dashboard
- **Stitch Project ID**: `17280925588435731398`
- **Device Type**: Desktop

---

## 4. Sitemap (Imported Pages)
Below are the pages successfully imported from Stitch:

- [x] **Main Dashboard** (`dashboard.html`) - Overview of courses, notifications, quick statistics, and recent activity.
- [x] **Courses / Academy** (`academy.html`) - Academic courses, enrollment portal, and course schedules.
- [x] **Test / Exam Session** (`test-session.html`) - Interactive testing interface, time tracking, and question sheets.
- [x] **Student Profile** (`profile.html`) - Manage user settings, preferences, and personal academic records.
- [x] **Digital Library** (`library.html`) - Access to digital academic resources, books, and lecture notes.
- [x] **Financial Management** (`financials.html`) - Tuition payment logs, subscription invoices, and payment portals.
- [x] **Performance Reports** (`reports.html`) - Grade books, GPA progressions, and detailed subject analysis.
- [x] **Conversations / Chat** (`conversations.html`) - Real-time student-teacher messaging interface.
- [x] **Student Login** (`student-login.html`) - Login screen for student portal.
- [x] **Teacher Login** (`teacher-login.html`) - Login screen for teacher and staff portal.
- [x] **Student Registration** (`student-register.html`) - Form to register new students with personal details and branch selection.

---

## 5. Development Roadmap & Tasks
1. [ ] **Integrate Global Navigation**: Link all `.stitch/designs/*.html` pages into a single cohesive navigation flow.
2. [ ] **Apply CSS Design Tokens**: Refine the downloaded HTML structures to utilize CSS custom properties defined in `DESIGN.md`.
3. [ ] **Dynamic Theme Cycling**: Implement the interactive theme manager (`theme-manager.js`) across all imported screens.
4. [ ] **Add Micro-Animations**: Implement floating background shapes and scroll reveal triggers on the dashboard and inner pages.
