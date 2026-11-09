/**
 * ==========================================================================
 * CINEMATIC HANDWRITTEN SIGNATURE TRANSITION (HOME PAGE ONLY - 3.0s)
 * Vertical-Blinds Executive Intro for Navari Yashwanth Reddy Portfolio
 * ==========================================================================
 */

(function () {
  'use strict';

  let overlayEl = null;
  let namePoly = null;
  let flourishRect = null;
  let completeRect = null;
  let spark = null;
  let animFrameId = null;
  let watchdogTimer = null;

  /**
   * Natural handwriting ease function (gentle start, steady cursive flow, subtle taper)
   */
  function handwritingEase(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  function resetMask() {
    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
    if (namePoly) namePoly.setAttribute('points', '35,50 35,50 35,335 35,335');
    if (flourishRect) flourishRect.setAttribute('width', '0');
    if (completeRect) completeRect.style.opacity = '0';
    if (spark) spark.style.opacity = '0';
  }

  function finishTransition() {
    clearTimeout(watchdogTimer);
    resetMask();
    if (overlayEl) {
      overlayEl.className = 'is-hidden';
    }
    document.body.classList.remove('sig-transition-active');
  }

  /**
   * Fluid, continuous, 60/120 FPS handwriting reveal animation
   * Covers 100% of all strokes with zero clipping and zero lag.
   */
  function animateHandwriting(onComplete) {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) {
      if (completeRect) completeRect.style.opacity = '1';
      if (onComplete) setTimeout(onComplete, 350);
      return;
    }

    resetMask();

    // Show pen spark
    if (spark) spark.style.opacity = '1';

    // Step 1: Write Name ("N. Yashwanth Reddy") over 1250ms
    const nameStartTime = performance.now();
    const nameDuration = 1250; // ms

    function stepName(now) {
      const elapsed = now - nameStartTime;
      const progress = Math.min(1, elapsed / nameDuration);
      const ease = handwritingEase(progress);

      // Current X advances from X=35 to X=985
      const currentX = 35 + ease * 955;
      const topX = Math.min(1024, currentX + 22); // subtle 20px forward italic slant
      const botX = Math.min(1024, currentX - 12);

      // Multi-zone coverage:
      // Left zone (X <= 355): covers down to Y=335 (covering N and Y descender)
      // Mid zone (355 < X <= 840): covers down to Y=218 (covering letters, keeping flourish below hidden)
      // Right zone (X > 840): covers down to Y=335 (covering eddy and y descender)
      let points = '';
      if (currentX <= 355) {
        points = `35,50 ${topX},50 ${botX},335 35,335`;
      } else if (currentX <= 840) {
        points = `35,50 ${topX},50 ${botX},218 355,218 355,335 35,335`;
      } else {
        points = `35,50 ${topX},50 ${botX},335 840,335 840,218 355,218 355,335 35,335`;
      }

      if (namePoly) namePoly.setAttribute('points', points);

      // Track spark along pen front
      if (spark) {
        const sparkX = (currentX / 1024) * 100;
        spark.style.left = sparkX + '%';
        spark.style.top = '51%';
      }

      if (progress < 1) {
        animFrameId = requestAnimationFrame(stepName);
      } else {
        // Name complete! Step 2: Underline Flourish sweeps across underneath over 380ms
        stepFlourishStart();
      }
    }

    animFrameId = requestAnimationFrame(stepName);

    function stepFlourishStart() {
      const flourishStart = performance.now();
      const flourishDuration = 380; // ms

      // Position spark at start of flourish (X=340, Y=250)
      if (spark) {
        spark.style.left = (340 / 1024 * 100) + '%';
        spark.style.top = (250 / 341 * 100) + '%';
      }

      function stepFlourish(now) {
        const elapsed = now - flourishStart;
        const progress = Math.min(1, elapsed / flourishDuration);
        const ease = 1 - Math.pow(1 - progress, 3);

        const width = ease * 455; // 340 to 795
        if (flourishRect) flourishRect.setAttribute('width', width);

        if (spark) {
          const sparkX = ((340 + width) / 1024) * 100;
          spark.style.left = sparkX + '%';
          spark.style.top = (250 / 341 * 100) + '%';
        }

        if (progress < 1) {
          animFrameId = requestAnimationFrame(stepFlourish);
        } else {
          // Flourish complete!
          if (spark) spark.style.opacity = '0';
          if (completeRect) completeRect.style.opacity = '1';
          if (onComplete) onComplete();
        }
      }

      animFrameId = requestAnimationFrame(stepFlourish);
    }
  }

  /**
   * Phase 3: Reveal Home Page (Vertical Blinds Peel Away)
   */
  function playPageReveal() {
    if (!overlayEl) return;

    // Fade out signature stage softly
    overlayEl.classList.remove('sig-visible');
    overlayEl.classList.add('sig-hiding');

    // Slide panels down off screen in staggered wave
    setTimeout(() => {
      overlayEl.classList.add('is-exiting');

      // Exit duration: 550ms + (27 * 10ms = 270ms) = ~820ms
      setTimeout(() => {
        finishTransition();
      }, 820);
    }, 180);
  }

  /**
   * Start 3.0s Cinematic Home Page Transition
   */
  function startIntro() {
    overlayEl = document.getElementById('cinematic-transition-overlay');
    if (!overlayEl) return;

    document.body.classList.add('sig-transition-active');

    // Cache elements
    namePoly = document.getElementById('sig-mask-name');
    flourishRect = document.getElementById('sig-mask-flourish');
    completeRect = document.getElementById('sig-mask-complete');
    spark = document.getElementById('sig-pen-spark');

    resetMask();

    // T=0.50s: Signature stage fades in
    setTimeout(() => {
      overlayEl.classList.add('sig-visible');

      // T=0.60s: Continuous handwriting reveal starts
      setTimeout(() => {
        animateHandwriting(() => {
          // T=2.25s: Signature complete! Hold for ~200ms
          setTimeout(() => {
            // T=2.45s: Phase 3 (Blinds slide away, unveiling Home Page)
            playPageReveal();
          }, 200);
        });
      }, 100);
    }, 500);

    // Watchdog safety timeout (4.0s max)
    clearTimeout(watchdogTimer);
    watchdogTimer = setTimeout(finishTransition, 4000);
  }

  // Run as soon as DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startIntro);
  } else {
    startIntro();
  }

  window.SignatureTransition = {
    replay: startIntro,
    finish: finishTransition
  };

})();
