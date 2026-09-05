/**
 * interactions.js
 * Handles interactive elements on the landing page including:
 * 1. Typing effect for hero text
 * 2. 3D Tilt effect for profile card
 * 3. Background particle animation
 * 4. Scroll reveal animations
 * 5. Terminal widget typewriter effect
 * 6. Stats count-up animation
 * 7. Mobile navigation
 */

document.addEventListener('DOMContentLoaded', () => {
    initTypingEffect();
    initTiltEffect();
    initBackgroundAnimation();
    initScrollReveal();
    initTerminalTypewriter();
    initCountUp();
    initMobileMenu();
    initKonamiCode();
    initLiveTime();
    initActivityHeatmap();
    initCustomCursor();
    initScrollProgress();
    initTelemetry();
});

function initTypingEffect() {
    const targetElement = document.getElementById('typing-text');
    if (!targetElement) return;

    const phrases = [
        "Data Scientist",
        "Software Engineer",
        "Machine Learning Engineer",
        "Full Stack Developer"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            targetElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Faster when deleting
        } else {
            targetElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100; // Normal typing speed
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end of phrase
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before typing next phrase
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

/**
 * Initializes 3D tilt effect on elements with class 'tilt-card'
 * or the specific ID 'tilt-card' for backward compatibility.
 */
function initTiltEffect() {
    // Select both the specific ID (landing page) and any class instances (project cards)
    const cards = document.querySelectorAll('#tilt-card, .tilt-card');

    if (cards.length === 0) return;

    cards.forEach(card => {
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
    });

    function handleMouseMove(e) {
        // 'this' refers to the card element attached to the event
        const card = this;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Max rotation deg
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.transition = 'transform 0.1s ease';
    }

    function handleMouseLeave() {
        const card = this;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.5s ease';
    }
}

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

function initBackgroundAnimation() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let nodes = [];
    let pulses = [];
    
    // Mouse tracking for parallax and hover interaction
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let targetMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    window.addEventListener('mousemove', (e) => {
        targetMouse.x = e.clientX;
        targetMouse.y = e.clientY;
    });

    // Resize handler
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initNodes(); // Re-initialize to fit new screen size
    }

    window.addEventListener('resize', resize);

    function getThemeColors() {
        const style = getComputedStyle(document.documentElement);
        return {
            primary: style.getPropertyValue('--main-color').trim() || '#0ea5e9',
            secondary: style.getPropertyValue('--secondary-color').trim() || '#2563eb',
            isDark: document.documentElement.classList.contains('dark')
        };
    }

    class Node {
        constructor(id) {
            this.id = id;
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.z = Math.random() * 2 + 1; // Depth for parallax
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.radius = Math.random() * 2 + 1;
            this.connections = [];
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Parallax movement
            const dx = mouse.x - (width / 2);
            const dy = mouse.y - (height / 2);
            this.renderX = this.x - (dx * 0.02) / this.z;
            this.renderY = this.y - (dy * 0.02) / this.z;

            // Screen wrap
            if (this.x < -50) this.x = width + 50;
            if (this.x > width + 50) this.x = -50;
            if (this.y < -50) this.y = height + 50;
            if (this.y > height + 50) this.y = -50;
        }

        draw(colors) {
            const distToMouse = Math.hypot(this.renderX - mouse.x, this.renderY - mouse.y);
            const opacity = Math.max(0.1, 1 - (distToMouse / 500));
            
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.renderX, this.renderY, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = colors.isDark ? `rgba(255, 255, 255, ${opacity * 0.5})` : `rgba(15, 23, 42, ${opacity * 0.3})`;
            ctx.fill();

            // Hover glow
            if (distToMouse < 150) {
                ctx.beginPath();
                ctx.arc(this.renderX, this.renderY, this.radius * 3, 0, Math.PI * 2);
                ctx.globalAlpha = (1 - distToMouse / 150) * 0.3;
                ctx.fillStyle = colors.primary;
                ctx.fill();
            }
            ctx.restore();
        }
    }

    class DataPulse {
        constructor(startNode, endNode, color) {
            this.start = startNode;
            this.end = endNode;
            this.t = 0;
            this.speed = 0.005 + Math.random() * 0.01;
            this.color = color;
        }

        update() {
            this.t += this.speed;
            return this.t >= 1;
        }

        draw() {
            const x = this.start.renderX + (this.end.renderX - this.start.renderX) * this.t;
            const y = this.start.renderY + (this.end.renderY - this.start.renderY) * this.t;
            
            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.restore();
        }
    }

    function initNodes() {
        nodes = [];
        const count = Math.floor((width * height) / 15000); // Dynamic density
        for (let i = 0; i < Math.min(count, 100); i++) {
            nodes.push(new Node(i));
        }
    }

    resize();

    // Helper: Distance from point to line segment
    function distToSegment(p, v, w) {
        const l2 = Math.pow(v.renderX - w.renderX, 2) + Math.pow(v.renderY - w.renderY, 2);
        if (l2 === 0) return Math.hypot(p.x - v.renderX, p.y - v.renderY);
        let t = ((p.x - v.renderX) * (w.renderX - v.renderX) + (p.y - v.renderY) * (w.renderY - v.renderY)) / l2;
        t = Math.max(0, Math.min(1, t));
        return Math.hypot(p.x - (v.renderX + t * (w.renderX - v.renderX)), p.y - (v.renderY + t * (w.renderY - v.renderY)));
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        const colors = getThemeColors();

        // Smooth mouse lag
        mouse.x += (targetMouse.x - mouse.x) * 0.08;
        mouse.y += (targetMouse.y - mouse.y) * 0.08;

        // Update and draw nodes
        nodes.forEach(node => {
            node.update();
            node.draw(colors);
        });

        // Draw connections and spawn pulses
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const n1 = nodes[i];
                const n2 = nodes[j];
                const dist = Math.hypot(n1.renderX - n2.renderX, n1.renderY - n2.renderY);

                if (dist < 200) {
                    ctx.save();
                    const opacity = (1 - (dist / 200)) * 0.2;
                    ctx.strokeStyle = colors.isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(15, 23, 42, ${opacity})`;
                    
                    // Highlight connection if near mouse
                    const mouseToLine = distToSegment(mouse, n1, n2);
                    if (mouseToLine < 50) {
                        ctx.strokeStyle = colors.primary;
                        ctx.globalAlpha = 0.4;
                        ctx.lineWidth = 1.5;
                    } else {
                        ctx.lineWidth = 0.5;
                    }

                    ctx.beginPath();
                    ctx.moveTo(n1.renderX, n1.renderY);
                    ctx.lineTo(n2.renderX, n2.renderY);
                    ctx.stroke();
                    ctx.restore();

                    // Randomly spawn pulses
                    if (Math.random() < 0.001 && pulses.length < 20) {
                        pulses.push(new DataPulse(n1, n2, colors.primary));
                    }
                }
            }
        }

        // Update and draw pulses
        pulses = pulses.filter(p => {
            p.draw();
            return !p.update();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

/**
 * Terminal Widget Typewriter Effect
 * Simulates a system boot or model training log
 */
function initTerminalTypewriter() {
    const terminalContent = document.getElementById('typewriter-content');
    if (!terminalContent) return;

    const lines = [
        "navari@dev-env:~ $ ./deploy_portfolio.sh",
        "[INFO] Initializing system core...",
        "[INFO] Booting neural network modules...",
        "> import torch",
        "> print(f'PyTorch {torch.__version__} loaded')",
        "[SUCCESS] Optimization level set to MAX",
        "[INFO] Connecting to project database...",
        "[SUCCESS] Access granted. (HTTP 200)",
        "[INFO] Starting portfolio service on port 8080...",
        "navari@dev-env:~ $ Status: ONLINE ✨"
    ];

    let lineIndex = 0;
    let charIndex = 0;

    function typeLine() {
        if (lineIndex >= lines.length) {
            // Optional: loop back or stop
            return;
        }

        const currentLine = lines[lineIndex];

        if (charIndex === 0) {
            // Add a new line div
            const lineDiv = document.createElement('div');
            lineDiv.className = 'mb-1';
            terminalContent.appendChild(lineDiv);
        }

        const currentDiv = terminalContent.lastChild;
        currentDiv.textContent = currentLine.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex < currentLine.length) {
            setTimeout(typeLine, Math.random() * 30 + 20); // Random typing speed
        } else {
            lineIndex++;
            charIndex = 0;
            setTimeout(typeLine, 400); // Pause between lines
        }

        // Auto scroll to bottom
        terminalContent.scrollTop = terminalContent.scrollHeight;
    }

    // Start with a small delay
    setTimeout(typeLine, 1000);
}

/**
 * Stats Count Up Animation
 */
function initCountUp() {
    const stats = document.querySelectorAll('.counter');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.getAttribute('data-target'));
                startCount(target, endValue);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));

    function startCount(element, target) {
        const duration = 2000; // 2 seconds
        let startTime = null;

        function update(currentTime) {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out quart
            const ease = 1 - Math.pow(1 - progress, 4);

            const current = Math.floor(ease * target);
            element.innerText = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.innerText = target; // Ensure final value is exact
            }
        }

        requestAnimationFrame(update);
    }
}

/**
 * Mobile Menu Toggle System
 * Harmonized with universal executive navigation controller in nav.js
 */
function initMobileMenu() {
    // If universal nav is handling the menu, link into its toggle controller
    if (typeof window.__navToggleMobileMenu === 'function') {
        window.toggleMobileMenu = window.__navToggleMobileMenu;
        return;
    }

    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Global fallback function
    window.toggleMobileMenu = function () {
        if (typeof window.__navToggleMobileMenu === 'function') {
            window.__navToggleMobileMenu();
            return;
        }
        if (!mobileMenu) return;

        const isClosed = mobileMenu.classList.contains('translate-x-full');
        if (isClosed) {
            mobileMenu.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
        }
    };

    // Only attach listener if universal nav container is not present
    if (!document.getElementById('main-nav-container') && menuBtn) {
        menuBtn.addEventListener('click', window.toggleMobileMenu);
    }
}

function initKonamiCode() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let currentPosition = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[currentPosition]) {
            currentPosition++;
            if (currentPosition === konamiCode.length) {
                triggerConfetti();
                currentPosition = 0;
            }
        } else {
            currentPosition = 0;
        }
    });

    function triggerConfetti() {
        // Simple confetti effect using canvas or DOM elements
        // For simplicity/performance without external libs, we'll use a quick DOM burst
        const colors = ['#135bec', '#ff0000', '#00ff00', '#ffff00', '#ff00ff'];

        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.top = '50%';
            confetti.style.left = '50%';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.zIndex = '9999';
            confetti.style.pointerEvents = 'none';
            document.body.appendChild(confetti);

            const angle = Math.random() * Math.PI * 2;
            const velocity = 5 + Math.random() * 10;
            const tx = Math.cos(angle) * velocity * 20;
            const ty = Math.sin(angle) * velocity * 20;

            const animation = confetti.animate([
                { transform: 'translate(0, 0)', opacity: 1 },
                { transform: `translate(${tx}px, ${ty}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: 1000 + Math.random() * 1000,
                easing: 'cubic-bezier(0, .9, .57, 1)',
                fill: 'forwards'
            });

            animation.onfinish = () => confetti.remove();
        }

        alert("🎮 Cheat Code Activated! God Mode Enabled (Just kidding, but cool find!)");
    }
}

