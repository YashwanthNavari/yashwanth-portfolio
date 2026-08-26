/**
 * resume-viewer.js
 * Premium Natural Continuous Scroll PDF Document Viewer Engine for Portfolio
 * Powered by Mozilla PDF.js
 */

// ── Resume Collection Architecture ──────────────────────────────
const resumeCollection = [
    {
        id: "datascience",
        title: "Data Scientist Resume",
        fileName: "data_science_resume.pdf",
        file: "/resumes/data_science_resume.pdf",
        fallbackFile: "resumes/data_science_resume.pdf",
        version: "Data Scientist",
        shortLabel: "Data Scientist",
        icon: "analytics",
        badge: "Specialized",
        role: "Data Scientist • AI & ML Engineer • Analytics",
        description: "Specialized Data Science resume focusing on Machine Learning, Deep Learning, Statistical Analysis, Computer Vision, and AI-driven solutions.",
        base64Key: "DATA_SCIENCE_RESUME_PDF_BASE64"
    },
    {
        id: "fullstack",
        title: "Full-Stack & Software Resume",
        fileName: "Navari-Yashwanth-Reddy-Resume-01.pdf",
        file: "/resumes/Navari-Yashwanth-Reddy-Resume-01.pdf",
        fallbackFile: "resumes/Navari-Yashwanth-Reddy-Resume-01.pdf",
        version: "Full-Stack & AI",
        shortLabel: "Full-Stack & AI",
        icon: "terminal",
        badge: "Full-Stack",
        role: "Full-Stack Developer • AI Enthusiast • Data Science",
        description: "Comprehensive software engineering resume covering Full-Stack Development, React, Node.js, Python, Government of India Design Patent, and end-to-end engineering.",
        base64Key: "RESUME_PDF_BASE64"
    }
];

class ResumeViewer {
    constructor() {
        this.activeResumeIndex = 0;
        this.pdfDoc = null;
        this.currentPage = 1;
        this.totalPages = 1;
        this.zoomLevel = 1.0; // 1.0 = 100% (Fit to viewer width)
        this.zoomSteps = [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0];
        this.fitMode = 'viewer';
        this.isFullscreen = false;
        this.resizeDebounceTimer = null;
        this.pdfBlobUrl = null;
        this.pageObserver = null;
        this.pageRatios = new Map();

        // DOM Element references
        this.container = document.getElementById('resume-viewer-container');
        this.viewport = document.getElementById('resume-viewport');
        this.pagesContainer = document.getElementById('pdf-pages-container');
        
        this.loadingOverlay = document.getElementById('viewer-loading-state');
        this.errorOverlay = document.getElementById('viewer-error-state');
        
        // Toolbar DOM references
        this.prevBtn = document.getElementById('prev-page-btn');
        this.nextBtn = document.getElementById('next-page-btn');
        this.pageCurrentEl = document.getElementById('current-page-num');
        this.pageTotalEl = document.getElementById('total-pages-num');
        this.zoomInBtn = document.getElementById('zoom-in-btn');
        this.zoomOutBtn = document.getElementById('zoom-out-btn');
        this.zoomLevelEl = document.getElementById('zoom-level-text');
        this.fitBtn = document.getElementById('fit-width-btn');
        this.fullscreenBtn = document.getElementById('fullscreen-btn');
        this.downloadBtn = document.getElementById('download-pdf-btn');
        this.openTabBtn = document.getElementById('open-tab-btn');
        this.versionSelectorContainer = document.getElementById('resume-version-selector-container');
        this.docTitleEl = document.getElementById('viewer-doc-title');

        this.init();
    }

