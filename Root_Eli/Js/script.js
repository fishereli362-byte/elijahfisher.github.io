
  /*<script src="app.js" type="text/javascript"></script>

    ============================================
   VOLT & STRIDE — ENGAGE SECTION
   Watch / Enlist tab switcher
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // --- Grab all tab buttons and content panels ---
  const tabs = document.querySelectorAll('.engage-tab');
  const panels = document.querySelectorAll('.content-panel');

  // --- Tab switcher function ---
  function showContent(target) {

    // 1. Update tab button states
    tabs.forEach(function (tab) {
      tab.classList.remove('active');

      // Match the button to the clicked target by its onclick value
      if (tab.getAttribute('onclick') === "showContent('" + target + "')") {
        tab.classList.add('active');
      }
    });

    // 2. Hide all panels, then show the target panel
    panels.forEach(function (panel) {
      panel.classList.remove('active');
      panel.style.opacity = '0';
      panel.style.transform = 'translateY(12px)';
    });

    const targetPanel = document.getElementById(target + '-content');

    if (targetPanel) {
      targetPanel.classList.add('active');

      // Slight delay so the fade-in feels intentional
      setTimeout(function () {
        targetPanel.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
        targetPanel.style.opacity = '1';
        targetPanel.style.transform = 'translateY(0)';
      }, 20);
    }
  }

  // --- Attach click listeners to each tab button ---//
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {

      // Read which content to show from the onclick attribute
      const onclickVal = tab.getAttribute('onclick');
      const match = onclickVal && onclickVal.match(/showContent\('(\w+)'\)/);

      if (match) {
        showContent(match[1]);
      }
    });
  });

  // --- Keyboard accessibility: Enter / Space activates focused tab ---
  tabs.forEach(function (tab) {
    tab.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        tab.click();
      }
    });
  });

  // --- Arrow key navigation between tabs ---
  tabs.forEach(function (tab, index) {
    tab.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const next = tabs[index + 1] || tabs[0];
        next.focus();
        next.click();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = tabs[index - 1] || tabs[tabs.length - 1];
        prev.focus();
        prev.click();
      }
    });
  });

  // --- Make showContent globally available (for inline onclick= in HTML) ---
  window.showContent = showContent;

  // --- Set initial state on page load ---
  showContent('watch');

});


// --- this is the java script for the websites caralouse---/ 

const track = document.getElementById('track');
const dotsContainer = document.getElementById('dots');
const pbar = document.getElementById('pbar');
const slides = track.querySelectorAll('.slide');
const total = slides.length;
let current = 0;
let timer, progress = 0, tick;
const INTERVAL = 4000;

slides.forEach((_,i) => {
  const d = document.createElement('div');
  d.className = 'dot' + (i===0?' active':'');
  d.addEventListener('click', () => goTo(i));
  dotsContainer.appendChild(d);
});

function updateDots(){
  dotsContainer.querySelectorAll('.dot').forEach((d,i) => {
    d.classList.toggle('active', i===current);
  });
}

function goTo(n){
  current = (n + total) % total;
  track.style.transform = `translateX(-${current * 100}%)`;
  updateDots();
  resetProgress();
}

document.getElementById('prev').addEventListener('click', () => goTo(current - 1));
document.getElementById('next').addEventListener('click', () => goTo(current + 1));

track.querySelectorAll('.slide').forEach(s => {
  s.addEventListener('click', () => goTo(current + 1));
});

function resetProgress(){
  clearInterval(tick);
  clearTimeout(timer);
  progress = 0;
  pbar.style.width = '0%';
  tick = setInterval(() => {
    progress += 100 / (INTERVAL / 100);
    if(progress >= 100) progress = 100;
    pbar.style.width = Math.round(progress) + '%';
  }, 100);
  timer = setTimeout(() => goTo(current + 1), INTERVAL);
}

resetProgress();

let startX = 0;
track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
track.addEventListener('touchend', e => {
  const diff = startX - e.changedTouches[0].clientX;
  if(Math.abs(diff) > 40) goTo(current + (diff > 0 ? 1 : -1));
});


// user persona Java scrip to make it go 6 seconds everyslide between my cv and User persoan -- // 

(function () {
  // ── Config ───────────────────────────────────────────
  const INTERVAL_MS = 6000;   // auto-advance every 6 seconds
  // ────────────────────────────────────────────────────

  const track    = document.getElementById('carouselTrack');
  const slides   = Array.from(track.querySelectorAll('.carousel-slide'));
  const dotsWrap = document.getElementById('carouselDots');
  const fill     = document.getElementById('progressFill');
  const prevBtn  = document.getElementById('prevBtn');
  const nextBtn  = document.getElementById('nextBtn');

  let current = 0;
  let timer   = null;

  // Build dots dynamically
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.addEventListener('click', () => { goTo(i); restartTimer(); });
    dotsWrap.appendChild(dot);
  });

  const dots = Array.from(dotsWrap.querySelectorAll('.carousel-dot'));

  // Move to a specific slide
  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');

    current = (index + slides.length) % slides.length;

    track.style.transform = `translateX(-${current * 100}%)`;
    slides[current].classList.add('active');
    dots[current].classList.add('active');

    resetProgress();
  }

  // Arrow buttons
  prevBtn.addEventListener('click', () => { goTo(current - 1); restartTimer(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); restartTimer(); });

  // Progress bar
  function resetProgress() {
    fill.style.transition = 'none';
    fill.style.width = '0%';
    void fill.offsetWidth; // force reflow
    fill.style.transition = `width ${INTERVAL_MS / 1000}s linear`;
    fill.style.width = '100%';
  }

  // Timer
  function startTimer() {
    timer = setInterval(() => goTo(current + 1), INTERVAL_MS);
  }

  function restartTimer() {
    clearInterval(timer);
    startTimer();
  }

  // Pause on hover
  const wrapper = document.querySelector('.carousel-wrapper');
  wrapper.addEventListener('mouseenter', () => {
    clearInterval(timer);
    fill.style.transition = 'none'; // freeze bar
  });
  wrapper.addEventListener('mouseleave', () => {
    restartTimer();
    resetProgress();
  });

  // Keyboard arrows
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  { goTo(current - 1); restartTimer(); }
    if (e.key === 'ArrowRight') { goTo(current + 1); restartTimer(); }
  });

  // Touch / swipe
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? current + 1 : current - 1);
      restartTimer();
    }
  }, { passive: true });

  // Kick off
  resetProgress();
  startTimer();

})();

// end of user perona //


