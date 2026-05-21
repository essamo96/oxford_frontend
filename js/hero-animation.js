/* ============================================================
   Hero two-video intro -> static 4K image -> staggered content reveal
   Sequence:
     1. Preload video1, video2, still image
     2. Play video1 (last_vidio.mp4)
     3. Before video1 ends -> crossfade-start video2 (ezgif-...)
     4. When video2 ends -> crossfade to still 4K image
     5. THEN reveal hero content elements one by one
     6. Unlock scroll + activate IntersectionObserver for sections
   ============================================================ */
(() => {
  'use strict';

  // Begin video2 this many seconds before video1 ends, so they crossfade.
  const CROSSFADE_LEAD_SEC = 0.9;
  const SAFETY_TIMEOUT_MS  = 25000;
  const REDUCED_MOTION     = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const html      = document.documentElement;
  const preloader = document.getElementById('hero-preloader');
  const barFill   = document.getElementById('hero-preloader-fill');
  const pctEl     = document.getElementById('hero-preloader-pct');
  const v1        = document.getElementById('hero-bg-video-1');
  const v2        = document.getElementById('hero-bg-video-2');
  const still     = document.getElementById('hero-bg-still');
  const overlay   = document.getElementById('hero-content-overlay');

  if (!v1 || !v2 || !overlay) return;

  html.classList.add('hero-loading');

  // -- Preload helpers -------------------------------------------------------
  function whenVideoReady(v) {
    return new Promise((resolve) => {
      if (v.readyState >= 3) return resolve();
      const done = () => resolve();
      v.addEventListener('canplay',     done, { once: true });
      v.addEventListener('loadeddata',  done, { once: true });
      setTimeout(done, SAFETY_TIMEOUT_MS);
    });
  }
  function whenImageReady(img) {
    return new Promise((resolve) => {
      if (img.complete && img.naturalWidth) return resolve();
      img.addEventListener('load',  resolve, { once: true });
      img.addEventListener('error', resolve, { once: true });
      setTimeout(resolve, SAFETY_TIMEOUT_MS);
    });
  }

  // -- Combined preload progress UI -----------------------------------------
  function updateProgress(ratio) {
    const pct = Math.max(0, Math.min(100, Math.round(ratio * 100)));
    if (barFill) barFill.style.width = pct + '%';
    if (pctEl)   pctEl.textContent  = pct + '%';
  }

  function preloadAll() {
    const tasks = [
      whenVideoReady(v1),
      whenVideoReady(v2),
      whenImageReady(still),
    ];
    let done = 0;
    tasks.forEach(p => p.then(() => updateProgress(++done / tasks.length)));
    return Promise.all(tasks);
  }

  // -- Crossfade orchestration ---------------------------------------------
  function startVideo2BeforeEnd() {
    return new Promise((resolve) => {
      let triggered = false;

      function trigger() {
        if (triggered) return;
        triggered = true;
        // Start video2 just before video1 finishes & swap the active layer.
        v2.currentTime = 0;
        const p = v2.play();
        if (p && p.catch) p.catch(() => {});
        v2.classList.add('is-active');
        v1.classList.remove('is-active');
        // Resolve when video2 has actually ended.
        v2.addEventListener('ended', resolve, { once: true });

        // Safety: also resolve based on duration.
        const safetyMs = (isFinite(v2.duration) ? v2.duration * 1000 : 8000) + 1500;
        setTimeout(resolve, safetyMs);
      }

      function onTimeUpdate() {
        if (!isFinite(v1.duration)) return;
        if (v1.duration - v1.currentTime <= CROSSFADE_LEAD_SEC) {
          trigger();
          v1.removeEventListener('timeupdate', onTimeUpdate);
        }
      }
      v1.addEventListener('timeupdate', onTimeUpdate);
      // If 'ended' fires first (very short video), still chain to video2.
      v1.addEventListener('ended', trigger, { once: true });
    });
  }

  function fadeToStill() {
    return new Promise((resolve) => {
      still.classList.add('is-active');
      v2.classList.remove('is-active');
      // Match the CSS transition (1.1s) plus a small buffer.
      setTimeout(() => {
        try { v1.pause(); v2.pause(); } catch (_) {}
        resolve();
      }, 1200);
    });
  }

  // -- Reveal content (staggered) ------------------------------------------
  function revealContent() {
    overlay.classList.add('is-revealed');
    html.classList.remove('hero-loading');
    html.classList.add('hero-done');
    window.dispatchEvent(new CustomEvent('hero:complete'));
  }

  // -- Global section reveal via IntersectionObserver ----------------------
  function initSectionReveal() {
    const targets = document.querySelectorAll(
      'section:not(#hero), footer, .section-separator'
    );
    targets.forEach(el => el.classList.add('io-reveal'));

    if (!('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('is-in-view'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in-view');
          io.unobserve(entry.target);
        }
      });
    }, { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    targets.forEach(el => io.observe(el));
  }

  // -- Orchestrate ----------------------------------------------------------
  async function run() {
    initSectionReveal();

    await preloadAll();
    if (preloader) preloader.classList.add('is-hidden');

    if (REDUCED_MOTION) {
      v1.classList.remove('is-active');
      still.classList.add('is-active');
      revealContent();
      return;
    }

    // Kick off video1 (autoplay attribute may already have started it).
    const p1 = v1.play();
    if (p1 && p1.catch) p1.catch(() => {});

    // Wait until video2 ends (which means the entire video sequence is done).
    await startVideo2BeforeEnd();

    // Crossfade to the static 4K image.
    await fadeToStill();

    // Only NOW reveal the centered content one element after another.
    revealContent();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }
})();
