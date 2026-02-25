// ===== MOBILE MENU =====
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });
}

if (navOverlay) {
  navOverlay.addEventListener('click', () => {
    mobileToggle.classList.remove('active');
    navLinks.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
}

// Close mobile menu on nav link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      mobileToggle.classList.remove('active');
      navLinks.classList.remove('active');
      navOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const isActive = item.classList.contains('active');

    // Close all other items
    document.querySelectorAll('.faq-item.active').forEach(activeItem => {
      if (activeItem !== item) {
        activeItem.classList.remove('active');
        activeItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      }
    });

    // Toggle current item
    item.classList.toggle('active');
    button.setAttribute('aria-expanded', !isActive);
  });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
  root: null,
  rootMargin: '0px 0px -50px 0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

const navbar = document.getElementById('navbar');

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const navHeight = navbar ? navbar.offsetHeight : 0;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== VIDEO DEMO MODAL =====
const demoBtn = document.getElementById('demoBtn');
const videoModal = document.getElementById('videoModal');
const videoModalClose = document.getElementById('videoModalClose');
const vimeoPlayer = document.getElementById('vimeoPlayer');
const vimeoSrc = 'https://player.vimeo.com/video/1168076498?badge=0&autopause=0&player_id=0&app_id=58479';

function openVideoModal() {
  vimeoPlayer.src = vimeoSrc;
  videoModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  videoModal.classList.remove('active');
  vimeoPlayer.src = '';
  document.body.style.overflow = '';
}

if (demoBtn) {
  demoBtn.addEventListener('click', openVideoModal);
}

if (videoModalClose) {
  videoModalClose.addEventListener('click', closeVideoModal);
}

if (videoModal) {
  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) closeVideoModal();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && videoModal && videoModal.classList.contains('active')) {
    closeVideoModal();
  }
});
