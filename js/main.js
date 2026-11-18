/* Builds the page from js/config.js. You don't need to edit this file. */
(() => {
  const C = window.PORTFOLIO;
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const normImg = (i) => (typeof i === "string" ? { src: i, caption: "" } : i);
  const pad = (n) => String(n).padStart(2, "0");
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
                <span class="doc-side">${esc(d.side)}</span>
                <strong>${esc(d.label)}</strong>
                <span class="doc-artist">${esc(C.name)}</span>
              </div>
            </div>
          </div>
          <div class="plank"></div>
        </button>`).join("");
    $("#docTabs").addEventListener("click", (e) => { const r = e.target.closest(".doc-record"); if (r) showDoc(r.dataset.doc); });
    showDoc(docs[0].id);
  } else {
    $("#documents").remove();
    document.querySelector('.nav a[href="#documents"]')?.remove();
  }
  // Hero buttons jump to the viewer and open the right document
  [["#resumeBtn", "resume"], ["#portfolioBtn", "portfolio"]].forEach(([sel, id]) => {
    const btn = $(sel);
    if (!docs.some((d) => d.id === id)) { btn.remove(); return; }
    btn.href = "#documents";
    btn.removeAttribute("target");
    btn.textContent = id === "resume" ? "Résumé" : "PDF portfolio";
    btn.addEventListener("click", () => showDoc(id));
  });
  $("#heroFacts").innerHTML = [
    C.location && `<li>📍 ${esc(C.location)}</li>`,
    C.status && `<li class="status">${esc(C.status)}</li>`,
    `<li>💿 ${C.projects.length} records in the collection</li>`,
  ].filter(Boolean).join("");

  // Turntable: click to play / stop
  const tt = $("#turntable");
  const toggleTT = () => {
    const on = tt.classList.toggle("playing");
    $("#ttNote").textContent = on ? "♪ now spinning, click to stop" : "↑ click to drop the needle";
  };
  tt.addEventListener("click", toggleTT);
  tt.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleTT(); } });
  if (!reduceMotion) setTimeout(() => { if (!tt.classList.contains("playing")) toggleTT(); }, 900);

  /* ---------- About ---------- */
  $("#aboutText").innerHTML = (C.about || []).map((p) => `<p>${esc(p)}</p>`).join("");
  $("#specList").innerHTML = (C.specs || []).map((s) => `<dt>${esc(s.label)}</dt><dd>${esc(s.value)}</dd>`).join("");
  $("#interests").innerHTML = (C.interests || [])
    .map((it) => `<li class="interest"><span class="icon">${esc(it.icon)}</span><strong>${esc(it.label)}</strong><small>${esc(it.note)}</small></li>`)
    .join("");
  $("#currently").innerHTML = (C.currently || []).map((c) => `<li>${esc(c)}</li>`).join("");

  /* ---------- Discography (experience) ---------- */
  const exp = C.experience || [];
  if (exp.length) {
    $("#experienceList").innerHTML = exp
      .map((e, i) => `<li><span class="trk">${pad(i + 1)}</span>
        <span class="exp-main"><strong>${esc(e.title)}</strong><span>${esc([e.org, e.where].filter(Boolean).join(" · "))}</span></span>
        <span class="exp-when">${esc(e.when)}</span></li>`)
      .join("");
  } else {
    $("#experience").remove();
    document.querySelector('.nav a[href="#experience"]')?.remove();
  }

  /* ---------- Record shelf ---------- */
  const projects = C.projects || [];
  const categories = ["All", ...new Set(projects.map((p) => p.category).filter(Boolean))];
  const count = (c) => (c === "All" ? projects.length : projects.filter((p) => p.category === c).length);
  let activeFilter = "All";

  $("#filters").innerHTML = categories
    .map((c) => `<button class="filter${c === "All" ? " active" : ""}" data-cat="${esc(c)}" type="button">${esc(c)}<small>${count(c)}</small></button>`)
    .join("");
  $("#filters").addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    activeFilter = btn.dataset.cat;
    document.querySelectorAll(".filter").forEach((b) => b.classList.toggle("active", b === btn));
    renderShelf(true);
  });

  function renderShelf(instant = false) {
    const list = projects.map((p, idx) => ({ p, idx })).filter(({ p }) => activeFilter === "All" || p.category === activeFilter);
    const grid = $("#projectGrid");
    if (!list.length) { grid.innerHTML = `<p class="empty">This crate is empty for now.</p>`; return; }
    grid.innerHTML = list
      .map(({ p, idx }) => {
        const cover = p.images && p.images.length ? normImg(p.images[0]) : null;
        const fmt = formatOf(p, idx);
        return `<article class="record ${fmt}${instant ? " in" : ""} reveal" tabindex="0" data-idx="${idx}" aria-label="Play ${esc(p.title)}">
          <span class="play-hint">play ▸</span>
          <div class="record-stage">
            <div class="disc">${discFor(fmt)}</div>
            <div class="sleeve">
              <div class="sleeve-art">${sleeveArt(idx)}</div>
              ${cover ? `<img src="${esc(cover.src)}" alt="${esc(cover.caption || p.title)}" loading="lazy" onerror="this.remove()">` : ""}
              <span class="cat">P-${pad(idx + 1)}</span>
              ${p.upcoming ? `<span class="sticker">coming soon</span>` : ""}
            </div>
          </div>
          <div class="plank"></div>
          <div class="record-info">
            <span class="rec-meta">${esc([p.category, p.year].filter(Boolean).join(" · "))}</span>
            <h3>${esc(p.title)}</h3>
            <p>${esc(p.summary)}</p>
          </div>
        </article>`;
      })
      .join("");
    if (!instant) observeReveals();
  }

  $("#projectGrid").addEventListener("click", (e) => {
    const rec = e.target.closest(".record");
    if (rec) openProject(+rec.dataset.idx);
  });
  $("#projectGrid").addEventListener("keydown", (e) => {
    const rec = e.target.closest(".record");
    if (rec && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openProject(+rec.dataset.idx); }
  });

  /* ---------- Record player (project viewer) ---------- */
  const modal = $("#projectModal");
  let gallery = [], gIdx = 0, lastFocus = null, currentIdx = 0;


  function openProject(idx) {
    const p = projects[idx];
    currentIdx = idx;
    lastFocus = document.activeElement;
    gallery = (p.images || []).map(normImg);

    const fmt = formatOf(p, idx);
    modal.classList.toggle("is-cd", fmt === "cd");
    $("#mDisc").innerHTML = discFor(fmt);
    $("#mArt").innerHTML = sleeveArt(idx);
    $("#modalMeta").textContent = [`P-${pad(idx + 1)}`, p.category, p.year].filter(Boolean).join(" · ");
    $("#modalTitle").textContent = p.title;
    $("#modalStats").innerHTML = (p.stats || []).map((s) => `<div><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></div>`).join("");
    $("#modalStats").style.display = p.stats && p.stats.length ? "" : "none";
    const desc = Array.isArray(p.description) ? p.description : [p.description || p.summary];
    $("#modalDesc").innerHTML = desc.map((d) => `<li>${esc(d)}</li>`).join("");
    $("#modalTags").innerHTML = (p.tags || []).map((t) => `<li>${esc(t)}</li>`).join("");
    $("#modalLinks").innerHTML = (p.links || [])
      .map((l) => `<a class="btn" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join("");

    const multi = gallery.length > 1;
    $("#thumbs").innerHTML = multi
      ? gallery.map((g, i) => `<button type="button" data-i="${i}" aria-label="Photo ${i + 1}"><span class="sleeve-art">${sleeveArt(idx)}</span><img src="${esc(g.src)}" alt="" onerror="this.remove()"></button>`).join("")
      : "";
    $("#galPrev").hidden = !multi;
    $("#galNext").hidden = !multi;

    showImage(0);
    modal.showModal();
    document.body.style.overflow = "hidden";
  }

  function showImage(i) {
    const img = $("#galleryImg");
    if (!gallery.length) { img.style.display = "none"; $("#galleryCaption").textContent = ""; return; }
    gIdx = (i + gallery.length) % gallery.length;
    const g = gallery[gIdx];
    img.style.display = "";
    img.onerror = () => { img.style.display = "none"; };   // no photo yet → show the line-art sleeve
    img.src = g.src;
    img.alt = g.caption || projects[currentIdx].title;
    $("#galleryCaption").textContent = (gallery.length > 1 ? `${gIdx + 1}/${gallery.length} · ` : "") + (g.caption || "");
    document.querySelectorAll("#thumbs button").forEach((b, n) => b.classList.toggle("active", n === gIdx));
  }

  modal.addEventListener("close", () => { document.body.style.overflow = ""; if (lastFocus) lastFocus.focus(); });
  $("#modalClose").addEventListener("click", () => modal.close());
  $("#galPrev").addEventListener("click", () => showImage(gIdx - 1));
  $("#galNext").addEventListener("click", () => showImage(gIdx + 1));
  $("#thumbs").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) showImage(+b.dataset.i); });
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });
  modal.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") showImage(gIdx - 1);
    if (e.key === "ArrowRight") showImage(gIdx + 1);
  });

  /* ---------- Skills ---------- */
  $("#skillsGrid").innerHTML = (C.skills || [])
    .map((g) => `<div class="skill-group reveal"><h3>${esc(g.group)}</h3><ul>${g.items.map((s) => `<li>${esc(s)}</li>`).join("")}</ul></div>`)
    .join("");

  /* ---------- Contact ---------- */
  $("#contactHeadline").textContent = C.contactHeadline;
  $("#contactText").textContent = C.contactText;
  $("#emailBtn").href = `mailto:${C.email}`;
  $("#emailBtn").textContent = C.email;
  const contactLinks = [
    ...(C.socials || []),
    C.resume && { label: "Résumé", url: C.resume },
    C.portfolioPdf && { label: "PDF portfolio", url: C.portfolioPdf },
  ].filter(Boolean);
  $("#socials").innerHTML = contactLinks
    .map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)} ↗</a></li>`).join("");

  const toast = (msg) => {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => t.classList.remove("show"), 2000);
  };
  $("#copyEmail").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(C.email); toast("Email copied ♪"); }
    catch { toast(C.email); }
  });

  $("#footerText").textContent = `© ${new Date().getFullYear()} ${C.name}`;

  /* ---------- Fade sections in on scroll ---------- */
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      }), { threshold: 0.1 })
    : null;
  function observeReveals() {
    document.querySelectorAll(".reveal:not(.in)").forEach((el) => (io ? io.observe(el) : el.classList.add("in")));
  }

  renderShelf();
  observeReveals();

  if (C.consoleMessage) console.log(`${C.name}: ${C.consoleMessage}\n→ ${C.email}`);
})();