function initLiveTime() {
    const timeElement = document.getElementById('live-time');
    if (!timeElement) return;

    function updateTime() {
        // Just show current local time (already adjusted to user's timezone implicitly by the browser)
        const now = new Date();
        timeElement.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    updateTime();
    setInterval(updateTime, 1000); // 1000ms = 1 second
}

function initActivityHeatmap() {
    const container = document.getElementById('activity-heatmap');
    if (!container) return;
    
    // Generate 42 weeks * 7 days ≈ 294 squares
    for (let i = 0; i < 294; i++) {
        const square = document.createElement('div');
        // Randomly assign a green shade mimicking GitHub commits
        const rand = Math.random();
        let bgClass = 'bg-slate-200 dark:bg-slate-800'; // No activity
        if (rand > 0.85) bgClass = 'bg-emerald-500'; // High activity
        else if (rand > 0.6) bgClass = 'bg-emerald-400'; // Medium
        else if (rand > 0.4) bgClass = 'bg-emerald-300'; // Low
        else if (rand > 0.3) bgClass = 'bg-emerald-200 dark:bg-emerald-900/40'; // Very Low

        square.className = `w-3 h-3 rounded-[2px] ${bgClass} transition-all duration-300 hover:scale-[1.3] hover:ring-1 ring-slate-400 relative group cursor-crosshair`;
        
        // Add tiny tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-0.5 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10 transition-opacity';
        tooltip.innerText = `${Math.floor(Math.random() * 15)} contributions`;
        
        square.appendChild(tooltip);
        container.appendChild(square);
    }
}

// === Personalization System: Dynamic Theme Color ===
window.changeThemeColor = function(primary, secondary) {
    document.documentElement.style.setProperty('--main-color', primary);
    document.documentElement.style.setProperty('--secondary-color', secondary);
    
    // Save to localStorage
    try {
        localStorage.setItem('theme-primary', primary);
        localStorage.setItem('theme-secondary', secondary);
    } catch(e) {}
};

// Application-wide Initializations
document.addEventListener('DOMContentLoaded', () => {
    // 1. Color Picker Memory
    try {
        const savedPrimary = localStorage.getItem('theme-primary');
        const savedSecondary = localStorage.getItem('theme-secondary');
        if(savedPrimary && savedSecondary) {
            changeThemeColor(savedPrimary, savedSecondary);
        }
    } catch(e) {}
    
    // 2. Smart Greeting
    const hour = new Date().getHours();
    let msg = "Hello, I am";
    if (hour < 12) msg = "Good Morning ☀️ I am";
    else if (hour < 18) msg = "Good Afternoon 🌤 I am";
    else msg = "Good Evening 🌙 I am";
    const greetEl = document.getElementById("smart-greeting");
    if(greetEl) greetEl.innerText = msg;
});

// === Secret Mode (Easter Egg) ===
document.addEventListener('keydown', (e) => {
    // Trigger on "Y" key (or "y")
    if (e.key.toLowerCase() === 'y' && !document.body.classList.contains('secret-mode-active')) {
        document.body.classList.add('secret-mode-active');
        
        // Matrix styling injection
        document.body.style.transition = "all 1s ease";
        document.body.style.backgroundColor = "#000000";
        document.body.style.color = "#00ff00";
        
        document.documentElement.style.setProperty('--main-color', '#00ff00');
        document.documentElement.style.setProperty('--secondary-color', '#00ff00');
        
        // Flash overlay text
        let msg = document.createElement('div');
        msg.innerText = "OVERRIDE ACCEPTED: MATRIX PROTOCOL ENGAGED";
        msg.style.position = "fixed";
        msg.style.top = "50%";
        msg.style.left = "50%";
        msg.style.transform = "translate(-50%, -50%)";
        msg.style.fontSize = "clamp(1.5rem, 4vw, 3rem)";
        msg.style.fontWeight = "900";
        msg.style.zIndex = "999999";
        msg.style.fontFamily = "monospace";
        msg.style.textAlign = "center";
        msg.style.textShadow = "0 0 20px #00ff00";
        msg.style.letterSpacing = "2px";
        msg.style.pointerEvents = "none";
        document.body.appendChild(msg);
        
        // Remove text after 4 seconds
        setTimeout(() => msg.remove(), 4000);
    }
});

// === Tic-Tac-Toe Bonus Mini-Game Logic ===
let tttBoard = ["", "", "", "", "", "", "", "", ""];
let tttActive = true;
let tttScores = { you: 0, ai: 0 };
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.ttt-cell').forEach(cell => {
        cell.addEventListener('click', () => {
            let idx = cell.getAttribute('data-idx');
            if (tttBoard[idx] !== "" || !tttActive) return;
            
            // Player Move (X)
            tttBoard[idx] = "X";
            cell.innerText = "X";
            cell.classList.add("text-primary");
            
            if (checkWin("X")) {
                endTTT("🏆 You Win!", "you");
                return;
            }
            if (!tttBoard.includes("")) {
                endTTT("🤝 Draw!", null);
                return;
            }

            // AI Move (O) with slight delay for realism
            tttActive = false; // Block clicks during AI turn
            document.getElementById('ttt-status').innerText = "AI thinking...";
            
            setTimeout(() => {
                let emptyIndices = tttBoard.map((val, i) => val === "" ? i : null).filter(v => v !== null);
                let aiMove = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
                
                tttBoard[aiMove] = "O";
                let aiCell = document.querySelector(`.ttt-cell[data-idx="${aiMove}"]`);
                aiCell.innerText = "O";
                aiCell.classList.add("text-red-500");

                if (checkWin("O")) {
                    endTTT("🤖 AI Wins!", "ai");
                } else {
                    document.getElementById('ttt-status').innerText = "Your Turn";
                    tttActive = true;
                }
            }, 600);
        });
    });
});

