(function () {
  "use strict";

  const CONTACT_EMAIL = "804ana@gmail.com";
  const FILE_LINK = /\.(pdf|docx?|xlsx?)$/i;

  const $ = id => document.getElementById(id);

  /* ---------- helpers ---------- */
  function escapeHtml(text) {
    const element = document.createElement("div");
    element.textContent = text == null ? "" : String(text);
    return element.innerHTML;
  }

  function safeUrl(url) {
    const value = url == null ? "" : String(url).trim();
    return /^\s*(javascript|data|vbscript):/i.test(value) ? "" : value;
  }

  // typeof is safe even if tools.js failed to load (no ReferenceError).
  function getTools() {
    return typeof TOOLS !== "undefined" && Array.isArray(TOOLS)
      ? TOOLS.filter(tool => tool && tool.name)
      : null;
  }

  function getResearch() {
    return typeof RESEARCH !== "undefined" && Array.isArray(RESEARCH)
      ? RESEARCH.filter(item => item && item.title)
      : null;
  }

  function actionLink(url, text, extraClass) {
    const href = safeUrl(url);
    if (!href) return "";
    const external = FILE_LINK.test(href) || /^https?:/i.test(href);
    const attrs = (external ? ' target="_blank" rel="noopener"' : "") + (/^https?:/i.test(href) ? "" : " data-check");
    return `<a class="btn btn-primary${extraClass ? " " + extraClass : ""}" href="${escapeHtml(href)}"${attrs}>${escapeHtml(text)} <span aria-hidden="true">${external ? "↗" : "→"}</span></a>`;
  }

  /* ---------- missing-file guard ----------
     If a linked page or PDF returns 404 on the live site, replace the
     button with a disabled "Coming soon" label instead of a dead link. */
  function checkLinks(root) {
    if (!root || typeof fetch !== "function") return;
    root.querySelectorAll("a[data-check]").forEach(link => {
      fetch(link.getAttribute("href"), { method: "HEAD" })
        .then(response => {
          if (response.status !== 404) return;
          console.warn("Missing file on site:", link.getAttribute("href"));
          const label = document.createElement("span");
          label.className = "btn btn-disabled";
          label.setAttribute("aria-disabled", "true");
          label.textContent = "Coming soon";
          link.replaceWith(label);
        })
        .catch(() => {}); // offline or opened as a local file: leave the link alone
    });
  }

  /* ---------- tools ---------- */
  function renderToolCard(tool) {
    const visual = tool.image
      ? `<img src="${escapeHtml(safeUrl(tool.image))}" alt="${escapeHtml(tool.name)}" loading="lazy">`
      : `<span aria-hidden="true">${escapeHtml(tool.icon || "🛠️")}</span>`;

    const specs = Array.isArray(tool.specs) && tool.specs.length
      ? `<ul class="tool-specs">${tool.specs.map(spec => {
          const separator = String(spec).indexOf(":");
          return separator > -1
            ? `<li><b>${escapeHtml(spec.slice(0, separator))}:</b>${escapeHtml(spec.slice(separator + 1))}</li>`
            : `<li>${escapeHtml(spec)}</li>`;
        }).join("")}</ul>`
      : "";

    const story = tool.useCase || tool.impact
      ? `<div class="tool-story">
          ${tool.useCase ? `<div><span class="story-label">Where it's used</span><p>${escapeHtml(tool.useCase)}</p></div>` : ""}
          ${tool.impact ? `<div><span class="story-label">Impact</span><p>${escapeHtml(tool.impact)}</p></div>` : ""}
        </div>`
      : "";

    return `
      <article class="card tool-card">
        <div class="tool-img">${visual}</div>
        <div class="tool-body">
          ${tool.category ? `<span class="tool-cat">${escapeHtml(tool.category)}</span>` : ""}
          <h3>${escapeHtml(tool.name)}</h3>
          <p>${escapeHtml(tool.description)}</p>
          ${story}
          ${specs}
          ${actionLink(tool.link, tool.linkText || "Open tool")}
        </div>
      </article>`;
  }

  function renderFilters(tools, category) {
    const filters = $("tool-filters");
    if (!filters) return;
    const categories = [...new Set(tools.map(tool => tool.category).filter(Boolean))];
    if (categories.length < 2) {
      filters.innerHTML = "";
      return;
    }
    filters.innerHTML = ["All", ...categories].map(item =>
      `<button class="filter-btn${item === category ? " active" : ""}" type="button" aria-pressed="${item === category}" data-category="${escapeHtml(item)}">${escapeHtml(item)}</button>`
    ).join("");
  }

  function renderTools(category = "All") {
    const grid = $("tools-grid");
    const empty = $("tools-empty");
    if (!grid) return;

    const tools = getTools();
    if (!tools) {
      grid.innerHTML = "";
      if (empty) {
        empty.hidden = false;
        empty.textContent = "The tools list could not be loaded. Please refresh the page or contact me directly.";
      }
      return;
    }

    const visible = category === "All" ? tools : tools.filter(tool => tool.category === category);
    grid.innerHTML = visible.map(renderToolCard).join("");
    if (empty) {
      empty.textContent = "No tools added yet.";
      empty.hidden = visible.length > 0;
    }
    renderFilters(tools, category);
    checkLinks(grid);
  }

  /* ---------- research & documentation ---------- */
  function renderResearchCard(item) {
    const tags = Array.isArray(item.tags) && item.tags.length
      ? `<div class="pill-list tags">${item.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join("")}</div>`
      : "";
    const hasLink = Boolean(safeUrl(item.link));
    const subject = encodeURIComponent("Request: " + item.title);
    const action = hasLink
      ? actionLink(item.link, item.linkText || "Open document")
      : `<a class="btn btn-outline" href="mailto:${CONTACT_EMAIL}?subject=${subject}">Request a copy <span aria-hidden="true">→</span></a>`;

    return `
      <article class="card research-card">
        <span class="tool-cat">${escapeHtml(item.type || "Document")}</span>
        <h3>${escapeHtml(item.title)}</h3>
        ${item.org ? `<p class="org">${escapeHtml(item.org)}</p>` : ""}
        <p class="research-desc">${escapeHtml(item.description)}</p>
        ${tags}
        ${action}
      </article>`;
  }

  function renderResearch() {
    const grid = $("research-grid");
    if (!grid) return;
    const items = getResearch();
    grid.innerHTML = items && items.length
      ? items.map(renderResearchCard).join("")
      : `<p class="empty">Documents could not be loaded. Please refresh the page or contact me directly.</p>`;
    checkLinks(grid);
  }

  /* ---------- page chrome ---------- */
  function setupYear() {
    const year = $("year");
    if (year) year.textContent = new Date().getFullYear();
  }

  function setupNav() {
    const toggle = document.querySelector(".nav-toggle");
    const links = document.querySelector(".nav-links");
    if (!toggle || !links) return;

    const setOpen = open => {
      links.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    };

    toggle.addEventListener("click", () => setOpen(!links.classList.contains("open")));
    links.addEventListener("click", event => {
      if (event.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && links.classList.contains("open")) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  function setupObservers() {
    const revealItems = document.querySelectorAll(".reveal");
    const sections = [...document.querySelectorAll("main section[id]")];
    const sectionLinks = [...document.querySelectorAll(".nav-links a")];

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach(item => item.classList.add("visible"));
      return;
    }

    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        sectionLinks.forEach(link => {
          const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("active", isCurrent);
          if (isCurrent) link.setAttribute("aria-current", "page");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    revealItems.forEach(item => revealObserver.observe(item));
    sections.forEach(section => sectionObserver.observe(section));
  }

  function setupFilters() {
    const filters = $("tool-filters");
    if (!filters) return;
    filters.addEventListener("click", event => {
      const button = event.target.closest("[data-category]");
      if (!button) return;
      const category = button.dataset.category;
      renderTools(category);
      // Re-rendering replaces the buttons, so restore keyboard focus.
      const active = filters.querySelector(`[data-category="${CSS.escape(category)}"]`);
      if (active) active.focus();
    });
  }

  /* ---------- start ---------- */
  function init() {
    setupYear();
    setupNav();
    renderTools();
    renderResearch();
    setupFilters();
    setupObservers();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
