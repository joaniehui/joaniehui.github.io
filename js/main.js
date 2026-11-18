/* Builds the page from js/config.js. You don't need to edit this file. */
(() => {
  const C = window.PORTFOLIO;
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const normImg = (i) => (typeof i === "string" ? { src: i, caption: "" } : i);
  const pad = (n) => String(n).padStart(2, "0");
  // Optional per-photo settings in config.js: fit: "contain" shows the whole photo (no cropping),
  // position: "top" / "bottom" / "left" / "right" chooses which part stays in view when it's cropped.
  const imgStyle = (g) => {
    const st = [];
    if (g && g.fit === "contain") st.push("object-fit:contain", "background:var(--surface)");
    if (g && g.position) st.push(`object-position:${esc(g.position)}`);
    return st.length ? ` style="${st.join(";")}"` : "";
  };
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (C.accent) document.documentElement.style.setProperty("--accent", C.accent);

  /* ---------- Line-sketch drawings ---------- */
  // A vinyl record, drawn in lines
  const DISC = `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-linecap="round">
    <circle cx="50" cy="50" r="48" stroke-width="1.3" class="disc-body"/>
    <circle cx="50" cy="50" r="42" stroke-width=".45" opacity=".6"/>
    <circle cx="50" cy="50" r="37" stroke-width=".45" opacity=".6"/>
    <circle cx="50" cy="50" r="32" stroke-width=".45" opacity=".6"/>
    <circle cx="50" cy="50" r="27" stroke-width=".45" opacity=".6"/>
    <path d="M50 9 A41 41 0 0 1 85 29" stroke-width=".9" opacity=".5"/>
    <path d="M15 71 A41 41 0 0 0 29 85" stroke-width=".9" opacity=".5"/>
    <circle cx="50" cy="50" r="16" class="lbl" stroke-width="1"/>
    <path d="M41 46 h18" class="a" stroke-width="1"/>
    <path d="M44 54 h12" class="a" stroke-width=".8"/>
    <circle cx="50" cy="50" r="1.8" class="fill-ink"/>
  </svg>`;

  // A CD, drawn in lines: thin rings, a shine, a clear hub and a big centre hole
  const CD = `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-linecap="round">
    <circle cx="50" cy="50" r="48" stroke-width="1.2" class="disc-body"/>
    <circle cx="50" cy="50" r="45.5" stroke-width=".4" opacity=".5"/>
    <path d="M50 6 A44 44 0 0 1 91 36" class="a" stroke-width="5" opacity=".16"/>
    <path d="M9 64 A44 44 0 0 0 36 91" class="a" stroke-width="5" opacity=".16"/>
    <path d="M62 10 A41 41 0 0 1 86 28" stroke-width=".6" opacity=".45"/>
    <circle cx="50" cy="50" r="19" stroke-width=".6" opacity=".6"/>
    <circle cx="50" cy="50" r="14" stroke-width=".9"/>
    <circle cx="50" cy="50" r="7.5" stroke-width="1" class="cd-hole"/>
  </svg>`;
  // Which format a record uses: set format: "cd" or "vinyl" on a project, or let it alternate
  const formatOf = (p, idx) => p.format || (idx % 3 === 1 ? "cd" : "vinyl");
  const discFor = (fmt) => (fmt === "cd" ? CD : DISC);

  // Minimal line-art "album cover" for each project, used until you add a photo.
  // Six patterns, picked by the project's position in the list.
  function sleeveArt(i) {
    const k = i % 6;
    let s = "";
    if (k === 0) {
      for (let r = 6; r <= 54; r += 8) s += `<circle cx="38" cy="62" r="${r}"/>`;
      s += `<circle cx="38" cy="62" r="3.5" class="af"/>`;
    } else if (k === 1) {
      for (let y = 18; y <= 82; y += 8) s += `<line x1="14" y1="${y}" x2="${14 + 18 + ((y * 37 + i * 13) % 56)}" y2="${y}"/>`;
      s += `<line x1="14" y1="50" x2="86" y2="50" class="a" stroke-width="2"/>`;
    } else if (k === 2) {
      s += `<polygon points="50,14 88,84 12,84" class="a" stroke-width="1.6"/>`;
      for (let y = 24; y <= 84; y += 6) { const h = ((y - 14) / 70) * 38; s += `<line x1="${50 - h}" y1="${y}" x2="${50 + h}" y2="${y}" opacity=".7"/>`; }
    } else if (k === 3) {
      for (let j = 0; j < 7; j++) { const y = 24 + j * 9; s += `<path d="M10 ${y} Q 30 ${y - 8} 50 ${y} T 90 ${y}"${j === 3 ? ' class="a" stroke-width="1.8"' : ""}/>`; }
    } else if (k === 4) {
      let lit = false;
      for (let x = 0; x < 5; x++) for (let y = 0; y < 5; y++) {
        const on = !lit && (x * 7 + y * 3 + i) % 11 === 0;
        if (on) lit = true;
        s += `<circle cx="${22 + x * 14}" cy="${22 + y * 14}" r="4.5"${on ? ' class="af"' : ""}/>`;
      }
    } else {
      for (let j = 0; j < 6; j++) { const h = 8 + j * 7; s += `<rect x="${50 - h}" y="${50 - h}" width="${2 * h}" height="${2 * h}" transform="rotate(${j * 9} 50 50)"${j === 2 ? ' class="a"' : ""}/>`; }
    }
    return `<svg class="sketch" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width=".9" stroke-linecap="round">${s}</svg>`;
  }

  /* ---------- Hero ---------- */
  document.title = `${C.name} | ${C.role}`;
  $("#logo").textContent = C.initials || C.name.split(" ").map((w) => w[0]).join("");
  $("#heroName").textContent = C.name;
  $("#heroRole").textContent = C.role;
  $("#heroTagline").textContent = C.tagline;
  /* ---------- Embedded resume & PDF portfolio ---------- */
  // Google Drive "view" links are turned into embeddable "preview" links automatically
  const embedUrl = (u) => u.replace(/(drive\.google\.com\/file\/d\/[^/]+)\/(view|edit)[^#]*/, "$1/preview");
  const docs = [
    C.resume && { id: "resume", label: "Résumé", side: "CD single", fmt: "cd", url: C.resume },
    C.portfolioPdf && { id: "portfolio", label: "PDF Portfolio", side: "LP", fmt: "vinyl", url: C.portfolioPdf },
  ].filter(Boolean);
  const showDoc = (id) => {
    const d = docs.find((x) => x.id === id) || docs[0];
    const frame = $("#docFrame");
    if (frame.dataset.doc !== d.id) { frame.src = embedUrl(d.url); frame.dataset.doc = d.id; }
    frame.title = d.label;
    $("#docOpen").href = d.url;
    $("#docTitle").textContent = `${d.label} · ${d.side}`;
    $("#docLabel").textContent = `${d.side} — ${d.label}`;
    document.querySelectorAll(".doc-record").forEach((r) => {
      const on = r.dataset.doc === d.id;
      r.classList.toggle("playing", on);
      r.setAttribute("aria-selected", on);
    });
  };
  if (docs.length) {
    $("#docTabs").innerHTML = docs
      .map((d) => `<button class="record doc-record ${d.fmt}" type="button" role="tab" data-doc="${d.id}" aria-label="Play ${esc(d.label)}">
          <div class="record-stage">
            <div class="disc">${discFor(d.fmt)}</div>
            <div class="sleeve">
              <div class="doc-cover">
