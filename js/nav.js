/**
 * Universal Executive Navigation Bar & Responsive Mobile Drawer
 * Designed for flawless layout across Phones, Tablets, and Laptops.
 */
document.addEventListener("DOMContentLoaded", () => {
    // 1. Determine the current active page
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop() || "index.html";

    // 2. Helper function to return active or inactive classes for desktop links
    const getNavClass = (targetPage) => {
        const isActive = pageName === targetPage || (pageName === "" && targetPage === "index.html");
        if (isActive) {
            return `px-3.5 py-1.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold text-xs shadow-sm shadow-slate-900/20 transition-all flex items-center gap-1.5 shrink-0`;
        }
        return "px-3 py-1.5 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white/90 dark:hover:bg-slate-800/80 transition-all shrink-0";
    };

    const getActiveDot = (targetPage) => {
        const isActive = pageName === targetPage || (pageName === "" && targetPage === "index.html");
        return isActive ? `<span class="size-1.5 rounded-full bg-blue-500 animate-pulse"></span>` : '';
    };

    // Mobile link styling helper
    const getMobileLinkClass = (targetPage) => {
        const isActive = pageName === targetPage || (pageName === "" && targetPage === "index.html");
        if (isActive) {
            return "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-md shadow-blue-500/25";
        }
        return "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-blue-600 dark:hover:text-white font-medium";
    };

    // 3. Define the HTML for the executive navigation bar and mobile drawer
    const navHTML = `
        <!-- Floating Executive Header Container -->
        <div class="fixed top-2.5 sm:top-4 md:top-5 left-0 right-0 z-[100] flex justify-center px-2.5 sm:px-4 w-full pointer-events-none transition-all duration-300" id="main-nav-container">
            <header id="main-nav-header" class="pointer-events-auto flex items-center justify-between bg-white/90 dark:bg-[#070b14]/90 backdrop-blur-2xl rounded-full px-2.5 sm:px-4 py-1.5 sm:py-2 w-full max-w-[76rem] shadow-[0_10px_35px_-10px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.05)] dark:shadow-[0_16px_50px_-10px_rgba(0,0,0,0.8),0_1px_2px_rgba(255,255,255,0.05)] border border-slate-200/80 dark:border-slate-800/80 transition-all duration-300">
                
                <!-- Logo & Brand Section -->
                <a href="index.html" class="flex items-center gap-2 sm:gap-3 group shrink-0 pl-1">
                    <div class="relative shrink-0">
                        <img src="images/avatar_circle.png" onerror="this.src='https://github.com/YashwanthNavari.png'" alt="Navari Yashwanth Reddy" class="size-8 sm:size-9 rounded-full object-cover ring-2 ring-blue-500/20 dark:ring-blue-400/30 group-hover:scale-105 transition-transform duration-200 shadow-sm">
                        <span class="absolute -bottom-0.5 -right-0.5 size-2 sm:size-2.5 bg-emerald-500 ring-2 ring-white dark:ring-[#070b14] rounded-full animate-pulse" title="Available for Roles"></span>
                    </div>
                    <div class="flex flex-col justify-center shrink-0">
                        <span class="font-black text-xs sm:text-[13px] tracking-tight text-slate-900 dark:text-white font-display group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors whitespace-nowrap">
                            Navari Yashwanth
                        </span>
                        <span class="text-[9px] sm:text-[9.5px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono leading-none hidden sm:block">
                            Data Science • AI/ML
                        </span>
                    </div>
                </a>

                <!-- Desktop Navigation Links (Pill Capsule - Hidden on Mobile/Tablet) -->
                <nav class="hidden lg:flex items-center gap-0.5 bg-slate-100/70 dark:bg-slate-900/70 p-1 rounded-full border border-slate-200/60 dark:border-slate-800/60 shadow-inner">
                    <a href="index.html" class="${getNavClass("index.html")}">${getActiveDot("index.html")}Home</a>
                    <a href="about.html" class="${getNavClass("about.html")}">${getActiveDot("about.html")}About</a>
                    <a href="projects.html" class="${getNavClass("projects.html")}">${getActiveDot("projects.html")}Projects</a>
                    <a href="skills.html" class="${getNavClass("skills.html")}">${getActiveDot("skills.html")}Skills</a>
                    <a href="experience.html" class="${getNavClass("experience.html")}">${getActiveDot("experience.html")}Experience</a>
                    <a href="certifications.html" class="${getNavClass("certifications.html")}">${getActiveDot("certifications.html")}Certifications</a>
                    <a href="resume.html" class="${getNavClass("resume.html")}">${getActiveDot("resume.html")}Resume</a>
                    <a href="blog.html" class="${getNavClass("blog.html")}">${getActiveDot("blog.html")}Blog</a>
                </nav>

                <!-- Action Controls Section -->
                <div class="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                    <!-- Get in Touch (Desktop / Tablet) -->
                    <a href="contact.html" class="hidden sm:inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap shrink-0 ${pageName === 'contact.html' ? 'ring-2 ring-blue-400 ring-offset-2 dark:ring-offset-[#070b14]' : ''}">
                        <span>Get in Touch</span>
                        <span class="material-symbols-outlined text-[15px]">arrow_forward</span>
                    </a>
                    
                    <div class="h-4 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>

                    <!-- Sound Toggle Button -->
                    <button onclick="window.toggleAudioUI()" class="sound-toggle size-8 sm:size-8.5 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white" aria-label="Toggle Sound FX" title="Enable Sound FX">
                        <span class="material-symbols-outlined text-[18px]">volume_off</span>
                    </button>

                    <!-- Mobile/Tablet Menu Hamburger Button -->
                    <button id="mobile-menu-btn" type="button" class="lg:hidden size-8.5 sm:size-9 rounded-full flex items-center justify-center text-slate-800 dark:text-slate-200 bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700/60 transition-all active:scale-95 shadow-sm" aria-label="Toggle navigation menu" title="Open Navigation Menu">
                        <span class="material-symbols-outlined text-[20px]" id="mobile-menu-btn-icon">menu</span>
                    </button>
                </div>
            </header>
        </div>

        <!-- Premium Slide-over Mobile Navigation Drawer -->
        <div id="mobile-menu" class="fixed inset-0 z-[9999] opacity-0 pointer-events-none transition-opacity duration-300 flex justify-end" aria-hidden="true">
            <!-- Backdrop Blur Overlay -->
            <div id="mobile-menu-backdrop" class="fixed inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity duration-300 opacity-0 cursor-pointer"></div>

            <!-- Slide-in Navigation Panel -->
            <div id="mobile-menu-panel" class="relative z-10 w-full max-w-[340px] sm:max-w-[380px] bg-white dark:bg-[#070b14] h-full shadow-2xl border-l border-slate-200 dark:border-slate-800/90 flex flex-col justify-between p-5 sm:p-6 translate-x-full transition-transform duration-300 ease-out overflow-y-auto">
                
                <!-- Drawer Top Bar -->
                <div>
                    <div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                        <div class="flex items-center gap-3">
                            <div class="relative shrink-0">
                                <img src="images/avatar_circle.png" onerror="this.src='https://github.com/YashwanthNavari.png'" alt="Navari Yashwanth Reddy" class="size-9 rounded-full object-cover ring-2 ring-blue-500/30">
                                <span class="absolute -bottom-0.5 -right-0.5 size-2.5 bg-emerald-500 ring-2 ring-white dark:ring-[#070b14] rounded-full animate-pulse"></span>
                            </div>
                            <div class="flex flex-col">
                                <span class="font-bold text-slate-900 dark:text-white text-sm font-display leading-tight">Navari Yashwanth</span>
                                <span class="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 font-mono">Open for Opportunities</span>
                            </div>
                        </div>

                        <!-- Explicit Close Button [X] -->
                        <button id="mobile-menu-close-btn" type="button" class="size-9 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all shadow-sm" aria-label="Close navigation menu">
                            <span class="material-symbols-outlined text-[20px]">close</span>
                        </button>
                    </div>

                    <!-- Navigation Items List -->
                    <nav class="flex flex-col gap-1.5 py-4 overflow-y-auto max-h-[calc(100vh-280px)]">
                        <a href="index.html" class="mobile-nav-link flex items-center justify-between px-3.5 py-2.5 rounded-xl ${getMobileLinkClass("index.html")} text-sm transition-all active:scale-[0.99]">
                            <div class="flex items-center gap-3">
                                <span class="material-symbols-outlined text-[19px]">home</span>
                                <span>Home</span>
                            </div>
                            <span class="material-symbols-outlined text-xs opacity-70">chevron_right</span>
                        </a>

                        <a href="about.html" class="mobile-nav-link flex items-center justify-between px-3.5 py-2.5 rounded-xl ${getMobileLinkClass("about.html")} text-sm transition-all active:scale-[0.99]">
                            <div class="flex items-center gap-3">
                                <span class="material-symbols-outlined text-[19px]">person</span>
                                <span>About Me</span>
                            </div>
                            <span class="material-symbols-outlined text-xs opacity-70">chevron_right</span>
                        </a>

                        <a href="projects.html" class="mobile-nav-link flex items-center justify-between px-3.5 py-2.5 rounded-xl ${getMobileLinkClass("projects.html")} text-sm transition-all active:scale-[0.99]">
                            <div class="flex items-center gap-3">
                                <span class="material-symbols-outlined text-[19px]">terminal</span>
                                <span>Projects Showcase</span>
                            </div>
                            <span class="material-symbols-outlined text-xs opacity-70">chevron_right</span>
                        </a>

                        <a href="skills.html" class="mobile-nav-link flex items-center justify-between px-3.5 py-2.5 rounded-xl ${getMobileLinkClass("skills.html")} text-sm transition-all active:scale-[0.99]">
                            <div class="flex items-center gap-3">
                                <span class="material-symbols-outlined text-[19px]">psychology</span>
                                <span>Skills Matrix</span>
                            </div>
                            <span class="material-symbols-outlined text-xs opacity-70">chevron_right</span>
                        </a>

                        <a href="experience.html" class="mobile-nav-link flex items-center justify-between px-3.5 py-2.5 rounded-xl ${getMobileLinkClass("experience.html")} text-sm transition-all active:scale-[0.99]">
                            <div class="flex items-center gap-3">
                                <span class="material-symbols-outlined text-[19px]">work</span>
                                <span>Experience & Timeline</span>
                            </div>
                            <span class="material-symbols-outlined text-xs opacity-70">chevron_right</span>
                        </a>

                        <a href="certifications.html" class="mobile-nav-link flex items-center justify-between px-3.5 py-2.5 rounded-xl ${getMobileLinkClass("certifications.html")} text-sm transition-all active:scale-[0.99]">
                            <div class="flex items-center gap-3">
                                <span class="material-symbols-outlined text-[19px]">verified</span>
                                <span>Certifications & Honors</span>
                            </div>
                            <span class="material-symbols-outlined text-xs opacity-70">chevron_right</span>
                        </a>

                        <a href="resume.html" class="mobile-nav-link flex items-center justify-between px-3.5 py-2.5 rounded-xl ${getMobileLinkClass("resume.html")} text-sm transition-all active:scale-[0.99]">
                            <div class="flex items-center gap-3">
                                <span class="material-symbols-outlined text-[19px]">description</span>
                                <span>Interactive Resume</span>
                            </div>
                            <span class="material-symbols-outlined text-xs opacity-70">chevron_right</span>
                        </a>

                        <a href="blog.html" class="mobile-nav-link flex items-center justify-between px-3.5 py-2.5 rounded-xl ${getMobileLinkClass("blog.html")} text-sm transition-all active:scale-[0.99]">
                            <div class="flex items-center gap-3">
                                <span class="material-symbols-outlined text-[19px]">article</span>
                                <span>Technical Blog</span>
                            </div>
                            <span class="material-symbols-outlined text-xs opacity-70">chevron_right</span>
                        </a>

                        <a href="contact.html" class="mobile-nav-link flex items-center justify-between px-3.5 py-2.5 rounded-xl ${getMobileLinkClass("contact.html")} text-sm transition-all active:scale-[0.99]">
                            <div class="flex items-center gap-3">
                                <span class="material-symbols-outlined text-[19px]">chat</span>
                                <span>Contact & Inquiries</span>
                            </div>
                            <span class="material-symbols-outlined text-xs opacity-70">chevron_right</span>
                        </a>
                    </nav>
                </div>

                <!-- Drawer Bottom Utilities & Actions -->
                <div class="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
                    <!-- Direct Action Button -->
                    <a href="contact.html" class="mobile-nav-link w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.99]">
                        <span class="material-symbols-outlined text-[18px]">send</span>
                        <span>Send a Direct Message</span>
                    </a>

                    <!-- Social / Connect Strip -->
                    <div class="flex items-center justify-center gap-3 pt-1">
                        <a href="https://www.linkedin.com/in/navari-yashwanth-reddy-4a7065357/" target="_blank" rel="noopener noreferrer" class="size-9 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" title="LinkedIn Profile">
                            <svg class="size-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.68 1.68 0 0 0-1.68 1.68 1.68 1.68 0 0 0 1.68 1.68 1.68 1.68 0 0 0 1.68-1.68 1.68 1.68 0 0 0-1.68-1.68Z"/></svg>
                        </a>
                        <a href="https://github.com/YashwanthNavari" target="_blank" rel="noopener noreferrer" class="size-9 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" title="GitHub Profile">
                            <svg class="size-4.5 fill-current" viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/></svg>
                        </a>
                        <a href="mailto:yashwanthnavari98@gmail.com" class="size-9 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" title="Send Email">
                            <span class="material-symbols-outlined text-[19px]">mail</span>
                        </a>
                    </div>

                    <p class="text-center text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                        © 2026 Navari Yashwanth Reddy
                    </p>
                </div>
            </div>
        </div>
    `;

    // 4. Clean up any existing old nav elements from DOM
    document.querySelectorAll('header').forEach(h => {
        if (h.id !== 'main-nav-header' && (h.classList.contains('sticky') || h.classList.contains('site-header') || h.querySelector('nav'))) {
            h.remove();
        }
    });

    document.querySelectorAll('#mobile-menu').forEach(m => {
        m.remove();
    });

    // 5. Inject the new navigation bar into the body
    document.body.insertAdjacentHTML("afterbegin", navHTML);

    // Add padding to body to account for fixed header
    document.body.classList.add("pt-16", "sm:pt-20", "md:pt-24");

    // 6. Scroll reactive compacting
    const headerEl = document.getElementById('main-nav-header');
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (headerEl) {
            if (currentScroll > 40) {
                headerEl.classList.add('shadow-lg', 'bg-white/95', 'dark:bg-[#070b14]/95', 'py-1');
                headerEl.classList.remove('py-1.5', 'sm:py-2');
            } else {
                headerEl.classList.remove('shadow-lg', 'bg-white/95', 'dark:bg-[#070b14]/95', 'py-1');
                headerEl.classList.add('py-1.5', 'sm:py-2');
            }
        }
    }, { passive: true });

    // 7. Robust Mobile Drawer Controller
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileBackdrop = document.getElementById('mobile-menu-backdrop');
    const mobilePanel = document.getElementById('mobile-menu-panel');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileBtnIcon = document.getElementById('mobile-menu-btn-icon');
    const closeBtn = document.getElementById('mobile-menu-close-btn');

    let isMenuOpen = false;

    function openMobileMenu() {
        if (isMenuOpen || !mobileMenu || !mobilePanel) return;
        isMenuOpen = true;

        mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
        mobileMenu.classList.add('opacity-100', 'pointer-events-auto');
        mobileMenu.setAttribute('aria-hidden', 'false');

        if (mobileBackdrop) {
            mobileBackdrop.classList.remove('opacity-0');
            mobileBackdrop.classList.add('opacity-100');
        }

        requestAnimationFrame(() => {
            mobilePanel.classList.remove('translate-x-full');
        });

        if (mobileBtnIcon) {
            mobileBtnIcon.textContent = 'close';
        }

        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        if (!isMenuOpen || !mobileMenu || !mobilePanel) return;
        isMenuOpen = false;

        mobilePanel.classList.add('translate-x-full');

        if (mobileBackdrop) {
            mobileBackdrop.classList.remove('opacity-100');
            mobileBackdrop.classList.add('opacity-0');
        }

        setTimeout(() => {
            if (!isMenuOpen) {
                mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
                mobileMenu.classList.add('opacity-0', 'pointer-events-none');
                mobileMenu.setAttribute('aria-hidden', 'true');
            }
        }, 300);

        if (mobileBtnIcon) {
            mobileBtnIcon.textContent = 'menu';
        }

        document.body.style.overflow = '';
    }

    function toggleMobileMenu() {
        if (isMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    // Expose global methods
    window.openMobileMenu = openMobileMenu;
    window.closeMobileMenu = closeMobileMenu;
    window.toggleMobileMenu = toggleMobileMenu;
    window.__navToggleMobileMenu = toggleMobileMenu;

    // Attach click and touch listeners
    if (mobileBtn) {
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMobileMenu();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMobileMenu();
        });
    }

    if (mobileBackdrop) {
        mobileBackdrop.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMobileMenu();
        });
    }

    // Close when clicking any nav item in the drawer
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMobileMenu();
        }
    });

    // 8. Load audio UI micro-interaction engine if not already present
    if (!document.querySelector('script[src*="audio-ui.js"]')) {
        const audioScript = document.createElement('script');
        audioScript.src = 'js/audio-ui.js';
        document.head.appendChild(audioScript);
    }
});