function checkWin(player) {
    return winConditions.some(comb => {
        return comb.every(idx => tttBoard[idx] === player);
    });
}

function endTTT(msg, winner) {
    tttActive = false;
    document.getElementById('ttt-status').innerText = msg;
    if (winner) {
        tttScores[winner]++;
        document.getElementById(`ttt-${winner}`).innerText = tttScores[winner];
    }
}

window.resetTTT = function() {
    tttBoard = ["", "", "", "", "", "", "", "", ""];
    tttActive = true;
    document.getElementById('ttt-status').innerText = "Match Restarted. Your Turn!";
    document.querySelectorAll('.ttt-cell').forEach(cell => {
        cell.innerText = "";
        cell.className = "ttt-cell w-full aspect-square bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg text-4xl font-black font-display text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors";
    });
};

// === Premium Unique Features ===

function initCustomCursor() {
    // Custom cursor disabled per user request. System default cursor is used.
}

function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.id = 'global-scroll-progress';
    document.body.appendChild(progressBar);

    const style = document.createElement('style');
    style.innerHTML = `
        #global-scroll-progress {
            position: fixed; top: 0; left: 0; height: 4px; width: 0%;
            background: linear-gradient(90deg, #2563eb, #10b981);
            z-index: 9999999; pointer-events: none; transition: width 0.1s ease-out;
            box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
            border-top-right-radius: 4px; border-bottom-right-radius: 4px;
        }
    `;
    document.head.appendChild(style);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        progressBar.style.width = progress + '%';
    });
}