    async init() {
        if (!this.container || !this.pagesContainer) {
            console.error('Resume viewer elements missing in DOM.');
            return;
        }

        // Configure PDF.js Worker if available
        if (window.pdfjsLib) {
            try {
                window.pdfjsLib.GlobalWorkerOptions.workerSrc = 
                    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            } catch (e) {
                console.warn('PDF.js worker setup fallback:', e);
            }
        } else {
            console.error('PDF.js library not loaded.');
            this.showError();
            return;
        }

        // Check hash or query param to pick initial resume
        const hash = (window.location.hash || '').toLowerCase();
        const urlParams = new URLSearchParams(window.location.search);
        const typeParam = (urlParams.get('type') || urlParams.get('resume') || '').toLowerCase();

        if (hash.includes('full') || hash.includes('general') || hash.includes('software') || typeParam.includes('full') || typeParam.includes('software')) {
            this.activeResumeIndex = 1;
        } else {
            this.activeResumeIndex = 0;
        }

        // Setup UI event listeners & shortcuts
        this.bindEvents();
        this.setupKeyboardShortcuts();
        this.renderVersionSelector();

        // Load the initial active resume
        await this.loadResume(this.activeResumeIndex);
    }

    getCurrentResume() {
        return resumeCollection[this.activeResumeIndex] || resumeCollection[0];
    }

    renderVersionSelector() {
        if (!this.versionSelectorContainer) return;

        // If only 1 resume exists, keep selector completely dormant/hidden
        if (resumeCollection.length <= 1) {
            this.versionSelectorContainer.classList.add('hidden');
            this.versionSelectorContainer.innerHTML = '';
            return;
        }

        // Elegant dedicated profile cards supporting dark and light themes
        this.versionSelectorContainer.classList.remove('hidden');
        this.versionSelectorContainer.innerHTML = resumeCollection.map((res, idx) => {
            const isActive = idx === this.activeResumeIndex;
            const icon = res.icon || 'description';
            const subtitle = idx === 0 
                ? 'Machine Learning • Deep Learning • AI' 
                : 'React • Node.js • Python • Patent';

            return `
                <button 
                    data-index="${idx}"
                    type="button"
                    class="version-select-btn w-full text-left p-3.5 sm:p-4 rounded-2xl transition-all duration-200 flex items-center justify-between gap-3 border group cursor-pointer ${
                        isActive 
                            ? 'bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-blue-500/5 dark:from-blue-600/20 dark:via-indigo-600/20 dark:to-blue-500/10 border-primary dark:border-blue-500 shadow-md shadow-primary/10 ring-1 ring-primary/40 scale-[1.01]' 
                            : 'bg-white dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/60 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
                    }"
                    aria-pressed="${isActive}"
                    aria-label="Switch to ${res.version} Resume">
                    <div class="flex items-center gap-3 min-w-0">
                        <span class="size-10 rounded-xl ${
                            isActive 
                                ? 'bg-primary text-white shadow-md shadow-blue-500/25 ring-2 ring-primary/30' 
                                : 'bg-slate-100 dark:bg-slate-700/80 text-slate-600 dark:text-slate-400 group-hover:bg-primary/10 group-hover:text-primary'
                        } flex items-center justify-center shrink-0 transition-colors">
                            <span class="material-symbols-outlined text-[20px]">${icon}</span>
                        </span>
                        <div class="min-w-0">
                            <div class="flex items-center gap-2 flex-wrap">
                                <span class="text-sm font-extrabold ${
                                    isActive ? 'text-slate-900 dark:text-white font-display' : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-950 dark:group-hover:text-white'
                                }">
                                    ${res.version}
                                </span>
                                ${res.badge ? `
                                    <span class="text-[9px] font-black uppercase px-2 py-0.5 rounded-md tracking-wider ${
                                        isActive 
                                            ? 'bg-primary/15 text-primary dark:text-blue-300 border border-primary/30' 
                                            : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                                    }">${res.badge}</span>
                                ` : ''}
                            </div>
                            <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight truncate">
                                ${subtitle}
                            </p>
                        </div>
                    </div>
                    <span class="material-symbols-outlined text-[20px] shrink-0 transition-transform ${
                        isActive ? 'text-primary dark:text-blue-400 scale-110' : 'text-slate-300 dark:text-slate-600 group-hover:text-slate-400'
                    }">
                        ${isActive ? 'check_circle' : 'radio_button_unchecked'}
                    </span>
                </button>
            `;
        }).join('');

