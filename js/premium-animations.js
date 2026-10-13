/**
 * ═══════════════════════════════════════════════════════════════
 *  PREMIUM PORTFOLIO — Global Animation Engine v2.0
 *  Loaded on every page. Drives all visual effects globally.
 * ═══════════════════════════════════════════════════════════════
 */

(() => {
    'use strict';

    /* ─────────────────────────────────────────────
     * 0. INIT GUARD — run after DOM is ready
     * ───────────────────────────────────────────── */
    const ready = (fn) => {
        if (document.readyState !== 'loading') fn();
        else document.addEventListener('DOMContentLoaded', fn);
    };

    ready(() => {
        initScrollProgress();
        initStickyNav();
        initScrollReveal();
        initGlowCards();
        initTiltCards();
        initRippleButtons();
        initCursorSpotlight();
        initAnimatedCounters();
        initPageTransitions();
        initStaggerGroups();
        initSpotlightSections();
        initTypedSubtitle();
        initMagneticButtons();
        initNavActiveLinks();
    });

    /* ─────────────────────────────────────────────
     * 1. SCROLL PROGRESS BAR
     * ───────────────────────────────────────────── */
    function initScrollProgress() {
        const bar = document.createElement('div');
        bar.id = 'scroll-progress';
        document.body.prepend(bar);

        const update = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            bar.style.width = pct + '%';
        };
        window.addEventListener('scroll', update, { passive: true });
        update();
    }

    /* ─────────────────────────────────────────────
     * 2. STICKY NAV GLASSMORPHISM ON SCROLL
     * ───────────────────────────────────────────── */
    function initStickyNav() {
        const header = document.querySelector('header');
        if (!header) return;

        const handler = () => {
            if (window.scrollY > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handler, { passive: true });
        handler();
    }

    /* ─────────────────────────────────────────────
     * 3. INTERSECTION OBSERVER — SCROLL REVEAL
     *    Handles: .reveal, .reveal-left, .reveal-right, .reveal-scale,
     *             .animated-underline, .list-stagger, .card-stagger-group
     * ───────────────────────────────────────────── */
    function initScrollReveal() {
        const targets = document.querySelectorAll(
            '.reveal, .reveal-left, .reveal-right, .reveal-scale, ' +
            '.animated-underline, .list-stagger, .card-stagger-group'
        );
        if (!targets.length) return;

        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Don't unobserve animated-underline so it re-triggers if scrolled away
                    if (!entry.target.classList.contains('animated-underline')) {
                        obs.unobserve(entry.target);
                    }
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

        targets.forEach(el => obs.observe(el));
    }

    /* ─────────────────────────────────────────────
     * 4. GLOW CARDS — Mouse-position radial glow
     * ───────────────────────────────────────────── */
    function initGlowCards() {
        const cards = document.querySelectorAll('.glow-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                card.style.setProperty('--mouse-x', x + '%');
                card.style.setProperty('--mouse-y', y + '%');
            });
        });
    }

    /* ─────────────────────────────────────────────
     * 5. TILT CARDS — 3D perspective tilt on hover
     * ───────────────────────────────────────────── */
    function initTiltCards() {
        const cards = document.querySelectorAll('.tilt-card');
        const MAX_TILT = 12;

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dx = (e.clientX - cx) / (rect.width / 2);
                const dy = (e.clientY - cy) / (rect.height / 2);
                const rotX = -dy * MAX_TILT;
                const rotY = dx * MAX_TILT;
                card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
            });
        });
    }

    /* ─────────────────────────────────────────────
     * 6. RIPPLE EFFECT on click for .ripple-btn
     * ───────────────────────────────────────────── */
    function initRippleButtons() {
        document.addEventListener('click', (e) => {
            // Guard: Never inject ripple into navigation elements or CTA
            if (e.target.closest('#main-nav-header, #main-nav-container, .lets-connect-btn, .sound-toggle, #mobile-menu')) return;

            // Only apply ripple to elements explicitly designated as .ripple-btn
            const btn = e.target.closest('.ripple-btn');
            if (!btn) return;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                pointer-events: none;
                width: ${size}px; height: ${size}px;
                left: ${e.clientX - rect.left - size / 2}px;
                top: ${e.clientY - rect.top - size / 2}px;
            `;
            
            // Only add if button has relative positioning
            const pos = getComputedStyle(btn).position;
            if (pos === 'relative' || pos === 'absolute' || pos === 'fixed') {
                btn.appendChild(ripple);
                const cleanup = () => { if (ripple.parentNode) ripple.remove(); };
                ripple.addEventListener('animationend', cleanup);
                setTimeout(cleanup, 650); // Fallback to guarantee cleanup
            }
        });
    }

    /* ─────────────────────────────────────────────
     * 7. CURSOR SPOTLIGHT (subtle glow following mouse)
     * ───────────────────────────────────────────── */
    function initCursorSpotlight() {
        const spotlight = document.createElement('div');
        spotlight.id = 'cursor-spotlight';
        document.body.appendChild(spotlight);

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let currentX = mouseX;
        let currentY = mouseY;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth lag follow
        const lerp = (start, end, t) => start + (end - start) * t;
        let frame;
        const tick = () => {
            currentX = lerp(currentX, mouseX, 0.08);
            currentY = lerp(currentY, mouseY, 0.08);
            spotlight.style.left = currentX + 'px';
            spotlight.style.top = currentY + 'px';
            frame = requestAnimationFrame(tick);
        };
        tick();

        // Hide spotlight when mouse leaves
        document.addEventListener('mouseleave', () => {
            spotlight.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            spotlight.style.opacity = '1';
        });
    }

    /* ─────────────────────────────────────────────
     * 8. ANIMATED COUNTERS (count up on scroll)
     * ───────────────────────────────────────────── */
    function initAnimatedCounters() {
        const counters = document.querySelectorAll('[data-counter]');
        if (!counters.length) return;

        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const target = parseFloat(el.dataset.counter);
                const duration = parseInt(el.dataset.duration || '1500', 10);
                const suffix = el.dataset.suffix || '';
                const prefix = el.dataset.prefix || '';
                const isFloat = target % 1 !== 0;
                const start = performance.now();

                const tick = (now) => {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 4);
                    const value = target * eased;
                    el.textContent = prefix + (isFloat ? value.toFixed(1) : Math.floor(value)) + suffix;
                    if (progress < 1) requestAnimationFrame(tick);
                    else {
                        el.textContent = prefix + (isFloat ? target.toFixed(1) : target) + suffix;
                        el.classList.add('counter-pop');
                        setTimeout(() => el.classList.remove('counter-pop'), 300);
                    }
                };
                requestAnimationFrame(tick);
                obs.unobserve(el);
            });
        }, { threshold: 0.5 });

        counters.forEach(el => obs.observe(el));
    }

    /* ─────────────────────────────────────────────
     * 9. PAGE TRANSITIONS (smooth exit on nav)
     * ───────────────────────────────────────────── */
    function initPageTransitions() {
        document.querySelectorAll('a[href]').forEach(link => {
            const href = link.getAttribute('href');
            // Only internal same-origin links
            if (!href || href.startsWith('#') || href.startsWith('mailto') ||
                href.startsWith('http') || href.startsWith('javascript')) return;

            link.addEventListener('click', (e) => {
                e.preventDefault();
                const main = document.querySelector('main, body > .relative');
                if (main) {
                    main.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    main.style.opacity = '0';
                    main.style.transform = 'translateY(-12px)';
                }
                setTimeout(() => { window.location.href = href; }, 300);
            });
        });

        // Fade in on load
        const main = document.querySelector('main, body > .relative');
        if (main) {
            main.style.opacity = '0';
            main.style.transform = 'translateY(12px)';
            main.style.transition = 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s';
            requestAnimationFrame(() => {
                main.style.opacity = '1';
                main.style.transform = 'translateY(0)';
            });
        }
    }

    /* ─────────────────────────────────────────────
     * 10. STAGGER GROUPS (card grids)
     * ───────────────────────────────────────────── */
    function initStaggerGroups() {
        const groups = document.querySelectorAll('.card-stagger-group');
        if (!groups.length) return;

        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        groups.forEach(g => obs.observe(g));
    }

    /* ─────────────────────────────────────────────
     * 11. SPOTLIGHT SECTIONS
     * ───────────────────────────────────────────── */
    function initSpotlightSections() {
        const sections = document.querySelectorAll('.spotlight-section');
        sections.forEach(section => {
            const dot = document.createElement('div');
            dot.className = 'spotlight';
            section.appendChild(dot);

            section.addEventListener('mousemove', (e) => {
                const rect = section.getBoundingClientRect();
                dot.style.left = (e.clientX - rect.left) + 'px';
                dot.style.top = (e.clientY - rect.top) + 'px';
            });
        });
    }

    /* ─────────────────────────────────────────────
     * 12. TYPED SUBTITLE (hero subtitle rotation)
     * ───────────────────────────────────────────── */
    function initTypedSubtitle() {
        const el = document.getElementById('typed-subtitle');
        if (!el) return;

        const phrases = (el.dataset.phrases || '').split('|').map(s => s.trim()).filter(Boolean);
        if (!phrases.length) return;

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let pauseTimer = null;

        const cursor = document.createElement('span');
        cursor.className = 'typed-cursor';
        el.parentNode.insertBefore(cursor, el.nextSibling);

        const type = () => {
            const phrase = phrases[phraseIndex];
            if (!isDeleting) {
                charIndex++;
                el.textContent = phrase.slice(0, charIndex);
                if (charIndex === phrase.length) {
                    isDeleting = true;
                    pauseTimer = setTimeout(type, 2200);
                    return;
                }
            } else {
                charIndex--;
                el.textContent = phrase.slice(0, charIndex);
                if (charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                }
            }
            const speed = isDeleting ? 38 : 65;
            pauseTimer = setTimeout(type, speed);
        };

        type();
    }

    /* ─────────────────────────────────────────────
     * 13. MAGNETIC BUTTONS
     * ───────────────────────────────────────────── */
    function initMagneticButtons() {
        const btns = document.querySelectorAll('.magnetic');
        const STRENGTH = 0.35;

        btns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dx = (e.clientX - cx) * STRENGTH;
                const dy = (e.clientY - cy) * STRENGTH;
                btn.style.transform = `translate(${dx}px, ${dy}px) scale(1.04)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

    /* ─────────────────────────────────────────────
     * 14. NAV ACTIVE LINK HIGHLIGHTING
     * ───────────────────────────────────────────── */
    function initNavActiveLinks() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('nav a[href]').forEach(link => {
            const linkPath = link.getAttribute('href').split('/').pop();
            if (linkPath === currentPath) {
                link.classList.add('active');
                link.style.color = 'var(--main-color, #0ea5e9)';
            }
        });
    }

})();


