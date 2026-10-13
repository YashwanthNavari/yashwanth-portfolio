/**
 * Navari AI — Portfolio Intelligence Assistant Widget
 * Complete Frontend-Only Architecture
 */
window.NavariAI = (() => {
  let isInitialized = false;
  let isOpen = false;
  let isMinimized = false;
  let isGenerating = false;

  // DOM element references
  let fabEl = null;
  let windowEl = null;
  let bodyEl = null;
  let inputEl = null;
  let sendBtnEl = null;

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
    return new Promise((resolve, reject) => {
      // Check if already in DOM
      if (document.querySelector(`script[src*="${src}"]`)) {
        return resolve();
      }
      const s = document.createElement('script');
      s.src = src;
      s.async = false;
      s.onload = () => resolve();
      s.onerror = () => {
        console.warn(`[Navari AI] Failed loading script: ${src}, attempting fallback path`);
        resolve(); // Continue gracefully
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

  // Build the complete Widget HTML structure
  const buildWidgetDOM = () => {
    // Remove old FAB or chat if they exist from previous implementation
    const oldFab = document.getElementById('ai-fab');
    if (oldFab) oldFab.remove();
    const oldChat = document.getElementById('ai-chat');
    if (oldChat) oldChat.remove();

    // 1. Floating Action Button
    fabEl = document.createElement('button');
    fabEl.id = 'navari-ai-fab';
    fabEl.setAttribute('aria-label', 'Open Navari AI Portfolio Assistant');
    fabEl.setAttribute('title', 'Navari AI — Portfolio Assistant');
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
    windowEl.setAttribute('aria-label', 'Navari AI Assistant Dialog');

    windowEl.innerHTML = `
      <!-- Header -->
      <header class="ai-chat-header">
        <div class="ai-header-brand">
          <div class="ai-avatar-mini" aria-hidden="true">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div class="ai-title-wrap">
            <span class="ai-title">Navari AI</span>
            <span class="ai-subtitle">Your Personal Portfolio Assistant</span>
          </div>
        </div>
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
            placeholder="Ask about projects, skills, patent, or background..." 
            autocomplete="off"
            aria-label="Ask Navari AI"
          />
          <button type="submit" id="ai-send-btn" class="ai-send-btn" aria-label="Send Message" title="Send">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </button>
        </form>
        <div class="ai-footer-note">Powered by Navari AI · Verified Portfolio Intelligence</div>
      </footer>
    `;

    document.body.appendChild(fabEl);
    document.body.appendChild(windowEl);

    // Save refs
    bodyEl = document.getElementById('ai-messages-body');
    inputEl = document.getElementById('ai-user-input');
    sendBtnEl = document.getElementById('ai-send-btn');
  };

  // Render the distinctive Welcome Screen (Luminous AI Orb + 4 Quick Action Cards)
  const renderWelcomeScreen = () => {
    bodyEl.innerHTML = '';
    const welcome = document.createElement('div');
    welcome.className = 'ai-welcome-screen';
    welcome.id = 'ai-welcome-state';

    welcome.innerHTML = `
      <!-- Luminous Blue-Violet AI Orb -->
      <div class="ai-orb-wrapper" aria-hidden="true">
        <div class="ai-orb-glow"></div>
        <div class="ai-luminous-orb"></div>
      </div>

      <!-- Personalized Greeting -->
      <h2 class="ai-welcome-title">Meet Yashwanth.<br>Explore the work behind the code.</h2>
      <p class="ai-welcome-subtitle">
        Discover his technical background, projects, experience, research, and achievements.
      </p>

      <!-- 4 Interactive Quick Action Cards -->
      <div class="ai-quick-actions-grid">
        <button type="button" class="ai-quick-card" data-query="Tell me about Navari Yashwanth Reddy">
          <div class="ai-quick-icon">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          <span class="ai-quick-title">About Yashwanth</span>
          <span class="ai-quick-desc">Background & identity</span>
        </button>

        <button type="button" class="ai-quick-card" data-query="Explore all projects">
          <div class="ai-quick-icon">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
          </div>
          <span class="ai-quick-title">Explore Projects</span>
          <span class="ai-quick-desc">AI, CV & full-stack</span>
        </button>

        <button type="button" class="ai-quick-card" data-query="What are his technical skills and internship experience?">
          <div class="ai-quick-icon">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
            </svg>
          </div>
          <span class="ai-quick-title">Skills & Experience</span>
          <span class="ai-quick-desc">Tech stack & Innovexis</span>
        </button>

        <button type="button" class="ai-quick-card" data-query="Tell me about his IoT patent and achievements">
          <div class="ai-quick-icon">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
            </svg>
          </div>
          <span class="ai-quick-title">Research & Patent</span>
          <span class="ai-quick-desc">Govt. Design Patent</span>
        </button>
      </div>
    `;

    // Attach click listeners to cards
    welcome.querySelectorAll('.ai-quick-card').forEach((card) => {
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
    renderWelcomeScreen();
  };

  // Append user message safely (textContent only!)
  const appendUserMessage = (text) => {
    // Remove welcome state if present
    const welcome = document.getElementById('ai-welcome-state');
    if (welcome) welcome.remove();

    const msgRow = document.createElement('div');
    msgRow.className = 'ai-message ai-user';

    const bubble = document.createElement('div');
    bubble.className = 'ai-bubble';
    // STRICT XSS DEFENSE: textContent ONLY for raw user queries
    bubble.textContent = text;

    msgRow.appendChild(bubble);
    bodyEl.appendChild(msgRow);
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

    // Use SafeRender to build DOM structure
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
            title: 'Navari AI Initialization Notice',
            paragraphs: ['The local knowledge base is synchronizing. Please try your question again in a moment.']
          };
        }

        removeTypingIndicator();
        appendAssistantResponse(responseData);
      } catch (err) {
        console.error('[Navari AI] Error processing query:', err);
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
    }, 450); // Natural micro-delay for realistic pacing
  };

  // Bind all interactive events
  const attachEvents = () => {
    // Open on FAB click
    fabEl.addEventListener('click', () => toggleChat());

    // Close button
    const closeBtn = document.getElementById('ai-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => toggleChat(false));

    // Minimize button
    const minBtn = document.getElementById('ai-minimize-btn');
    if (minBtn) minBtn.addEventListener('click', () => toggleMinimize());

    // Clear chat button
    const clearBtn = document.getElementById('ai-clear-btn');
    if (clearBtn) clearBtn.addEventListener('click', () => clearChat());

    // Form submission
    const form = document.getElementById('ai-input-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (inputEl) handleUserQuery(inputEl.value);
      });
    }

    // Keyboard ESC to close
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

    // Load styles and required scripts
    ensureStylesLoaded();
    await ensureDependencies();

    // Build DOM & setup state
    buildWidgetDOM();
    renderWelcomeScreen();
    attachEvents();

    console.log('[Navari AI] Portfolio Intelligence Assistant initialized successfully.');
  };

  return {
    init,
    open: () => toggleChat(true),
    close: () => toggleChat(false),
    query: (q) => handleUserQuery(q),
    clear: () => clearChat()
  };
})();