        this.versionSelectorContainer.querySelectorAll('.version-select-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetIdx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
                if (targetIdx !== this.activeResumeIndex) {
                    this.loadResume(targetIdx);
                }
            });
        });
    }

    base64ToUint8Array(base64) {
        const raw = window.atob(base64);
        const uint8Array = new Uint8Array(raw.length);
        for (let i = 0; i < raw.length; i++) {
            uint8Array[i] = raw.charCodeAt(i);
        }
        return uint8Array;
    }

    createBlobUrlFromBase64(base64) {
        try {
            const bytes = this.base64ToUint8Array(base64);
            const blob = new Blob([bytes], { type: 'application/pdf' });
            return URL.createObjectURL(blob);
        } catch (e) {
            console.warn('Blob creation failed:', e);
            return null;
        }
    }

    async loadResume(index) {
        this.activeResumeIndex = index;
        const currentResume = this.getCurrentResume();

        if (this.docTitleEl) {
            this.docTitleEl.textContent = currentResume.title || 'Resume';
            this.docTitleEl.setAttribute('title', currentResume.title);
        }

        const docBadge = document.getElementById('viewer-doc-badge');
        if (docBadge) {
            docBadge.textContent = currentResume.version || 'PDF';
        }

        // Set target download & open links
        let targetDownloadHref = currentResume.file;
        let targetOpenHref = currentResume.file;

        if (window.location.protocol === 'file:') {
            targetDownloadHref = currentResume.fallbackFile || ('resumes/' + currentResume.fileName);
            targetOpenHref = targetDownloadHref;
        }

        if (this.downloadBtn) {
            this.downloadBtn.setAttribute('href', targetDownloadHref);
            this.downloadBtn.setAttribute('download', currentResume.fileName || 'resume.pdf');
            this.downloadBtn.setAttribute('data-tooltip', `Download ${currentResume.version} PDF`);
        }

        if (this.openTabBtn) {
            this.openTabBtn.setAttribute('href', targetOpenHref);
            this.openTabBtn.setAttribute('data-tooltip', `Open ${currentResume.version} in New Tab`);
        }

        // Update Side Panel metadata & buttons
        const sideDownloadBtn = document.getElementById('side-download-pdf-btn');
        const sideOpenTabBtn = document.getElementById('side-open-tab-btn');
        const sideDomainLabel = document.getElementById('active-profile-domain-label');

        if (sideDownloadBtn) {
            sideDownloadBtn.setAttribute('href', targetDownloadHref);
            sideDownloadBtn.setAttribute('download', currentResume.fileName || 'resume.pdf');
        }
        if (sideOpenTabBtn) {
            sideOpenTabBtn.setAttribute('href', targetOpenHref);
        }
        if (sideDomainLabel) {
            sideDomainLabel.textContent = currentResume.version || 'Data Science';
        }

        // Update URL hash without reload
        if (window.history && window.history.replaceState) {
            const newHash = '#' + (currentResume.id || 'datascience');
            window.history.replaceState(null, '', newHash);
        }

        this.renderVersionSelector();
        this.showLoading();

        try {
            let loaded = false;

            // Strategy 1: Embedded base64 data if available for this resume
            const resumeBase64 = currentResume.base64 || (currentResume.base64Key ? window[currentResume.base64Key] : null);
            if (resumeBase64 && typeof resumeBase64 === 'string') {
                try {
                    const pdfData = this.base64ToUint8Array(resumeBase64);
                    const loadingTask = window.pdfjsLib.getDocument({
                        data: pdfData,
                        cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
                        cMapPacked: true
                    });
                    this.pdfDoc = await loadingTask.promise;
                    loaded = true;

                    this.pdfBlobUrl = this.createBlobUrlFromBase64(resumeBase64);
                    if (this.pdfBlobUrl && window.location.protocol === 'file:') {
                        if (this.downloadBtn) this.downloadBtn.setAttribute('href', this.pdfBlobUrl);
                        if (this.openTabBtn) this.openTabBtn.setAttribute('href', this.pdfBlobUrl);
                        if (sideDownloadBtn) sideDownloadBtn.setAttribute('href', this.pdfBlobUrl);
                        if (sideOpenTabBtn) sideOpenTabBtn.setAttribute('href', this.pdfBlobUrl);
                    }
                } catch (dataErr) {
                    console.warn('Base64 loading fallback encountered issue, trying network paths...', dataErr);
                }
            }

            // Strategy 2: Multi-URL cascading fetch for the active resume
            if (!loaded) {
                const candidateUrls = [
                    currentResume.file,
                    currentResume.fallbackFile,
                    'resumes/' + currentResume.fileName,
                    '/resumes/' + currentResume.fileName,
                    './resumes/' + currentResume.fileName,
                    'public/resumes/' + currentResume.fileName
                ].filter(Boolean);

                for (const url of candidateUrls) {
                    try {
                        const loadingTask = window.pdfjsLib.getDocument({
                            url: url,
                            cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
                            cMapPacked: true
                        });
                        this.pdfDoc = await loadingTask.promise;
                        loaded = true;
                        break;
                    } catch (err) {
                        // Continue to next candidate
                    }
                }
            }

            if (!loaded || !this.pdfDoc) {
                throw new Error('Unable to resolve PDF document from any source.');
            }

            this.totalPages = this.pdfDoc.numPages;
            this.currentPage = 1;
            this.fitMode = 'viewer';
            this.zoomLevel = 1.0;

            if (this.pageTotalEl) {
                this.pageTotalEl.textContent = this.totalPages;
            }

            this.renderVersionSelector();
            this.hideLoading();
            await this.renderAllPages();

        } catch (error) {
            console.error('Error loading PDF document:', error);
            this.showError();
        }
    }

    async renderAllPages() {
        if (!this.pdfDoc || !this.pagesContainer) return;

        // Clear existing pages
        this.pagesContainer.innerHTML = '';
        this.pagesContainer.classList.add('opacity-0');
        this.pageRatios.clear();

        // Disconnect previous observer if existing
        if (this.pageObserver) {
            this.pageObserver.disconnect();
        }

        // Setup Intersection Observer to track which page is currently dominant during natural scrolling
        this.pageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const pageNum = parseInt(entry.target.getAttribute('data-page-num'), 10);
                if (entry.isIntersecting) {
                    this.pageRatios.set(pageNum, entry.intersectionRatio);
                } else {
                    this.pageRatios.delete(pageNum);
                }
            });

            // Find page with the highest visibility ratio
            let maxRatio = 0;
            let dominantPage = this.currentPage;

            this.pageRatios.forEach((ratio, pageNum) => {
                if (ratio > maxRatio) {
                    maxRatio = ratio;
                    dominantPage = pageNum;
                }
            });

            if (dominantPage !== this.currentPage && maxRatio > 0.15) {
                this.currentPage = dominantPage;
                this.updateToolbarState();
            }
        }, {
            root: this.viewport,
            threshold: [0.1, 0.25, 0.5, 0.75, 0.9]
        });

        // Compute base scale using Page 1 as reference for Fit to Viewer width
        const firstPage = await this.pdfDoc.getPage(1);
        const unscaledViewport = firstPage.getViewport({ scale: 1.0 });
        const containerWidth = this.viewport ? this.viewport.clientWidth : 900;
        
        const paddingX = window.innerWidth < 640 ? 12 : 28;
        const availableWidth = Math.max(containerWidth - (paddingX * 2), 280);

        const scaleByWidth = availableWidth / unscaledViewport.width;
        
        let baseScale;
        if (this.fitMode === 'viewer') {
            baseScale = Math.min(scaleByWidth, 1.85);
        } else {
            baseScale = (availableWidth / unscaledViewport.width) * this.zoomLevel;
        }

        const computedScale = baseScale * (this.fitMode === 'viewer' ? this.zoomLevel : 1.0);
        const dpr = Math.min(window.devicePixelRatio || 1, 2.5);

        // Render all PDF pages stacked continuously with natural gaps
        for (let i = 1; i <= this.totalPages; i++) {
            const page = await this.pdfDoc.getPage(i);
            const viewport = page.getViewport({ scale: computedScale });

            // Create wrapper for the page
            const wrapper = document.createElement('div');
            wrapper.className = 'pdf-page-wrapper paper-shadow rounded-sm overflow-hidden bg-white border border-slate-700/40 relative select-none';
            wrapper.setAttribute('data-page-num', i);

            // Create canvas
            const canvas = document.createElement('canvas');
            canvas.className = 'block max-w-full h-auto select-none';
            canvas.width = Math.floor(viewport.width * dpr);
            canvas.height = Math.floor(viewport.height * dpr);
            canvas.style.width = `${Math.floor(viewport.width)}px`;
            canvas.style.height = `${Math.floor(viewport.height)}px`;

            wrapper.appendChild(canvas);
            this.pagesContainer.appendChild(wrapper);

            // Render content to canvas with high quality
            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            const transform = dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : null;

            page.render({
                canvasContext: ctx,
                transform: transform,
                viewport: viewport
            });

            // Observe the wrapper for scroll tracking
            this.pageObserver.observe(wrapper);
        }

        this.updateToolbarState();

        requestAnimationFrame(() => {
            this.pagesContainer.classList.remove('opacity-0');
        });
    }

    updateToolbarState() {
        if (this.pageCurrentEl) this.pageCurrentEl.textContent = this.currentPage;
        if (this.pageTotalEl) this.pageTotalEl.textContent = this.totalPages;

        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentPage <= 1;
            this.prevBtn.classList.toggle('opacity-25', this.currentPage <= 1);
            this.prevBtn.classList.toggle('cursor-not-allowed', this.currentPage <= 1);
        }

        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentPage >= this.totalPages;
            this.nextBtn.classList.toggle('opacity-25', this.currentPage >= this.totalPages);
            this.nextBtn.classList.toggle('cursor-not-allowed', this.currentPage >= this.totalPages);
        }

        if (this.zoomLevelEl) {
            this.zoomLevelEl.textContent = `${Math.round(this.zoomLevel * 100)}%`;
        }

        if (this.fitBtn) {
            if (this.zoomLevel === 1.0 && this.fitMode === 'viewer') {
                this.fitBtn.classList.add('text-primary', 'bg-slate-700/60');
            } else {
                this.fitBtn.classList.remove('text-primary', 'bg-slate-700/60');
            }
        }
    }

    goToPage(pageNum) {
        if (pageNum < 1 || pageNum > this.totalPages) return;
        
        const targetWrapper = this.pagesContainer.querySelector(`[data-page-num="${pageNum}"]`);
        if (targetWrapper && this.viewport) {
            // Smoothly scroll the internal viewport to the target page
            this.viewport.scrollTo({
                top: targetWrapper.offsetTop - 20,
                behavior: 'smooth'
            });
        }
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.goToPage(this.currentPage - 1);
        }
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.goToPage(this.currentPage + 1);
        }
    }

    zoomIn() {
        const nextZoom = this.zoomSteps.find(step => step > this.zoomLevel + 0.05);
        if (nextZoom) {
            this.setZoom(nextZoom);
        } else if (this.zoomLevel < 2.0) {
            this.setZoom(2.0);
        }
    }

    zoomOut() {
        const prevZoom = [...this.zoomSteps].reverse().find(step => step < this.zoomLevel - 0.05);
        if (prevZoom) {
            this.setZoom(prevZoom);
        } else if (this.zoomLevel > 0.5) {
            this.setZoom(0.5);
        }
    }

    resetZoom() {
        this.fitMode = 'viewer';
        this.zoomLevel = 1.0;
        this.renderAllPages();
    }

    setZoom(level) {
        this.zoomLevel = Math.max(0.5, Math.min(2.0, level));
        this.fitMode = 'custom';
        this.renderAllPages();
    }

    toggleFullscreen() {
        if (!this.container) return;

        if (!document.fullscreenElement) {
            if (this.container.requestFullscreen) {
                this.container.requestFullscreen().catch(err => {
                    console.warn('Fullscreen request failed:', err);
                });
            } else if (this.container.webkitRequestFullscreen) {
                this.container.webkitRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }

    updateFullscreenState() {
        this.isFullscreen = !!document.fullscreenElement;
        
        if (this.fullscreenBtn) {
            const icon = this.fullscreenBtn.querySelector('.material-symbols-outlined');
            if (icon) {
                icon.textContent = this.isFullscreen ? 'fullscreen_exit' : 'fullscreen';
            }
            this.fullscreenBtn.setAttribute('title', this.isFullscreen ? 'Exit Fullscreen (Esc)' : 'Fullscreen (F)');
        }

        if (this.container) {
            if (this.isFullscreen) {
                this.container.classList.add('fullscreen-mode');
            } else {
                this.container.classList.remove('fullscreen-mode');
            }
        }

        setTimeout(() => this.renderAllPages(), 120);
    }

    showLoading() {
        if (this.loadingOverlay) this.loadingOverlay.classList.remove('hidden');
        if (this.errorOverlay) this.errorOverlay.classList.add('hidden');
        if (this.pagesContainer) {
            this.pagesContainer.classList.add('opacity-0');
        }
    }

    hideLoading() {
        if (this.loadingOverlay) this.loadingOverlay.classList.add('hidden');
    }

    showError() {
        if (this.loadingOverlay) this.loadingOverlay.classList.add('hidden');
        if (this.errorOverlay) this.errorOverlay.classList.remove('hidden');
        if (this.pagesContainer) this.pagesContainer.classList.add('opacity-0');
        
        const currentResume = this.getCurrentResume();
        const fallbackBtn = document.getElementById('error-open-btn');
        if (fallbackBtn) {
            const targetUrl = window.location.protocol === 'file:' 
                ? (this.pdfBlobUrl || currentResume.fallbackFile || ('resumes/' + currentResume.fileName))
                : currentResume.file;
            fallbackBtn.onclick = () => window.open(targetUrl, '_blank');
        }
    }

    bindEvents() {
        // Explicit Previous / Next Page Navigation (Click only)
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prevPage());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextPage());

        // Zoom Controls
        if (this.zoomInBtn) this.zoomInBtn.addEventListener('click', () => this.zoomIn());
        if (this.zoomOutBtn) this.zoomOutBtn.addEventListener('click', () => this.zoomOut());
        if (this.fitBtn) this.fitBtn.addEventListener('click', () => this.resetZoom());

        // Fullscreen
        if (this.fullscreenBtn) this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
        document.addEventListener('fullscreenchange', () => this.updateFullscreenState());
        document.addEventListener('webkitfullscreenchange', () => this.updateFullscreenState());

        // Responsive Resize Handler with Debounce
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeDebounceTimer);
            this.resizeDebounceTimer = setTimeout(() => {
                this.renderAllPages();
            }, 120);
        });

        // Error retry button
        const retryBtn = document.getElementById('error-retry-btn');
        if (retryBtn) {
            retryBtn.addEventListener('click', () => {
                this.loadResume(this.activeResumeIndex);
            });
        }

        // Hashchange listener for URL navigation
        window.addEventListener('hashchange', () => {
            const hash = (window.location.hash || '').toLowerCase();
            let targetIdx = 0;
            if (hash.includes('full') || hash.includes('general') || hash.includes('software')) {
                targetIdx = 1;
            }
            if (targetIdx !== this.activeResumeIndex) {
                this.loadResume(targetIdx);
            }
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;

            if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
                e.preventDefault();
                this.prevPage();
            } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
                e.preventDefault();
                this.nextPage();
            } else if ((e.key === '+' || e.key === '=') && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                this.zoomIn();
            } else if ((e.key === '-' || e.key === '_') && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                this.zoomOut();
            } else if (e.key === '0' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                this.resetZoom();
            } else if (e.key.toLowerCase() === 'f' && !e.ctrlKey && !e.metaKey) {
                if (!window.getSelection().toString()) {
                    e.preventDefault();
                    this.toggleFullscreen();
                }
            }
        });
    }
}

// Instantiate viewer when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.resumeViewerInstance = new ResumeViewer();
});
