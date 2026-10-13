/**
 * Universal Executive Navigation Bar & Responsive Mobile Drawer
 * Implements Reference Image 1 (Let's Connect Curved CTA) and Reference Image 2 (Pink-to-Lavender Glass Pill).
 */
document.addEventListener("DOMContentLoaded", () => {
    // 1. Determine the current active page
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop() || "index.html";

    // 2. Helper function to return active or inactive classes for desktop links
    const getNavClass = (targetPage) => {
        const isActive = pageName === targetPage || (pageName === "" && targetPage === "index.html");
        if (isActive) {
            return "text-xs sm:text-[13px] font-bold text-[#0A192F] hover:text-[#0A192F] transition-all py-1 px-1 relative shrink-0 tracking-tight active";
        }
        return "text-xs sm:text-[13px] font-medium text-[#4A5D78] hover:text-[#0A192F] transition-all py-1 px-1 relative shrink-0 tracking-tight";
    };

    const getActiveDot = (targetPage) => {
        const isActive = pageName === targetPage || (pageName === "" && targetPage === "index.html");
        return isActive ? `<span class="size-1 rounded-full bg-[#0A192F] absolute -bottom-0.5 left-1/2 -translate-x-1/2"></span>` : '';
    };

    // Mobile link styling helper
    const getMobileLinkClass = (targetPage) => {
        const isActive = pageName === targetPage || (pageName === "" && targetPage === "index.html");
        if (isActive) {
            return "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-md shadow-blue-500/25";
        }
        return "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-blue-600 dark:hover:text-white font-medium";
    };

    // 3. Define the HTML for the navigation bar (Ref 2) and Let's Connect CTA (Ref 1)
    const navHTML = `
        <!-- Floating Navigation Bar Container (Reference Image 2) -->
        <div class="fixed top-2.5 sm:top-4 md:top-5 left-0 right-0 z-[100] flex justify-center px-3 sm:px-6 w-full pointer-events-none transition-all duration-300" id="main-nav-container">
            <header id="main-nav-header" class="pointer-events-auto flex items-center justify-between rounded-full px-3.5 sm:px-6 py-2 sm:py-2.5 w-full max-w-[76rem] transition-all duration-300 select-none shadow-[0_10px_30px_-4px_rgba(180,205,245,0.25),0_4px_12px_rgba(0,0,0,0.03)]" style="background: linear-gradient(100deg, #F0F6FF 0%, #E8F0FF 50%, #E1EAFE 100%); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.85);">
                
                <!-- Brand / Logo Section: Navari Yashwanth / DATA SCIENCE &bull; AI/ML -->
                <a href="index.html" class="flex items-center gap-2.5 sm:gap-3 group shrink-0 pl-0.5 select-none" aria-label="Navari Yashwanth Home">
                    <div class="relative shrink-0">
                        <img src="images/avatar_circle.png" onerror="this.src='https://github.com/YashwanthNavari.png'" alt="Navari Yashwanth Reddy" class="size-8 sm:size-9 rounded-full object-cover ring-2 ring-white/90 shadow-sm group-hover:scale-105 transition-transform duration-200">
                        <span class="absolute -bottom-0.5 -right-0.5 size-2 sm:size-2.5 bg-emerald-500 ring-2 ring-white rounded-full animate-pulse" title="Available for Roles"></span>
                    </div>
                    <div class="flex flex-col justify-center shrink-0">
                        <span class="font-bold text-xs sm:text-[13.5px] tracking-tight text-[#0A192F] font-sans group-hover:text-blue-700 transition-colors leading-tight">
                            Navari Yashwanth
                        </span>
                        <span class="text-[8.5px] sm:text-[9px] font-semibold text-[#5A6E85] uppercase tracking-wider font-sans leading-none pt-0.5">
                            DATA SCIENCE &bull; AI/ML
                        </span>
                    </div>
                </a>

                <!-- Centered Desktop Navigation Links (Generous Spacing, Dark Charcoal Typography) -->
                <nav class="hidden lg:flex items-center gap-5 xl:gap-8 mx-auto">
                    <a href="index.html" class="${getNavClass("index.html")}">Home${getActiveDot("index.html")}</a>
                    <a href="about.html" class="${getNavClass("about.html")}">About${getActiveDot("about.html")}</a>
                    <a href="projects.html" class="${getNavClass("projects.html")}">Projects${getActiveDot("projects.html")}</a>
                    <a href="skills.html" class="${getNavClass("skills.html")}">Skills${getActiveDot("skills.html")}</a>
                    <a href="experience.html" class="${getNavClass("experience.html")}">Experience${getActiveDot("experience.html")}</a>
                    <a href="certifications.html" class="${getNavClass("certifications.html")}">Certifications${getActiveDot("certifications.html")}</a>
                    <a href="resume.html" class="${getNavClass("resume.html")}">Resume${getActiveDot("resume.html")}</a>
                    <a href="blog.html" class="${getNavClass("blog.html")}">Blog${getActiveDot("blog.html")}</a>
                </nav>

                <!-- Right Action Section (Reference Image 1: Let's Connect Curved CTA) -->
                <div class="flex items-center gap-2 sm:gap-3 shrink-0">
                    <!-- Let's Connect Button with Curved Divider & Upward-Right Arrow -->
                    <a href="contact.html" class="lets-connect-btn group relative inline-flex items-center rounded-full overflow-hidden border border-[#AFBAE5]/50 hover:border-[#AFBAE5]/90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] select-none text-decoration-none shadow-sm shrink-0" style="background: linear-gradient(135deg, #021448 0%, #031650 100%); height: 38px; max-height: 38px; min-height: 38px; box-sizing: border-box;">
                        <!-- Main Label Area -->
                        <span class="relative z-10 pl-4 sm:pl-5 pr-2.5 sm:pr-3 text-white font-medium text-xs sm:text-[13px] tracking-wide whitespace-nowrap shrink-0 flex items-center h-full">
                            Let's Connect
                        </span>
                        <!-- Distinct Right Arrow Section with Thin Curved Divider -->
                        <span class="relative z-10 flex items-center justify-center shrink-0 self-stretch overflow-hidden" style="width: 36px; min-width: 36px; max-width: 36px; height: 100%;">
                            <!-- SVG Curved Divider & Right Compartment Background -->
                            <svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 36 36" preserveAspectRatio="none">
                                <!-- Darker Navy Right Compartment Fill -->
                                <path d="M 11 0 C 4 11, 4 25, 11 36 L 36 36 L 36 0 Z" fill="#090D22" />
                                <!-- Thin Curved Divider Stroke (Bowing Left) -->
                                <path d="M 11 0 C 4 11, 4 25, 11 36" fill="none" stroke="#AFBAE5" stroke-width="1.3" opacity="0.9" />
                            </svg>
                            <!-- Diagonal Upward-Right Arrow -->
                            <svg class="relative z-20 size-3 sm:size-3.5 text-[#D9E4FF] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                        </span>
                    </a>
                    
                    <!-- Sound Toggle Button -->
                    <button onclick="window.toggleAudioUI()" class="sound-toggle size-8 sm:size-8.5 rounded-full flex items-center justify-center hover:bg-white/60 transition-colors text-[#0A192F]/75 hover:text-[#0A192F]" aria-label="Toggle Sound FX" title="Enable Sound FX">
                        <span class="material-symbols-outlined text-[18px]">volume_off</span>
                    </button>

                    <!-- Mobile/Tablet Menu Hamburger Button -->
                    <button id="mobile-menu-btn" type="button" class="lg:hidden size-8.5 sm:size-9 rounded-full flex items-center justify-center text-[#0A192F] bg-white/70 hover:bg-white border border-white/80 transition-all active:scale-95 shadow-sm" aria-label="Toggle navigation menu" title="Open Navigation Menu">
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
                                <span class="font-bold text-slate-900 dark:text-white text-sm font-sans leading-tight">Navari Yashwanth</span>
                                <span class="text-[9px] font-semibold text-[#5A6E85] uppercase tracking-wider font-sans">DATA SCIENCE &bull; AI/ML</span>
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
                    <!-- Direct Action Button (Reference Image 1: Let's Connect Curved CTA) -->
                    <a href="contact.html" class="lets-connect-btn mobile-nav-link group relative w-full inline-flex items-center justify-between rounded-full overflow-hidden border border-[#AFBAE5]/50 py-2.5 px-5 text-white font-medium text-sm shadow-lg transition-all active:scale-[0.99]" style="background: linear-gradient(135deg, #021448 0%, #031650 100%);">
                        <span class="relative z-10 font-medium tracking-wide">Let's Connect</span>
                        <span class="relative z-10 flex items-center justify-center w-8 self-stretch">
                            <svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 36 36" preserveAspectRatio="none">
                                <path d="M 11 0 C 4 11, 4 25, 11 36 L 36 36 L 36 0 Z" fill="#090D22" />
                                <path d="M 11 0 C 4 11, 4 25, 11 36" fill="none" stroke="#AFBAE5" stroke-width="1.3" opacity="0.9" />
                            </svg>
                            <svg class="relative z-20 size-4 text-[#D9E4FF] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                        </span>
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
                        &copy; 2026 Navari Yashwanth Reddy
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
                headerEl.classList.add('scrolled', 'py-1.5');
                headerEl.classList.remove('py-2', 'sm:py-2.5');
            } else {
                headerEl.classList.remove('scrolled', 'py-1.5');
                headerEl.classList.add('py-2', 'sm:py-2.5');
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