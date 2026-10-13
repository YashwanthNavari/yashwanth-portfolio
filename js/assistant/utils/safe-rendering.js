/**
 * Navari AI — Safe Rendering Utility
 * Ensures safe, XSS-free DOM generation for markdown, cards, and chips.
 */
window.NavariAI_SafeRender = (() => {
  // Escape raw text for HTML safety
  const escapeHTML = (str) => {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  // Safe URL sanitizer
  const sanitizeURL = (url) => {
    if (!url) return '#';
    const trimmed = String(url).trim();
    // Allow relative paths (.html, #), mailto, tel, and safe http/https
    if (/^(https?:\/\/|mailto:|tel:|\/|\.\.?\/|[a-zA-Z0-9_\-\/]+\.html)/i.test(trimmed)) {
      // Disallow javascript: and data:
      if (/^(javascript:|data:)/i.test(trimmed)) {
        return '#';
      }
      return trimmed;
    }
    return '#';
  };

  // Format safe inline markdown (bold, italic, inline code, links)
  const formatInline = (text) => {
    if (!text) return '';
    let safe = escapeHTML(text);

    // Replace bold **text**
    safe = safe.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-slate-900">$1</strong>');

    // Replace italic *text*
    safe = safe.replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>');

    // Replace inline code `text`
    safe = safe.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-100 text-blue-700 text-xs font-mono">$1</code>');

    // Replace links [label](url)
    safe = safe.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label, url) => {
      const cleanUrl = sanitizeURL(url);
      const isExternal = cleanUrl.startsWith('http');
      const targetAttr = isExternal ? 'target="_blank" rel="noopener noreferrer"' : '';
      return `<a href="${cleanUrl}" ${targetAttr} class="text-blue-600 hover:text-blue-800 underline font-medium inline-flex items-center gap-0.5">${label}${isExternal ? ' ↗' : ''}</a>`;
    });

    return safe;
  };

  // Build a single interactive project card DOM element
  const createProjectCard = (project, onAskClick) => {
    const card = document.createElement('div');
    card.className = 'ai-project-card p-3.5 my-2.5 rounded-xl border border-slate-200 bg-white/95 shadow-sm hover:shadow-md transition-all duration-200 text-left';

    // Header: title + category badge
    const header = document.createElement('div');
    header.className = 'flex items-start justify-between gap-2 mb-1.5';

    const titleEl = document.createElement('h4');
    titleEl.className = 'font-bold text-slate-900 text-sm leading-snug';
    titleEl.textContent = project.title;

    const catBadge = document.createElement('span');
    catBadge.className = 'inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wide rounded-full bg-blue-50 text-blue-700 border border-blue-200/60 shrink-0';
    catBadge.textContent = project.category || 'AI Project';

    header.appendChild(titleEl);
    header.appendChild(catBadge);
    card.appendChild(header);

    // Description
    if (project.description) {
      const descEl = document.createElement('p');
      descEl.className = 'text-xs text-slate-600 mb-2.5 line-clamp-3 leading-relaxed';
      descEl.textContent = project.description;
      card.appendChild(descEl);
    }

    // Technology pills
    if (project.technologies && project.technologies.length > 0) {
      const techList = document.createElement('div');
      techList.className = 'flex flex-wrap gap-1 mb-3';
      project.technologies.slice(0, 5).forEach((t) => {
        const pill = document.createElement('span');
        pill.className = 'px-1.5 py-0.5 text-[10px] rounded bg-slate-100 text-slate-700 font-medium';
        pill.textContent = t;
        techList.appendChild(pill);
      });
      card.appendChild(techList);
    }

    // Actions bar
    const actions = document.createElement('div');
    actions.className = 'flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100';

    if (project.liveUrl) {
      const liveBtn = document.createElement('a');
      liveBtn.href = sanitizeURL(project.liveUrl);
      liveBtn.target = '_blank';
      liveBtn.rel = 'noopener noreferrer';
      liveBtn.className = 'ai-card-btn inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-xs';
      liveBtn.innerHTML = '<span>Live Demo</span> <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>';
      actions.appendChild(liveBtn);
    }

    if (project.githubUrl) {
      const repoBtn = document.createElement('a');
      repoBtn.href = sanitizeURL(project.githubUrl);
      repoBtn.target = '_blank';
      repoBtn.rel = 'noopener noreferrer';
      repoBtn.className = 'ai-card-btn inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors';
      repoBtn.innerHTML = '<span>Code</span> <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>';
      actions.appendChild(repoBtn);
    }

    if (onAskClick) {
      const askBtn = document.createElement('button');
      askBtn.type = 'button';
      askBtn.className = 'ai-card-btn inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg text-blue-700 bg-blue-50/80 hover:bg-blue-100 transition-colors ml-auto';
      askBtn.textContent = 'Explain Project →';
      askBtn.addEventListener('click', () => onAskClick(project));
      actions.appendChild(askBtn);
    }

    card.appendChild(actions);
    return card;
  };

  // Build suggestion chips container
  const createChips = (chips, onChipClick) => {
    if (!chips || chips.length === 0) return null;
    const container = document.createElement('div');
    container.className = 'ai-chips-wrap flex flex-wrap gap-1.5 pt-2 mt-1';

    chips.forEach((label) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'ai-chip px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100/90 text-slate-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border border-slate-200/80 transition-all duration-150 text-left';
      chip.textContent = label;
      chip.addEventListener('click', () => {
        if (onChipClick) onChipClick(label);
      });
      container.appendChild(chip);
    });

    return container;
  };

  // Render assistant structured response safely into DOM
  const renderResponseDOM = (data, callbacks = {}) => {
    const { onChipClick, onProjectAsk } = callbacks;
    const wrapper = document.createElement('div');
    wrapper.className = 'ai-response-content space-y-2.5 text-xs text-slate-700 leading-relaxed';

    // Title / Heading
    if (data.title) {
      const titleEl = document.createElement('h3');
      titleEl.className = 'font-bold text-slate-900 text-sm pb-1 border-b border-slate-100 flex items-center gap-1.5';
      titleEl.innerHTML = `<span class="w-1.5 h-3.5 rounded-full bg-blue-600 inline-block"></span> ${formatInline(data.title)}`;
      wrapper.appendChild(titleEl);
    }

    // Paragraphs
    if (Array.isArray(data.paragraphs)) {
      data.paragraphs.forEach((p) => {
        if (!p) return;
        const pEl = document.createElement('p');
        pEl.innerHTML = formatInline(p);
        wrapper.appendChild(pEl);
      });
    }

    // Sections (heading + bullets)
    if (Array.isArray(data.sections)) {
      data.sections.forEach((sec) => {
        const secDiv = document.createElement('div');
        secDiv.className = 'ai-section pt-1.5';

        if (sec.heading) {
          const hEl = document.createElement('h4');
          hEl.className = 'font-semibold text-slate-900 text-xs mb-1 text-slate-800';
          hEl.innerHTML = formatInline(sec.heading);
          secDiv.appendChild(hEl);
        }

        if (Array.isArray(sec.bullets) && sec.bullets.length > 0) {
          const ul = document.createElement('ul');
          ul.className = 'list-disc list-outside pl-4 space-y-1 text-slate-600 marker:text-blue-500';
          sec.bullets.forEach((b) => {
            const li = document.createElement('li');
            li.innerHTML = formatInline(b);
            ul.appendChild(li);
          });
          secDiv.appendChild(ul);
        }

        wrapper.appendChild(secDiv);
      });
    }

    // Tags
    if (Array.isArray(data.tags) && data.tags.length > 0) {
      const tagWrap = document.createElement('div');
      tagWrap.className = 'flex flex-wrap gap-1 pt-1.5';
      data.tags.forEach((tag) => {
        const t = document.createElement('span');
        t.className = 'px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-medium text-[11px] border border-blue-100';
        t.textContent = tag;
        tagWrap.appendChild(t);
      });
      wrapper.appendChild(tagWrap);
    }

    // Project Cards
    if (Array.isArray(data.projectCards) && data.projectCards.length > 0) {
      const cardsWrap = document.createElement('div');
      cardsWrap.className = 'ai-cards-container space-y-2 pt-1';
      data.projectCards.forEach((proj) => {
        const card = createProjectCard(proj, onProjectAsk);
        cardsWrap.appendChild(card);
      });
      wrapper.appendChild(cardsWrap);
    }

    // Verified Links
    if (Array.isArray(data.links) && data.links.length > 0) {
      const linksWrap = document.createElement('div');
      linksWrap.className = 'flex flex-wrap gap-2 pt-2 border-t border-slate-100';
      data.links.forEach((link) => {
        const a = document.createElement('a');
        a.href = sanitizeURL(link.url);
        const isExt = link.url.startsWith('http');
        if (isExt) {
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
        }
        a.className = 'inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors border border-blue-200/80';
        a.innerHTML = `<span>${escapeHTML(link.label)}</span> ${isExt ? '↗' : '→'}`;
        linksWrap.appendChild(a);
      });
      wrapper.appendChild(linksWrap);
    }

    // Follow-up suggestion chips
    if (Array.isArray(data.followUps) && data.followUps.length > 0) {
      const chipsEl = createChips(data.followUps, onChipClick);
      if (chipsEl) {
        wrapper.appendChild(chipsEl);
      }
    }

    return wrapper;
  };

  return {
    escapeHTML,
    sanitizeURL,
    formatInline,
    createProjectCard,
    createChips,
    renderResponseDOM
  };
})();
