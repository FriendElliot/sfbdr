// ========== SCROLL PROGRESS BAR ==========
const progressFill = document.querySelector('.progress-bar-fill');
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressFill.style.width = pct + '%';
});

// ========== SIDEBAR ACTIVE LINK ==========
const sections = document.querySelectorAll('.guide-section');
const sidebarLinks = document.querySelectorAll('.sidebar-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
        const top = s.offsetTop - 120;
        if (window.scrollY >= top) current = s.id;
    });
    sidebarLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for sidebar links
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            // Close mobile sidebar
            document.querySelector('.sidebar').classList.remove('open');
        }
    });
});

// ========== MOBILE SIDEBAR ==========
const mobileBtn = document.querySelector('.mobile-sidebar-toggle');
const sidebar = document.querySelector('.sidebar');
if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });
}

// ========== OBJECTION ACCORDION ==========
document.querySelectorAll('.objection-q').forEach(q => {
    q.addEventListener('click', () => {
        const item = q.closest('.objection-item');
        const wasOpen = item.classList.contains('open');
        // Close all
        document.querySelectorAll('.objection-item').forEach(i => i.classList.remove('open'));
        // Toggle current
        if (!wasOpen) item.classList.add('open');
    });
});

// ========== CHECKLIST ==========
document.querySelectorAll('.check-item').forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('checked');
        const box = item.querySelector('.check-box');
        box.textContent = item.classList.contains('checked') ? '✓' : '';
    });
});

// ========== SCROLL ANIMATIONS ==========
const animEls = document.querySelectorAll('[data-anim]');
const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => entry.target.classList.add('visible'), parseInt(delay));
            animObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
animEls.forEach(el => animObserver.observe(el));
