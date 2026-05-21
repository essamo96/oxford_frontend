/* landing.js */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header Scroll Effect
  const header = document.getElementById('header-nav');
  
  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Init on page load

  // 2. Mobile Menu Drawer Controls
  const menuToggleBtn = document.getElementById('mobileMenuToggle');
  const mobileNavMenu = document.getElementById('mobileNavMenu');
  const backdrop = document.getElementById('mobileMenuBackdrop');
  const closeBtn = document.getElementById('closeMobileMenu');

  function openMobileMenu() {
    mobileNavMenu.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock body scroll
  }

  function closeMobileMenu() {
    mobileNavMenu.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = ''; // Unlock body scroll
  }

  if (menuToggleBtn && mobileNavMenu && backdrop) {
    menuToggleBtn.addEventListener('click', openMobileMenu);
    backdrop.addEventListener('click', closeMobileMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMobileMenu);
  }

  // Close mobile menu on clicking any link
  const mobileLinks = document.querySelectorAll('#mobileNavMenu a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // 3. Smooth Anchor Scrolling
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return; // ignore top-of-page anchors
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Calculate header offset height
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL hash (without jumping)
        history.pushState(null, null, targetId);
      }
    });
  });

  // 4. Set Active Navigation Item on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav-link');

  function highlightNavigation() {
    const scrollPos = window.scrollY + 120; // threshold
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavigation);
  highlightNavigation(); // Run on load
});
