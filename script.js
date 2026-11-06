// Renders the tool cards from tools.js. You normally don't need to edit this file.

document.getElementById("year").textContent = new Date().getFullYear();

const grid = document.getElementById("tools-grid");
const filters = document.getElementById("tool-filters");
const emptyMsg = document.getElementById("tools-empty");

function esc(text) {
  const d = document.createElement("div");
  d.textContent = text == null ? "" : String(text);
  return d.innerHTML;
}

function toolCard(t) {
  const visual = t.image
    ? `<img src="${esc(t.image)}" alt="${esc(t.name)}" loading="lazy">`
    : esc(t.icon || "🛠️");

  const specs = (t.specs && t.specs.length)
    ? `<ul class="tool-specs">${t.specs.map(s => {
        const i = s.indexOf(":");
        return i > -1
          ? `<li><b>${esc(s.slice(0, i))}:</b>${esc(s.slice(i + 1))}</li>`
          : `<li>${esc(s)}</li>`;
      }).join("")}</ul>`
    : "";

  const link = t.link
    ? `<a class="btn btn-primary btn-small" href="${esc(t.link)}" target="_blank" rel="noopener">${esc(t.linkText || "Open")}</a>`
    : "";

  return `
    <article class="card tool-card" data-cat="${esc(t.category || "")}">
      <div class="tool-img">${visual}</div>
      <div class="tool-body">
        ${t.category ? `<span class="tool-cat">${esc(t.category)}</span>` : ""}
        <h3>${esc(t.name)}</h3>
        <p>${esc(t.description)}</p>
        ${specs}
        ${link}
      </div>
    </article>`;
}

function render(category) {
  const list = category === "All" ? TOOLS : TOOLS.filter(t => t.category === category);
  grid.innerHTML = list.map(toolCard).join("");
  emptyMsg.hidden = TOOLS.length > 0;
}

function buildFilters() {
  const cats = [...new Set(TOOLS.map(t => t.category).filter(Boolean))];
  if (cats.length < 2) { filters.innerHTML = ""; return; }
  filters.innerHTML = ["All", ...cats]
    .map((c, i) => `<button class="filter-btn${i === 0 ? " active" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`)
    .join("");
  filters.addEventListener("click", e => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    filters.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    render(btn.dataset.cat);
  });
}

buildFilters();
render("All");
