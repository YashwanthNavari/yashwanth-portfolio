/**
 * Yashwanth AI — Portfolio Intelligence Assistant Widget
 * Complete Frontend-Only Architecture
 * Branding: YASHWANTH AI / YOUR PERSONAL AI ASSISTANT
 * Typography: Oxanium Display + Manrope Body
 */
window.NavariAI = (() => {
  let isInitialized = false;
  let isOpen = false;
  let isMinimized = false;
  let isGenerating = false;
  let currentView = 'welcome'; // 'welcome' | 'conversation'

  // DOM element references
  let fabEl = null;
  let windowEl = null;
  let headerLeftEl = null;
  let bodyEl = null;
  let inputEl = null;
  let sendBtnEl = null;

  // In-memory conversation messages container
  let messageHistoryDOM = [];

  // Required dependency files relative to root
  const SCRIPT_DEPS = [
    'js/assistant/data/profile.js',
    'js/assistant/data/skills.js',
    'js/assistant/data/experience.js',
    'js/assistant/data/projects.js',
    'js/assistant/data/research.js',
    'js/assistant/data/certifications.js',
    'js/assistant/data/contact.js',
    'js/assistant/services/conversation-context.js',
    'js/assistant/services/knowledge-retrieval.js',
    'js/assistant/services/intent-detection.js',
    'js/assistant/services/response-builder.js',
    'js/assistant/utils/safe-rendering.js'
  ];

  // Helper to load stylesheet dynamically if not present
  const ensureStylesLoaded = () => {
    if (!document.querySelector('link[href*="assistant.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'css/assistant.css';
      document.head.appendChild(link);
    }
  };

  // Helper to load a script with Promise
  const loadScript = (src) => {
    return new Promise((resolve) => {
      if (document.querySelector(`script[src*="${src}"]`)) {
        return resolve();
      }
      const s = document.createElement('script');
      s.src = src;
      s.async = false;
      s.onload = () => resolve();
      s.onerror = () => {
        console.warn(`[Yashwanth AI] Failed loading script: ${src}`);
        resolve();
      };
      document.head.appendChild(s);
    });
  };

  // Ensure all dependencies are loaded in order
  const ensureDependencies = async () => {
    for (const src of SCRIPT_DEPS) {
      await loadScript(src);
    }
  };

  // Update header based on view state
  const updateHeaderView = () => {
    if (!headerLeftEl) return;
    headerLeftEl.innerHTML = '';

    if (currentView === 'conversation') {
      const backBtn = document.createElement('button');
      backBtn.type = 'button';
      backBtn.className = 'ai-back-btn';
      backBtn.innerHTML = `
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/>
        </svg>
        <span>Discover</span>
      `;
      backBtn.setAttribute('title', 'Return to Discover Screen');
      backBtn.addEventListener('click', () => switchView('welcome'));
      headerLeftEl.appendChild(backBtn);
    }

    const brandWrap = document.createElement('div');
    brandWrap.className = 'ai-header-brand flex items-center gap-2.5';
    brandWrap.innerHTML = `
      <div class="ai-avatar-mini" aria-hidden="true">
        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
      </div>
      <div class="ai-title-wrap">
        <span class="ai-title">YASHWANTH AI</span>
        <span class="ai-subtitle">YOUR PERSONAL AI ASSISTANT</span>
      </div>
    `;
    headerLeftEl.appendChild(brandWrap);
  };

  // Switch between Welcome and Conversation views
  const switchView = (targetView) => {
    currentView = targetView;
    updateHeaderView();

    bodyEl.innerHTML = '';
    if (currentView === 'welcome') {
      renderWelcomeScreen();
    } else {
      // Re-render conversation history
      messageHistoryDOM.forEach((node) => bodyEl.appendChild(node));
      scrollToBottom();
    }
  };

  // Build the complete Widget HTML structure
  const buildWidgetDOM = () => {
    const oldFab = document.getElementById('ai-fab');
    if (oldFab) oldFab.remove();
    const oldChat = document.getElementById('ai-chat');
    if (oldChat) oldChat.remove();
    const existingFab = document.getElementById('navari-ai-fab');
    if (existingFab) existingFab.remove();
    const existingWin = document.getElementById('navari-ai-window');
    if (existingWin) existingWin.remove();

    // 1. Floating Action Button
    fabEl = document.createElement('button');
    fabEl.id = 'navari-ai-fab';
    fabEl.setAttribute('aria-label', 'Open Yashwanth AI Portfolio Assistant');
    fabEl.setAttribute('title', 'Yashwanth AI — Personal AI Assistant');
    fabEl.innerHTML = `
      <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
      <span class="navari-fab-status" aria-hidden="true"></span>
    `;

    // 2. Chat Window Container
    windowEl = document.createElement('div');
    windowEl.id = 'navari-ai-window';
    windowEl.setAttribute('role', 'dialog');
    windowEl.setAttribute('aria-label', 'Yashwanth AI Assistant Dialog');

    windowEl.innerHTML = `
      <!-- Header -->
      <header class="ai-chat-header">
        <div class="ai-header-left" id="ai-header-left"></div>
        <div class="ai-header-actions">
          <button id="ai-clear-btn" class="ai-header-btn" title="Clear Conversation" aria-label="Clear Conversation">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
          <button id="ai-minimize-btn" class="ai-header-btn" title="Minimize Window" aria-label="Minimize Window">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
            </svg>
          </button>
          <button id="ai-close-btn" class="ai-header-btn" title="Close Assistant" aria-label="Close Assistant">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </header>

      <!-- Messages / Welcome Area -->
      <div class="ai-chat-body" id="ai-messages-body"></div>

      <!-- Footer / Input Form -->
      <footer class="ai-chat-footer">
        <form class="ai-input-form" id="ai-input-form">
          <input 
            type="text" 
            id="ai-user-input" 
            class="ai-input" 
            placeholder="Ask me about my projects, skills, or background..." 
            autocomplete="off"
            aria-label="Ask Yashwanth AI"
          />
          <button type="submit" id="ai-send-btn" class="ai-send-btn" aria-label="Send Message" title="Send">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </button>
        </form>
        <div class="ai-footer-note">Powered by Yashwanth AI · Verified Portfolio Intelligence</div>
      </footer>
    `;

    document.body.appendChild(fabEl);
    document.body.appendChild(windowEl);

    // Save refs
    headerLeftEl = document.getElementById('ai-header-left');
    bodyEl = document.getElementById('ai-messages-body');
    inputEl = document.getElementById('ai-user-input');
    sendBtnEl = document.getElementById('ai-send-btn');

    updateHeaderView();
  };

  // Render the distinctive Welcome Screen (AI Visual + 6 Feature Discover Cards)
  const renderWelcomeScreen = () => {
    bodyEl.innerHTML = '';
    const welcome = document.createElement('div');
    welcome.className = 'ai-welcome-screen';
    welcome.id = 'ai-welcome-state';

    welcome.innerHTML = `
      <!-- Futuristic AI Character Visual -->
      <div class="ai-hero-visual" aria-hidden="true">
        <div class="ai-visual-outer-ring"></div>
        <div class="ai-visual-glow"></div>
        <div class="ai-visual-core">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
        </div>
      </div>

      <!-- Display Typography Headings -->
      <h2 class="ai-welcome-heading">MEET YASHWANTH</h2>
      <div class="ai-welcome-subheading">YOUR AI GUIDE TO MY WORK</div>
      <p class="ai-welcome-desc">
        Explore my technical background, projects, engineering experience, and achievements.
      </p>

      <!-- 6 Interactive Feature Cards (Mobile-App Reference Grid) -->
      <div class="ai-features-grid">
        <!-- 01 ABOUT ME -->
        <button type="button" class="ai-feature-card" data-query="Tell me about Navari Yashwanth Reddy">
          <div class="ai-feature-card-header">
            <span class="ai-feature-index">01</span>
            <span class="ai-feature-icon">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </span>
          </div>
          <span class="ai-feature-title">ABOUT ME</span>
          <span class="ai-feature-desc">Background & journey</span>
        </button>

        <!-- 02 PROJECTS -->
        <button type="button" class="ai-feature-card" data-query="Explore all projects">
          <div class="ai-feature-card-header">
            <span class="ai-feature-index">02</span>
            <span class="ai-feature-icon">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
            </span>
          </div>
          <span class="ai-feature-title">PROJECTS</span>
          <span class="ai-feature-desc">AI, CV & systems</span>
        </button>

        <!-- 03 EXPERTISE -->
        <button type="button" class="ai-feature-card" data-query="What are your technical skills and expertise?">
          <div class="ai-feature-card-header">
            <span class="ai-feature-index">03</span>
            <span class="ai-feature-icon">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
              </svg>
            </span>
          </div>
          <span class="ai-feature-title">EXPERTISE</span>
          <span class="ai-feature-desc">Skills & Innovexis</span>
        </button>

        <!-- 04 RESEARCH & IP -->
        <button type="button" class="ai-feature-card" data-query="Tell me about your research and IoT design patent">
          <div class="ai-feature-card-header">
            <span class="ai-feature-index">04</span>
            <span class="ai-feature-icon">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
              </svg>
            </span>
          </div>
          <span class="ai-feature-title">RESEARCH & IP</span>
          <span class="ai-feature-desc">Patent 470097-001</span>
        </button>

        <!-- 05 CERTIFICATIONS -->
        <button type="button" class="ai-feature-card" data-query="Tell me about your certifications and hackathons">
          <div class="ai-feature-card-header">
            <span class="ai-feature-index">05</span>
            <span class="ai-feature-icon">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </span>
          </div>
          <span class="ai-feature-title">CERTIFICATES</span>
          <span class="ai-feature-desc">AWS & Cloudinary</span>
        </button>

        <!-- 06 CONTACT -->
        <button type="button" class="ai-feature-card" data-query="How can I contact Yashwanth?">
          <div class="ai-feature-card-header">
            <span class="ai-feature-index">06</span>
            <span class="ai-feature-icon">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </span>
          </div>
          <span class="ai-feature-title">CONTACT</span>
          <span class="ai-feature-desc">Get in touch directly</span>
        </button>
      </div>
    `;

    // Attach click listeners to feature cards
    welcome.querySelectorAll('.ai-feature-card').forEach((card) => {
      card.addEventListener('click', () => {
        const query = card.getAttribute('data-query');
        if (query) handleUserQuery(query);
      });
    });

    bodyEl.appendChild(welcome);
  };

  // Toggle Window Visibility
  const toggleChat = (show) => {
    isOpen = show !== undefined ? show : !isOpen;
    if (isOpen) {
      windowEl.classList.add('ai-open');
      if (isMinimized) {
        windowEl.classList.remove('ai-minimized');
        isMinimized = false;
      }
      setTimeout(() => inputEl && inputEl.focus(), 150);
    } else {
      windowEl.classList.remove('ai-open');
    }
  };

  // Toggle Minimize
  const toggleMinimize = () => {
    isMinimized = !isMinimized;
    if (isMinimized) {
      windowEl.classList.add('ai-minimized');
    } else {
      windowEl.classList.remove('ai-minimized');
      setTimeout(() => inputEl && inputEl.focus(), 100);
    }
  };

  // Clear Conversation & Reset State
  const clearChat = () => {
    if (window.NavariAI_Context) {
      window.NavariAI_Context.clear();
    }
    messageHistoryDOM = [];
    switchView('welcome');
  };

  // Append user message safely (textContent only!)
  const appendUserMessage = (text) => {
    if (currentView !== 'conversation') {
      currentView = 'conversation';
      updateHeaderView();
      bodyEl.innerHTML = '';
      messageHistoryDOM.forEach((node) => bodyEl.appendChild(node));
    }

    const msgRow = document.createElement('div');
    msgRow.className = 'ai-message ai-user';

    const bubble = document.createElement('div');
    bubble.className = 'ai-bubble';
    bubble.textContent = text;

    msgRow.appendChild(bubble);
    bodyEl.appendChild(msgRow);
    messageHistoryDOM.push(msgRow);
    scrollToBottom();
  };

  // Show typing indicator
  const showTypingIndicator = () => {
    const indicator = document.createElement('div');
    indicator.id = 'ai-typing-indicator';
    indicator.className = 'ai-message ai-assistant';
    indicator.innerHTML = `
      <div class="ai-avatar-msg" aria-hidden="true">
        <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
      </div>
      <div class="ai-typing-indicator">
        <div class="ai-typing-dot"></div>
        <div class="ai-typing-dot"></div>
        <div class="ai-typing-dot"></div>
      </div>
    `;
    bodyEl.appendChild(indicator);
    scrollToBottom();
  };

  // Remove typing indicator
  const removeTypingIndicator = () => {
    const indicator = document.getElementById('ai-typing-indicator');
    if (indicator) indicator.remove();
  };

  // Scroll message body to bottom
  const scrollToBottom = () => {
    if (bodyEl) {
      bodyEl.scrollTop = bodyEl.scrollHeight;
    }
  };

  // Append structured assistant response safely
  const appendAssistantResponse = (responseData) => {
    const msgRow = document.createElement('div');
    msgRow.className = 'ai-message ai-assistant';

    const avatar = document.createElement('div');
    avatar.className = 'ai-avatar-msg';
    avatar.setAttribute('aria-hidden', 'true');
    avatar.innerHTML = `
      <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    `;

    const bubble = document.createElement('div');
    bubble.className = 'ai-bubble';

    if (window.NavariAI_SafeRender) {
      const contentDOM = window.NavariAI_SafeRender.renderResponseDOM(responseData, {
        onChipClick: (chipText) => handleUserQuery(chipText),
        onProjectAsk: (project) => handleUserQuery(`Explain ${project.title} project in detail`)
      });
      bubble.appendChild(contentDOM);
    } else {
      bubble.textContent = responseData.title || 'Response generated.';
    }

    msgRow.appendChild(avatar);
    msgRow.appendChild(bubble);
    bodyEl.appendChild(msgRow);
    messageHistoryDOM.push(msgRow);
    scrollToBottom();
  };

  // Handle Query Execution
  const handleUserQuery = async (queryText) => {
    if (!queryText || !queryText.trim() || isGenerating) return;
    const cleanText = queryText.trim();

    // 1. Append user message
    appendUserMessage(cleanText);
    if (inputEl) inputEl.value = '';

    // 2. Set generating state & typing indicator
    isGenerating = true;
    if (sendBtnEl) sendBtnEl.disabled = true;
    showTypingIndicator();

    // 3. Process via Intent & Response Builder
    setTimeout(() => {
      try {
        let responseData = null;

        if (window.NavariAI_Intent && window.NavariAI_ResponseBuilder) {
          const intentResult = window.NavariAI_Intent.detect(cleanText);
          responseData = window.NavariAI_ResponseBuilder.build(intentResult);
        } else {
          responseData = {
            title: 'Yashwanth AI Initialization Notice',
            paragraphs: ['The local knowledge base is synchronizing. Please try your question again in a moment.']
          };
        }

        removeTypingIndicator();
        appendAssistantResponse(responseData);
      } catch (err) {
        console.error('[Yashwanth AI] Error processing query:', err);
        removeTypingIndicator();
        appendAssistantResponse({
          title: 'Response Processing Notice',
          paragraphs: ['An error occurred while analyzing that question from the portfolio knowledge base. Please try asking in a different way or check out the interactive sections on the portfolio.'],
          followUps: ['Tell me everything about Yashwanth', 'Explore Projects', 'Contact Yashwanth']
        });
      } finally {
        isGenerating = false;
        if (sendBtnEl) sendBtnEl.disabled = false;
        if (inputEl) inputEl.focus();
      }
    }, 450);
  };

  // Bind all interactive events
  const attachEvents = () => {
    fabEl.addEventListener('click', () => toggleChat());

    const closeBtn = document.getElementById('ai-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => toggleChat(false));

    const minBtn = document.getElementById('ai-minimize-btn');
    if (minBtn) minBtn.addEventListener('click', () => toggleMinimize());

    const clearBtn = document.getElementById('ai-clear-btn');
    if (clearBtn) clearBtn.addEventListener('click', () => clearChat());

    const form = document.getElementById('ai-input-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (inputEl) handleUserQuery(inputEl.value);
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        toggleChat(false);
      }
    });
  };

  // Public Initialization Method
  const init = async () => {
    if (isInitialized) return;
    isInitialized = true;

    ensureStylesLoaded();
    await ensureDependencies();

    buildWidgetDOM();
    switchView('welcome');
    attachEvents();

    console.log('[Yashwanth AI] Portfolio Assistant initialized successfully.');
  };

  return {
    init,
    open: () => toggleChat(true),
    close: () => toggleChat(false),
    query: (q) => handleUserQuery(q),
    clear: () => clearChat(),
    showDiscover: () => switchView('welcome')
  };
})();