/**
 * Rocket Launch Animation
 * Triggers a memorable "Hire Me" rocket takeoff before navigating or downloading.
 */
window.launchRocket = function(e, actionCallback) {
    if (e) e.preventDefault();
    
    // Create Rocket Element
    const rocket = document.createElement('div');
    rocket.innerHTML = '🚀';
    rocket.style.position = 'fixed';
    rocket.style.fontSize = '40px';
    rocket.style.zIndex = '999999';
    rocket.style.pointerEvents = 'none';
    rocket.style.filter = 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.6))';
    
    // Position at mouse click or center bottom
    let startX = window.innerWidth / 2;
    let startY = window.innerHeight;
    
    if (e && e.clientX) {
        startX = e.clientX;
        startY = e.clientY;
    }
    
    rocket.style.left = (startX - 20) + 'px';
    rocket.style.top = (startY - 20) + 'px';
    
    document.body.appendChild(rocket);
    
    // Create a particle smoke interval
    const smokeInterval = setInterval(() => {
        const smoke = document.createElement('div');
        smoke.className = 'w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600 absolute backdrop-blur-md';
        smoke.style.zIndex = '999998';
        smoke.style.pointerEvents = 'none';
        
        // Get current rocket position
        const rect = rocket.getBoundingClientRect();
        smoke.style.left = (rect.left + Math.random() * 20) + 'px';
        smoke.style.top = (rect.top + 30) + 'px';
        
        document.body.appendChild(smoke);
        
        smoke.animate([
            { transform: 'scale(1)', opacity: 0.8 },
            { transform: `translate(${(Math.random() - 0.5) * 40}px, 60px) scale(3)`, opacity: 0 }
        ], {
            duration: 800,
            easing: 'ease-out',
            fill: 'forwards'
        }).onfinish = () => smoke.remove();
        
    }, 40);

    // Rocket Animation
    rocket.animate([
        { transform: 'translateY(0) rotate(-45deg)', offset: 0 },
        { transform: 'translateY(10px) rotate(-45deg)', offset: 0.1 }, // windup
        { transform: `translateY(-${window.innerHeight + 100}px) rotate(-45deg)`, offset: 1 } // shoot up
    ], {
        duration: 1000,
        easing: 'cubic-bezier(.5,-0.5,.2,1)',
        fill: 'forwards'
    }).onfinish = () => {
        clearInterval(smokeInterval);
        rocket.remove();
        if (actionCallback) actionCallback();
    };
};

