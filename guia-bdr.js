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

// ========== BDR CALCULATOR ==========
(function() {
    let revenueType = 'monthly'; // 'monthly' or 'annual'
    let durationType = 'months'; // 'months' or 'years'

    const calcRevenue = document.getElementById('calcRevenue');
    const calcDuration = document.getElementById('calcDuration');
    const calcBtn = document.getElementById('calcBtn');
    const calcPlaceholder = document.getElementById('calcPlaceholder');
    const calcResultContent = document.getElementById('calcResultContent');
    const calcResetBtn = document.getElementById('calcResetBtn');

    // If calculator elements don't exist, skip
    if (!calcRevenue || !calcBtn) return;

    // Revenue toggle
    document.querySelectorAll('[data-calc-rev]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('[data-calc-rev]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            revenueType = btn.dataset.calcRev;
            calcRevenue.placeholder = revenueType === 'monthly' ? '0,00' : '0,00';
        });
    });

    // Duration toggle
    document.querySelectorAll('[data-calc-dur]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('[data-calc-dur]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            durationType = btn.dataset.calcDur;
            calcDuration.placeholder = durationType === 'months' ? '60' : '5';
            calcDuration.max = durationType === 'months' ? '600' : '50';
        });
    });

    // Currency formatting for revenue input
    calcRevenue.addEventListener('input', () => {
        let raw = calcRevenue.value.replace(/\D/g, '');
        if (raw === '') { calcRevenue.value = ''; return; }
        let num = parseInt(raw) / 100;
        calcRevenue.value = num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    });

    // Format currency for display
    function formatCurrency(value) {
        return 'R$ ' + value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    // Parse currency input
    function parseRevenue() {
        let raw = calcRevenue.value.replace(/\./g, '').replace(',', '.');
        return parseFloat(raw) || 0;
    }

    // Calculate
    calcBtn.addEventListener('click', () => {
        const revenue = parseRevenue();
        const duration = parseFloat(calcDuration.value) || 0;

        if (revenue <= 0 || duration <= 0) {
            calcRevenue.style.borderColor = revenue <= 0 ? 'rgba(248,113,113,0.5)' : '';
            calcDuration.parentElement.style.borderColor = duration <= 0 ? 'rgba(248,113,113,0.5)' : '';
            setTimeout(() => {
                calcRevenue.style.borderColor = '';
                if (calcDuration.parentElement) calcDuration.parentElement.style.borderColor = '';
            }, 1500);
            return;
        }

        // Convert to monthly revenue
        let monthlyRevenue = revenueType === 'annual' ? revenue / 12 : revenue;

        // Convert duration to months
        let totalMonths = durationType === 'years' ? duration * 12 : duration;

        // Cap at 60 months
        let consideredMonths = Math.min(totalMonths, 60);

        // Total revenue in period
        let totalRevenue = monthlyRevenue * consideredMonths;

        // Base = 60% of total
        let base = totalRevenue * 0.60;

        // X = base * 9%, Y = base * 14%
        let minValue = base * 0.09;
        let maxValue = base * 0.14;

        // Display results
        document.getElementById('calcMin').textContent = formatCurrency(minValue);
        document.getElementById('calcMax').textContent = formatCurrency(maxValue);
        document.getElementById('calcTotalRev').textContent = formatCurrency(totalRevenue);
        document.getElementById('calcBase').textContent = formatCurrency(base);
        document.getElementById('calcPeriod').textContent = consideredMonths + ' meses' + (totalMonths > 60 ? ' (limitado de ' + Math.round(totalMonths) + ')' : '');

        // Show results
        calcPlaceholder.style.display = 'none';
        calcResultContent.style.display = 'block';

        // Pulse animation
        const rangeEl = document.querySelector('.calc-result-range');
        rangeEl.classList.remove('animate');
        void rangeEl.offsetWidth; // force reflow
        rangeEl.classList.add('animate');
    });

    // Reset
    calcResetBtn.addEventListener('click', () => {
        calcRevenue.value = '';
        calcDuration.value = '';
        calcPlaceholder.style.display = '';
        calcResultContent.style.display = 'none';
    });
})();

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

