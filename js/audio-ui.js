/**
 * Audio UI Micro-Interactions Engine
 * ────────────────────────────────────────
 * Uses the Web Audio API to generate soft, futuristic UI feedback sounds.
 * Zero external downloads. Includes visual ripple on click as a bonus premium effect.
 * Toggle state persisted to localStorage.
 */

(function () {
    'use strict';

    let audioCtx = null;
    // Default: muted. User must opt in by clicking the sound toggle.
    let isMuted = localStorage.getItem('portfolio_sound_enabled') !== 'true';

    /** Lazily create or resume the AudioContext */
    function getCtx() {
        if (!audioCtx) {
            const AC = window.AudioContext || window.webkitAudioContext;
            if (!AC) return null;
            audioCtx = new AC();
        }
        if (audioCtx.state === 'suspended') audioCtx.resume();
        return audioCtx;
    }

    /**
     * Play a short tone with given parameters.
     * @param {number} freq1  Start frequency (Hz)
     * @param {number} freq2  End frequency (Hz)
     * @param {number} vol    Peak gain (0-1, keep very low: ~0.01–0.04)
     * @param {number} dur    Duration in seconds
     * @param {string} type   OscillatorType: 'sine' | 'triangle' | 'square'
     */
    function playTone(freq1, freq2, vol, dur, type) {
        if (isMuted) return;
        const ctx = getCtx();
        if (!ctx) return;
        try {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type || 'sine';
            osc.frequency.setValueAtTime(freq1, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(freq2, ctx.currentTime + dur);
            gain.gain.setValueAtTime(vol, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + dur);
        } catch (_) {}
    }

    // Sound presets
    const sounds = {
        hover: () => playTone(660, 880, 0.012, 0.035, 'sine'),
        click: () => playTone(500, 280, 0.025, 0.06, 'triangle'),
        toggle: () => playTone(800, 1200, 0.02, 0.08, 'sine'),
        navigate: () => playTone(440, 660, 0.018, 0.1, 'triangle'),
    };

    /** Create a ripple effect at click position on an element */
    function spawnRipple(e) {
        const target = e.currentTarget || e.target;
        if (!target || typeof target.getBoundingClientRect !== 'function') return;
        if (target.style.position === '' || target.style.position === 'static') {
            target.style.position = 'relative';
        }
        target.style.overflow = 'hidden';

        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const size = Math.max(rect.width, rect.height) * 2;

        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255,255,255,0.18);
            width: ${size}px;
            height: ${size}px;
            left: ${x - size / 2}px;
            top: ${y - size / 2}px;
            transform: scale(0);
            animation: _ripple-anim 0.5s linear forwards;
            pointer-events: none;
            z-index: 9999;
        `;
        target.appendChild(ripple);
        setTimeout(() => ripple.remove(), 550);
    }

    /** Inject ripple keyframes if not already present */
    function ensureRippleStyles() {
        if (document.getElementById('audio-ui-ripple-style')) return;
        const style = document.createElement('style');
        style.id = 'audio-ui-ripple-style';
        style.textContent = `
            @keyframes _ripple-anim {
                to { transform: scale(1); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    /** Update all sound toggle buttons in the DOM to reflect current state */
    function syncToggleButtons() {
        document.querySelectorAll('.sound-toggle').forEach(btn => {
            const icon = btn.querySelector('.material-symbols-outlined');
            if (icon) icon.textContent = isMuted ? 'volume_off' : 'volume_up';
            btn.title = isMuted ? 'Enable Sound FX' : 'Mute Sound FX';
            btn.setAttribute('aria-label', btn.title);
            btn.classList.toggle('text-primary', !isMuted);
        });
    }

    /** Public: toggle the sound on/off */
    function toggleSound() {
        isMuted = !isMuted;
        localStorage.setItem('portfolio_sound_enabled', String(!isMuted));
        syncToggleButtons();
        if (!isMuted) sounds.toggle();
    }

    /** Throttle helper – limits how often a fn fires */
    function throttle(fn, delay) {
        let last = 0;
        return function (...args) {
            const now = Date.now();
            if (now - last >= delay) { last = now; fn.apply(this, args); }
        };
    }

    /** Attach all global event listeners */
    function init() {
        ensureRippleStyles();
        syncToggleButtons();

        const HOVER_TARGETS = 'button, a[href], .filter-btn, .project-item, label[for]';
        const CLICK_TARGETS = 'button, a[href], .filter-btn, .project-item';

        // Hover sound (throttled to 80ms to avoid spam)
        document.addEventListener('mouseover', throttle(e => {
            if (e.target.closest(HOVER_TARGETS) && !e.target.closest('.sound-toggle')) {
                sounds.hover();
            }
        }, 80));

        // Click sound + ripple
        document.addEventListener('click', e => {
            const target = e.target.closest(CLICK_TARGETS);
            if (!target) return;

            // Initialise audio on first click (satisfies browser autoplay policy)
            getCtx();

            if (target.classList.contains('sound-toggle')) return; // handled separately

            // Determine sound variant
            const isNavLink = target.tagName === 'A' && target.getAttribute('href');
            if (isNavLink) sounds.navigate();
            else sounds.click();

            // Do not inject visual ripples into navbar items
            if (!target.closest('#main-nav-header, #main-nav-container, .lets-connect-btn, .sound-toggle')) {
                spawnRipple(e);
            }
        });
    }

    // Expose public API
    window.toggleAudioUI = toggleSound;
    window.audioUI = { toggle: toggleSound, sounds };

    // Auto-init as soon as DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