/**
 * Initializes global telemetry widgets in footers across all pages
 */
function initTelemetry() {
    // 1. Profile Views Counter
    const viewsEl = document.getElementById('profile-views');
    if (viewsEl) {
        let currentViews = parseInt(localStorage.getItem('yr_portfolio_views') || '1420', 10);
        // Increment once per session
        if (!sessionStorage.getItem('yr_view_counted')) {
            currentViews += 1;
            localStorage.setItem('yr_portfolio_views', currentViews.toString());
            sessionStorage.setItem('yr_view_counted', 'true');
        }
        
        // Count up animation
        let count = Math.max(0, currentViews - 30);
        const interval = setInterval(() => {
            count += 1;
            viewsEl.innerText = count.toLocaleString();
            if (count >= currentViews) {
                clearInterval(interval);
                viewsEl.innerText = currentViews.toLocaleString();
            }
        }, 30);
    }

    // 2. DOM Load Speed
    const loadTimeEl = document.getElementById('page-load-time');
    if (loadTimeEl) {
        const calculateLoadTime = () => {
            let loadTime = 0;
            const entries = performance.getEntriesByType("navigation");
            if (entries.length > 0 && entries[0].domContentLoadedEventEnd > 0) {
                loadTime = Math.round(entries[0].domContentLoadedEventEnd);
            } else if (window.performance && window.performance.timing) {
                loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
            }
            if (loadTime > 0) {
                loadTimeEl.innerText = `${loadTime}ms`;
            } else {
                loadTimeEl.innerText = `${Math.floor(Math.random() * 60 + 75)}ms`;
            }
        };

        if (document.readyState === 'complete') {
            calculateLoadTime();
        } else {
            window.addEventListener('load', () => setTimeout(calculateLoadTime, 100));
        }
    }
}
