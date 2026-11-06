const year = document.getElementById("year");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const revealItems = document.querySelectorAll(".reveal");
const sections = [...document.querySelectorAll("main section[id]")];
const sectionLinks = [...document.querySelectorAll(".nav-links a")];

year.textContent = new Date().getFullYear();

function escapeHtml(text) {
  const element = document.createElement("div");
  element.textContent = text == null ? "" : String(text);
  return element.innerHTML;
}

function renderToolCard(tool) {
  const visual = tool.image
    ? `<img src="${escapeHtml(tool.image)}" alt="${escapeHtml(tool.name)}" loading="lazy">`
    : escapeHtml(tool.icon || "🛠️");
  const specs = tool.specs && tool.specs.length
    ? `<ul class="tool-specs">${tool.specs.map(spec => {
        const separator = spec.indexOf(":");
        return separator > -1
          ? `<li><b>${escapeHtml(spec.slice(0, separator))}:</b>${escapeHtml(spec.slice(separator + 1))}</li>`
          : `<li>${escapeHtml(spec)}</li>`;
      }).join("")}</ul>`
    : "";
  const link = tool.link
    ? `<a class="btn btn-primary" href="${escapeHtml(tool.link)}">${escapeHtml(tool.linkText || "Open tool")} <span>↗</span></a>`
    : "";

  return `
    <article class="card tool-card">
      <div class="tool-img">${visual}</div>
      <div class="tool-body">
        ${tool.category ? `<span class="tool-cat">${escapeHtml(tool.category)}</span>` : ""}
        <h3>${escapeHtml(tool.name)}</h3>
        <p>${escapeHtml(tool.description)}</p>
        ${specs}
        ${link}
      </div>
    </article>`;
}

function renderTools(category = "All") {
  const grid = document.getElementById("tools-grid");
  const filters = document.getElementById("tool-filters");
  const empty = document.getElementById("tools-empty");
  const visibleTools = category === "All" ? TOOLS : TOOLS.filter(tool => tool.category === category);
  grid.innerHTML = visibleTools.map(renderToolCard).join("");
  empty.hidden = visibleTools.length > 0;
  const categories = [...new Set(TOOLS.map(tool => tool.category).filter(Boolean))];
  if (categories.length < 2) {
    filters.innerHTML = "";
    return;
  }
  filters.innerHTML = ["All", ...categories].map(item =>
    `<button class="filter-btn${item === category ? " active" : ""}" type="button" data-category="${escapeHtml(item)}">${escapeHtml(item)}</button>`
  ).join("");
}

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navLinks.addEventListener("click", event => {
  if (event.target.matches("a")) {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
  }
});

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
}, { threshold: 0.12 });

revealItems.forEach(item => revealObserver.observe(item));
sections.forEach(section => sectionObserver.observe(section));

document.getElementById("tool-filters").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  renderTools(button.dataset.category);
});

renderTools();