/* ─────────────────────────────────────────────────────────
 * GLOBAL UTILITY — exposed for manual usage from HTML
 * ───────────────────────────────────────────────────────── */

/**
 * Trigger sparkle burst at a DOM element (call on button click etc.)
 */
window.triggerSparkle = function(el) {
    const rect = el.getBoundingClientRect();
    const count = 8;
    for (let i = 0; i < count; i++) {
        const spark = document.createElement('div');
        spark.className = 'sparkle';
        const size = Math.random() * 8 + 4;
        const angle = (i / count) * 360;
        const dist = Math.random() * 40 + 20;
        const rad = angle * (Math.PI / 180);
        const sx = rect.left + rect.width / 2 + Math.cos(rad) * dist;
        const sy = rect.top + rect.height / 2 + Math.sin(rad) * dist + window.scrollY;
        spark.style.cssText = `
            width: ${size}px; height: ${size}px;
            left: ${sx}px; top: ${sy}px;
            position: absolute;
            z-index: 9999;
            background: radial-gradient(circle, #fff 30%, transparent 80%);
        `;
        document.body.appendChild(spark);
        spark.addEventListener('animationend', () => spark.remove());
    }
};

/**
 * Animate a number counter from 0 to value instantly
 */
window.animateCounter = function(el, target, duration = 1200, suffix = '') {
    const start = performance.now();
    const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(target * eased) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target + suffix;
    };
    requestAnimationFrame(tick);
};
