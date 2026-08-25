/**
 * Live GitHub Repository Fetcher & Categorizer
 * Fetches the 23 GitHub repositories for YashwanthNavari and renders each project
 * exactly ONCE in its designated primary category with zero duplication.
 */

document.addEventListener('DOMContentLoaded', async () => {
    const categoryKeys = ['ai-ml', 'cv', 'web', 'desktop', 'data', 'iot', 'healthcare', 'systems', 'smartcity', 'devtools'];
    const grids = {};
    categoryKeys.forEach(key => {
        grids[key] = document.getElementById(`grid-${key}`);
    });

    const githubUsername = 'YashwanthNavari';
    const apiUrl = `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`;

    // Exact deterministic 1-to-1 category mapping (Prevents any project duplication)
    const repoCategoryMap = {
        '-Heart-Disease-Risk-Prediction-System': 'ai-ml',
        'nuerovision-ml-platform': 'ai-ml',
        'SupportSphere-AI': 'ai-ml',

        'DeepFER-Live': 'cv',
        'age_gender_detection': 'cv',
        'ml-object-detection-system': 'cv',

        'attendance-tracking-system': 'web',
        'NayePankh-Volunteer-Internship-Management-System': 'web',
        'yashwanth-portfolio': 'web',
        'YashwanthNavari': 'web',
        'yashwanthreddyportfolio': 'web',

        'Hospital-Management-System': 'desktop',
        'Outing-PDF-Generator': 'desktop',

        '-Cricbuzz-LiveStats': 'data',
        'Netflix-Movies-and-TV-Shows-Clustering-using-Unsupervised-Machine-Learning': 'data',

        'smart-campus-network': 'iot',

        'organ-donation-app': 'healthcare',

        'Real-Time-Priority-Aware-Disk-Scheduling-Using-Live-Folder-Monitoring-in-Gaming-Environments': 'systems',
        'sandbox': 'systems',

        'SmartPark-Intelligent-Parking-Management': 'smartcity',
        'agrisathi--smart-farmer-assistant': 'smartcity',

        'DeveloperZip-Intelligent-Project-Packaging-for-Software-Developers': 'devtools',
        'testingfile': 'devtools'
    };

    // Descriptions fallback for repos with empty bio
    const repoDescriptionFallback = {
        'age_gender_detection': 'Real-time computer vision deep learning model for age and gender estimation using OpenCV & CNN.',
        'NayePankh-Volunteer-Internship-Management-System': 'NGO internship and volunteer management platform with applicant tracking and certificate generation.',
        'Outing-PDF-Generator': 'Automated PDF generator and pass issuance utility for college student outings.',
        'sandbox': 'Experimental code playground and system testing environment.',
        'testingfile': 'Testing script repository for data processing pipelines and algorithms.',
        'YashwanthNavari': 'GitHub profile README and developer identity showcase repository.',
        'yashwanthreddyportfolio': 'Modern high-performance developer portfolio built with Tailwind CSS and vanilla JavaScript.'
    };

    // Complete offline dataset of all 23 repositories (guarantees instantaneous rendering even on rate limit or offline)
    const backupRepos = [
        { "name": "-Cricbuzz-LiveStats", "description": "Real-Time Cricket Analytics Dashboard built using Python, PostgreSQL, Streamlit, SQL, and the Cricbuzz RapidAPI.", "language": "Python", "stargazers_count": 0, "forks_count": 0, "html_url": "https://github.com/YashwanthNavari/-Cricbuzz-LiveStats" },
        { "name": "-Heart-Disease-Risk-Prediction-System", "description": "Supervised machine learning model that predicts the presence of heart disease using patient medical parameters.", "language": "Python", "stargazers_count": 1, "forks_count": 0, "html_url": "https://github.com/YashwanthNavari/-Heart-Disease-Risk-Prediction-System" },
        { "name": "age_gender_detection", "description": "Real-time computer vision deep learning model for age and gender estimation using OpenCV & CNN.", "language": "Python", "stargazers_count": 0, "forks_count": 0, "html_url": "https://github.com/YashwanthNavari/age_gender_detection" },
        { "name": "agrisathi--smart-farmer-assistant", "description": "AgriSathi is a machine learning–driven agricultural assistance platform for crop recommendation, disease detection, and yield prediction.", "language": "TypeScript", "stargazers_count": 1, "forks_count": 0, "html_url": "https://github.com/YashwanthNavari/agrisathi--smart-farmer-assistant" },
        { "name": "attendance-tracking-system", "description": "An automated attendance tracking system that records, manages, and reports attendance efficiently using digital technology.", "language": "JavaScript", "stargazers_count": 1, "forks_count": 0, "html_url": "https://github.com/YashwanthNavari/attendance-tracking-system" },
        { "name": "DeepFER-Live", "description": "Live webcam facial emotion recognition using a custom CNN trained on the FER-2013 dataset.", "language": "Python", "stargazers_count": 0, "forks_count": 0, "html_url": "https://github.com/YashwanthNavari/DeepFER-Live" },
        { "name": "DeveloperZip-Intelligent-Project-Packaging-for-Software-Developers", "description": "Intelligent desktop application designed to simplify and optimize the compression and packaging of software projects.", "language": "TypeScript", "stargazers_count": 0, "forks_count": 0, "html_url": "https://github.com/YashwanthNavari/DeveloperZip-Intelligent-Project-Packaging-for-Software-Developers" },
        { "name": "Hospital-Management-System", "description": "Interactive Hospital Management System with patient & doctor management, record search, and database handling.", "language": "Python", "stargazers_count": 1, "forks_count": 0, "html_url": "https://github.com/YashwanthNavari/Hospital-Management-System" },
        { "name": "ml-object-detection-system", "description": "A machine learning-based object detection system that identifies and localizes objects in real time using deep learning and computer vision.", "language": "Python", "stargazers_count": 0, "forks_count": 0, "html_url": "https://github.com/YashwanthNavari/ml-object-detection-system" },
        { "name": "NayePankh-Volunteer-Internship-Management-System", "description": "NGO internship and volunteer management platform with applicant tracking and certificate generation.", "language": "JavaScript", "stargazers_count": 0, "forks_count": 0, "html_url": "https://github.com/YashwanthNavari/NayePankh-Volunteer-Internship-Management-System" },
        { "name": "Netflix-Movies-and-TV-Shows-Clustering-using-Unsupervised-Machine-Learning", "description": "Unsupervised machine learning model that clusters Netflix movies and TV shows based on textual features and metadata.", "language": "Python", "stargazers_count": 0, "forks_count": 0, "html_url": "https://github.com/YashwanthNavari/Netflix-Movies-and-TV-Shows-Clustering-using-Unsupervised-Machine-Learning" },
        { "name": "nuerovision-ml-platform", "description": "Deep learning object detection and neurological model training platform with data augmentation and real-time OpenCV inference.", "language": "TypeScript", "stargazers_count": 1, "forks_count": 0, "html_url": "https://github.com/YashwanthNavari/nuerovision-ml-platform" },
        { "name": "organ-donation-app", "description": "A smart organ donation app matching donors and recipients using secure data processing and intelligent recommendation algorithms.", "language": "PHP", "stargazers_count": 0, "forks_count": 0, "html_url": "https://github.com/YashwanthNavari/organ-donation-app" },
        { "name": "Outing-PDF-Generator", "description": "Automated PDF generator and pass issuance utility for college student outings.", "language": "Python", "stargazers_count": 0, "forks_count": 0, "html_url": "https://github.com/YashwanthNavari/Outing-PDF-Generator" },
        { "name": "Real-Time-Priority-Aware-Disk-Scheduling-Using-Live-Folder-Monitoring-in-Gaming-Environments", "description": "Operating system disk I/O scheduling simulation visualizing FCFS, SSTF, SCAN, and C-SCAN algorithms with live folder telemetry.", "language": "Python", "stargazers_count": 1, "forks_count": 0, "html_url": "https://github.com/YashwanthNavari/Real-Time-Priority-Aware-Disk-Scheduling-Using-Live-Folder-Monitoring-in-Gaming-Environments" },
        { "name": "sandbox", "description": "Experimental code playground and system testing environment.", "language": "JavaScript", "stargazers_count": 0, "forks_count": 0, "html_url": "https://github.com/YashwanthNavari/sandbox" },
        { "name": "smart-campus-network", "description": "Smart Campus Network architecture with automatic access control and sensor monitoring.", "language": "Python", "stargazers_count": 1, "forks_count": 0, "html_url": "https://github.com/YashwanthNavari/smart-campus-network" },
        { "name": "SmartPark-Intelligent-Parking-Management", "description": "Smart Parking System simulating real-time vehicle entry, automated slot allocation, duration billing, and telemetry.", "language": "JavaScript", "stargazers_count": 1, "forks_count": 0, "html_url": "https://github.com/YashwanthNavari/SmartPark-Intelligent-Parking-Management" },
        { "name": "SupportSphere-AI", "description": "Enterprise-grade AI-powered customer support platform featuring conversational AI, multi-agent workflows, and analytics.", "language": "TypeScript", "stargazers_count": 0, "forks_count": 0, "html_url": "https://github.com/YashwanthNavari/SupportSphere-AI" },
        { "name": "testingfile", "description": "Testing script repository for data processing pipelines and algorithms.", "language": "TypeScript", "stargazers_count": 0, "forks_count": 0, "html_url": "https://github.com/YashwanthNavari/testingfile" },
        { "name": "yashwanth-portfolio", "description": "Personal developer portfolio website showcasing technical skills, projects, and achievements in web development and data science.", "language": "HTML", "stargazers_count": 1, "forks_count": 0, "html_url": "https://github.com/YashwanthNavari/yashwanth-portfolio" },
        { "name": "YashwanthNavari", "description": "GitHub profile README and developer identity showcase repository.", "language": "Markdown", "stargazers_count": 0, "forks_count": 0, "html_url": "https://github.com/YashwanthNavari/YashwanthNavari" },
        { "name": "yashwanthreddyportfolio", "description": "Modern high-performance developer portfolio built with Tailwind CSS and vanilla JavaScript.", "language": "JavaScript", "stargazers_count": 0, "forks_count": 0, "html_url": "https://github.com/YashwanthNavari/yashwanthreddyportfolio" }
    ];

    const getPrimaryCategory = (repo) => {
        if (repoCategoryMap[repo.name]) {
            return repoCategoryMap[repo.name];
        }
        const text = (repo.name + ' ' + (repo.description || '')).toLowerCase();
        const lang = (repo.language || '').toLowerCase();

        if (text.includes('cv') || text.includes('vision') || text.includes('detect') || text.includes('fer')) return 'cv';
        if (text.includes('ai') || text.includes('ml') || text.includes('predict') || text.includes('model') || text.includes('learning')) return 'ai-ml';
        if (text.includes('data') || text.includes('analytic') || text.includes('stats') || text.includes('cluster') || text.includes('cricbuzz')) return 'data';
        if (text.includes('iot') || text.includes('sensor')) return 'iot';
        if (text.includes('health') || text.includes('medical') || text.includes('hospital') || text.includes('organ') || text.includes('heart')) return 'healthcare';
        if (text.includes('parking') || text.includes('city') || text.includes('farmer') || text.includes('agri')) return 'smartcity';
        if (text.includes('system') || text.includes('disk') || text.includes('schedul') || text.includes('os')) return 'systems';
        if (text.includes('desktop') || text.includes('pdf') || text.includes('gui') || text.includes('tkinter')) return 'desktop';
        if (text.includes('tool') || text.includes('zip') || text.includes('packag') || text.includes('test')) return 'devtools';
        if (text.includes('web') || text.includes('app') || lang.includes('html') || lang.includes('javascript') || lang.includes('typescript')) return 'web';
        return 'web';
    };

    let repos = [];

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('GitHub API rate limit or network error');
        const fetched = await response.json();
        if (Array.isArray(fetched) && fetched.length > 0) {
            // Keep all non-fork repositories (Total: exactly 23 repos)
            repos = fetched.filter(r => !r.fork);
        }
    } catch (e) {
        console.warn('Falling back to embedded GitHub repositories data:', e);
        repos = backupRepos;
    }

    if (!repos || repos.length === 0) {
        repos = backupRepos;
    }

    // Ensure description fallback if GitHub repo has empty description
    repos.forEach(repo => {
        if (!repo.description && repoDescriptionFallback[repo.name]) {
            repo.description = repoDescriptionFallback[repo.name];
        }
    });

    const themeConfig = {
        'ai-ml': { bgGlow: 'from-violet-500', badgeBg: 'bg-violet-500', lightBadge: 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400', label: 'AI & ML' },
        'cv': { bgGlow: 'from-purple-500', badgeBg: 'bg-purple-500', lightBadge: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400', label: 'VISION' },
        'web': { bgGlow: 'from-rose-500', badgeBg: 'bg-rose-500', lightBadge: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400', label: 'WEB' },
        'desktop': { bgGlow: 'from-orange-500', badgeBg: 'bg-orange-500', lightBadge: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400', label: 'DESKTOP' },
        'data': { bgGlow: 'from-amber-500', badgeBg: 'bg-amber-500', lightBadge: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400', label: 'DATA' },
        'iot': { bgGlow: 'from-emerald-500', badgeBg: 'bg-emerald-500', lightBadge: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400', label: 'IOT' },
        'healthcare': { bgGlow: 'from-red-500', badgeBg: 'bg-red-500', lightBadge: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400', label: 'HEALTHCARE' },
        'systems': { bgGlow: 'from-blue-500', badgeBg: 'bg-blue-500', lightBadge: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400', label: 'SYSTEMS' },
        'smartcity': { bgGlow: 'from-sky-500', badgeBg: 'bg-sky-500', lightBadge: 'bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400', label: 'SMART CITY' },
        'devtools': { bgGlow: 'from-indigo-500', badgeBg: 'bg-indigo-500', lightBadge: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400', label: 'DEV TOOLS' }
    };

    const fallbackImage = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop';

    const counts = {};
    categoryKeys.forEach(k => counts[k] = 0);

    // Clear all grids
    Object.values(grids).forEach(grid => {
        if (grid) grid.innerHTML = '';
    });

    // Render each repo EXACTLY ONCE into its single primary category
    repos.forEach(repo => {
        const category = getPrimaryCategory(repo);
        counts[category]++;

        const cfg = themeConfig[category] || themeConfig['web'];

        const cardHTML = `
            <div class="block relative w-full h-48 bg-slate-100 dark:bg-slate-900 overflow-hidden border-b border-slate-200 dark:border-[#30363d] p-5 flex flex-col justify-between cursor-pointer">
                <div class="absolute -right-10 -bottom-10 w-48 h-48 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] ${cfg.bgGlow} opacity-40 blur-2xl group-hover:scale-125 transition-transform duration-700 pointer-events-none"></div>
                
                <div class="relative z-10 flex justify-between items-start pointer-events-none">
                    <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${cfg.badgeBg} text-white font-bold text-[10px] uppercase tracking-wider shadow-sm">
                        <span class="w-1.5 h-1.5 rounded-full bg-white animate-[pulse_2s_ease-in-out_infinite]"></span> ${cfg.label}
                    </div>
                    <div class="inline-flex items-center px-2 py-0.5 rounded bg-slate-600/80 text-white font-bold text-[10px] shadow-sm backdrop-blur">
                        ${repo.language || 'Code'}
                    </div>
                </div>
                
                <div class="absolute right-5 inset-y-0 flex items-center z-10 pointer-events-none">
                    <div class="w-16 h-16 rounded-full border-2 border-white dark:border-slate-800 overflow-hidden shadow-lg transform translate-y-2 opacity-90 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300">
                        <img src="${(repo.owner && repo.owner.avatar_url) ? repo.owner.avatar_url : 'https://github.com/YashwanthNavari.png'}" class="w-full h-full object-cover" alt="Profile">
                    </div>
                </div>

                <div class="relative z-10 flex flex-col mt-auto w-[80%] drop-shadow-md pointer-events-none">
                    <h4 class="text-sm text-slate-800 dark:text-slate-400 font-medium mb-0.5 opacity-80">${githubUsername} /</h4>
                    <h3 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                        ${repo.name}
                    </h3>
                    <p class="text-[11px] text-slate-600 dark:text-slate-300 mt-1.5 line-clamp-1 font-medium">${repo.description || 'Click to explore project details.'}</p>
                </div>
                
                <div class="relative z-10 flex items-center gap-4 mt-3 text-slate-700 dark:text-slate-400 pb-1 pointer-events-none">
                    <div class="flex items-center gap-1.5 opacity-80">
                        <span class="material-symbols-outlined text-[14px]">star</span>
                        <span class="text-xs font-bold">${repo.stargazers_count}</span>
                    </div>
                    <div class="flex items-center gap-1.5 opacity-80">
                        <span class="material-symbols-outlined text-[14px]">fork_right</span>
                        <span class="text-xs font-bold">${repo.forks_count}</span>
                    </div>
                </div>
            </div>
            
            <div class="p-5 flex flex-col flex-grow relative bg-white dark:bg-[#0d1117]">
                <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 flex-grow line-clamp-2">
                    ${repo.description || 'Click to view more details about this project in the repository viewer.'}
                </p>
                
                <div class="flex justify-between items-center mt-auto">
                    <div class="flex items-center gap-2">
                        <span class="px-2.5 py-1 ${cfg.lightBadge} font-bold text-[11px] uppercase rounded-full shadow-sm">
                            ${cfg.label}
                        </span>
                    </div>
                    <button class="card-btn flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-primary transition-colors group/btn">
                        View Details 
                        <span class="material-symbols-outlined text-[16px] group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                </div>
            </div>
        `;

        const wrapper = document.createElement('div');
        wrapper.className = 'project-card-gh project-item cursor-pointer bg-white dark:bg-[#0d1117] rounded-xl overflow-hidden border border-slate-200 dark:border-[#30363d] shadow-sm hover:shadow-xl transition-all duration-300 w-full flex flex-col group block animate-fade-in';
        wrapper.setAttribute('data-category', category);
        wrapper.setAttribute('data-repo', repo.name);
        wrapper.setAttribute('data-image', fallbackImage);
        wrapper.innerHTML = cardHTML;
        
        const targetGrid = grids[category];
        if (targetGrid) {
            targetGrid.appendChild(wrapper);
        }
    });

    // Update total count on the "All Projects" filter button (Exactly 23)
    const totalCount = repos.length;
    const btnAll = document.querySelector('[data-filter="all"]');
    if (btnAll) btnAll.textContent = `✦ All Projects (${totalCount})`;

    const buttonLabels = {
        'ai-ml': '🤖 AI & ML',
        'cv': '👁 Computer Vision',
        'web': '🌐 Web Apps',
        'desktop': '💻 Desktop',
        'data': '📊 Data Science',
        'iot': '📡 IoT & Smart Systems',
        'healthcare': '🏥 Healthcare',
        'systems': '⚙️ Systems',
        'smartcity': '🚗 Smart City',
        'devtools': '🛠 Dev Tools'
    };

    categoryKeys.forEach(k => {
        const btn = document.querySelector(`[data-filter="${k}"]`);
        if (btn) btn.textContent = `${buttonLabels[k]} (${counts[k]})`;

        // Update section count badge
        const grid = document.getElementById(`grid-${k}`);
        if (grid && grid.previousElementSibling) {
            const span = grid.previousElementSibling.querySelector('span');
            if (span) {
                span.textContent = `${counts[k]} Project${counts[k] !== 1 ? 's' : ''}`;
            }
        }
    });

    // Update hero description to reflect the exact 23 repositories
    const heroDesc = document.querySelector('section p.text-slate-500');
    if (heroDesc) {
        heroDesc.textContent = `A collection of ${totalCount} projects spanning AI, Computer Vision, Web Apps, Desktop Systems, Data Science, and IoT — built to solve real-world problems.`;
    }

    // Trigger filter system to ensure proper display
    if (typeof window.filterProjects === 'function') {
        setTimeout(window.filterProjects, 50);
    }
});
