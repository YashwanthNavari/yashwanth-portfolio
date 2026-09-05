document.addEventListener("DOMContentLoaded", () => {
    // 1. Determine the current active page
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop() || "index.html";

    // 2. Helper function to return active or inactive classes based on page name
    const getNavClass = (targetPage) => {
        const isActive = pageName === targetPage || (pageName === "" && targetPage === "index.html");
        if (isActive) {
            return `px-3.5 py-1.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold text-xs shadow-sm shadow-slate-900/20 transition-all flex items-center gap-1.5 shrink-0`;
        }
        return "px-3 py-1.5 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white/90 dark:hover:bg-slate-800/80 transition-all shrink-0";
    };

    const getActiveDot = (targetPage) => {
        const isActive = pageName === targetPage || (pageName === "" && targetPage === "index.html");
        return isActive ? `<span class="size-1.5 rounded-full bg-blue-400 dark:bg-blue-600 animate-pulse"></span>` : '';
    };

    // 3. Define the HTML for the executive navigation bar
    const navHTML = `
        <div class="fixed top-3 sm:top-5 left-0 right-0 z-[100] flex justify-center px-3 sm:px-4 w-full pointer-events-none transition-all duration-300" id="main-nav-container">
            <header id="main-nav-header" class="pointer-events-auto flex items-center justify-between bg-white/80 dark:bg-[#070b14]/85 backdrop-blur-2xl rounded-full px-3 sm:px-4 py-2 w-full max-w-[76rem] shadow-[0_10px_35px_-10px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.05)] dark:shadow-[0_16px_50px_-10px_rgba(0,0,0,0.8),0_1px_2px_rgba(255,255,255,0.05)] border border-slate-200/80 dark:border-slate-800/80 transition-all duration-300">
                
                <!-- Logo & Brand Section -->
                <a href="index.html" class="flex items-center gap-3 group shrink-0 pl-1">
                    <div class="relative shrink-0">
                        <img src="images/avatar_circle.png" onerror="this.src='https://github.com/YashwanthNavari.png'" alt="Navari Yashwanth Reddy" class="size-8 sm:size-9 rounded-full object-cover ring-2 ring-blue-500/20 dark:ring-blue-400/30 group-hover:scale-105 transition-transform duration-200 shadow-sm">
                        <span class="absolute -bottom-0.5 -right-0.5 size-2.5 bg-emerald-500 ring-2 ring-white dark:ring-[#070b14] rounded-full animate-pulse" title="Available for Roles"></span>
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

                <!-- Desktop Navigation Links (Pill Capsule) -->
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

                <!-- Action Button & Control Utilities -->
                <div class="flex items-center gap-2 sm:gap-3 shrink-0">
                    <a href="contact.html" class="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap shrink-0">
                        <span>Get in Touch</span>
                        <span class="material-symbols-outlined text-[15px]">arrow_forward</span>
                    </a>
                    
                    <div class="h-4 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>

                    <!-- Sound Toggle Button -->
                    <button onclick="window.toggleAudioUI()" class="sound-toggle size-8 sm:size-8.5 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white" aria-label="Toggle Sound FX" title="Enable Sound FX">
                        <span class="material-symbols-outlined text-[18px]">volume_off</span>
                    </button>

                    <!-- Mobile Menu Hamburger Button -->
                    <button id="mobile-menu-btn" class="lg:hidden size-8 sm:size-8.5 rounded-full flex items-center justify-center text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        <span class="material-symbols-outlined text-[20px]">menu</span>
                    </button>
                </div>
            </header>
        </div>

        <!-- Mobile Navigation Fullscreen Overlay -->
        <div id="mobile-menu" class="fixed inset-0 bg-slate-950/80 backdrop-blur-2xl z-[90] opacity-0 invisible transition-all duration-300 flex flex-col justify-between p-6 pointer-events-none">
            <div class="flex items-center justify-between pt-3 border-b border-slate-800/80 pb-4 pointer-events-auto">
                <div class="flex items-center gap-2.5">
                    <img src="images/avatar_circle.png" onerror="this.src='https://github.com/YashwanthNavari.png'" alt="Navari Yashwanth Reddy" class="size-8 rounded-full object-cover">
                    <span class="font-bold text-white text-sm">Navari Yashwanth Reddy</span>
                </div>
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Open for Roles
                </span>
            </div>

            <div class="flex flex-col gap-2 w-full py-6 pointer-events-auto overflow-y-auto">
                <a href="index.html" class="flex items-center justify-between px-4 py-3 rounded-2xl ${pageName === 'index.html' ? 'bg-blue-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-900 hover:text-white'} text-base transition-colors">
                    <span>Home</span>
                    <span class="material-symbols-outlined text-sm">chevron_right</span>
                </a>
                <a href="about.html" class="flex items-center justify-between px-4 py-3 rounded-2xl ${pageName === 'about.html' ? 'bg-blue-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-900 hover:text-white'} text-base transition-colors">
                    <span>About Me</span>
                    <span class="material-symbols-outlined text-sm">chevron_right</span>
                </a>
                <a href="projects.html" class="flex items-center justify-between px-4 py-3 rounded-2xl ${pageName === 'projects.html' ? 'bg-blue-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-900 hover:text-white'} text-base transition-colors">
                    <span>Projects</span>
                    <span class="material-symbols-outlined text-sm">chevron_right</span>
                </a>
                <a href="skills.html" class="flex items-center justify-between px-4 py-3 rounded-2xl ${pageName === 'skills.html' ? 'bg-blue-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-900 hover:text-white'} text-base transition-colors">
                    <span>Skills Matrix</span>
                    <span class="material-symbols-outlined text-sm">chevron_right</span>
                </a>
                <a href="experience.html" class="flex items-center justify-between px-4 py-3 rounded-2xl ${pageName === 'experience.html' ? 'bg-blue-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-900 hover:text-white'} text-base transition-colors">
                    <span>Experience & Timeline</span>
                    <span class="material-symbols-outlined text-sm">chevron_right</span>
                </a>
                <a href="certifications.html" class="flex items-center justify-between px-4 py-3 rounded-2xl ${pageName === 'certifications.html' ? 'bg-blue-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-900 hover:text-white'} text-base transition-colors">
                    <span>Certifications & Patents</span>
                    <span class="material-symbols-outlined text-sm">chevron_right</span>
                </a>
                <a href="resume.html" class="flex items-center justify-between px-4 py-3 rounded-2xl ${pageName === 'resume.html' ? 'bg-blue-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-900 hover:text-white'} text-base transition-colors">
                    <span>Interactive Resume</span>
                    <span class="material-symbols-outlined text-sm">chevron_right</span>
                </a>
                <a href="blog.html" class="flex items-center justify-between px-4 py-3 rounded-2xl ${pageName === 'blog.html' ? 'bg-blue-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-900 hover:text-white'} text-base transition-colors">
                    <span>Technical Blog</span>
                    <span class="material-symbols-outlined text-sm">chevron_right</span>
                </a>
            </div>

            <div class="pt-4 border-t border-slate-800/80 pointer-events-auto flex flex-col gap-3">
                <a href="contact.html" class="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2">
                    <span class="material-symbols-outlined text-base">chat</span>
                    <span>Get in Touch</span>
                </a>
                <p class="text-center text-[11px] text-slate-500 font-mono">© 2026 Navari Yashwanth Reddy</p>
            </div>
        </div>
    `;

    // 4. Clean up existing old nav elements
    const existingHeader = document.querySelector('header.sticky, header.site-header');
    if (existingHeader) existingHeader.remove();

    const existingMobileMenu = document.getElementById('mobile-menu');
    if (existingMobileMenu) existingMobileMenu.remove();

    // 5. Inject the new navigation bar into the body
    document.body.insertAdjacentHTML("afterbegin", navHTML);

    // Add padding to body to account for fixed header
    document.body.classList.add("pt-20", "sm:pt-24");

    // 6. Scroll reactive compacting
    let lastScroll = 0;
    const headerEl = document.getElementById('main-nav-header');
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (headerEl) {
            if (currentScroll > 40) {
                headerEl.classList.add('shadow-lg', 'bg-white/90', 'dark:bg-[#070b14]/95', 'py-1.5');
                headerEl.classList.remove('py-2');
            } else {
                headerEl.classList.remove('shadow-lg', 'bg-white/90', 'dark:bg-[#070b14]/95', 'py-1.5');
                headerEl.classList.add('py-2');
            }
        }
        lastScroll = currentScroll;
    }, { passive: true });

    // 7. Add event listener for new mobile menu toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileBtn && mobileMenu) {
        let isMenuOpen = false;
        mobileBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            if (isMenuOpen) {
                mobileMenu.classList.remove('opacity-0', 'invisible', 'pointer-events-none');
                mobileMenu.classList.add('opacity-100', 'visible', 'pointer-events-auto');
                mobileBtn.innerHTML = '<span class="material-symbols-outlined text-[20px]">close</span>';
                document.body.classList.add('overflow-hidden');
            } else {
                mobileMenu.classList.add('opacity-0', 'invisible', 'pointer-events-none');
                mobileMenu.classList.remove('opacity-100', 'visible', 'pointer-events-auto');
                mobileBtn.innerHTML = '<span class="material-symbols-outlined text-[20px]">menu</span>';
                document.body.classList.remove('overflow-hidden');
            }
        });
    }

    // Load audio UI micro-interaction engine if not already present
    if (!document.querySelector('script[src*="audio-ui.js"]')) {
        const audioScript = document.createElement('script');
        audioScript.src = 'js/audio-ui.js';
        document.head.appendChild(audioScript);
    }
});

