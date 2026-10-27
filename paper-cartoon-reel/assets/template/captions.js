/* captions.js: word-by-word paper labels built from timing.js. Edit KW (highlighted keywords) per video. */
/* =============== CAPTIONS (word-by-word paper labels) =============== */
(function () {
  const root = document.getElementById("caps");
  const KW = new Set([/* key words of THIS video, exactly as spoken, e.g. "free", "#1", "never" */]);
  const DARK = new Set([SC.length - 1]); // scene indexes whose caption pill is dark (dark-background scenes; default: the last)
  let ci = 0;
  SC.forEach((s, si) => {
    const toks = s.text.split(/\s+/);
    const chunks = []; let cur = [];
    toks.forEach((tk, k) => {
      if (cur.length && (cur.length >= 3 || cur.map(i => toks[i]).concat(tk).join(" ").length > 21)) { chunks.push(cur); cur = []; }
      cur.push(k); if (/[.,?:!]$/.test(tk)) { chunks.push(cur); cur = []; }
    });
    if (cur.length) chunks.push(cur);
    chunks.forEach((idx, j) => {
      const t = s.words[idx[0]].s - .03;
      const nxt = chunks[j + 1] ? s.words[chunks[j + 1][0]].s - .02 : Math.min(s.start + s.dur - .04, s.words[idx[idx.length - 1]].e + .5);
      const html = idx.map(k => { const raw = toks[k].replace(/[.,:!]$/, ""); const bare = raw.replace(/[?]$/, ""); return KW.has(bare) ? `<span class="kw">${raw}</span>` : `<span>${raw}</span>`; }).join("");
      const el = mk(root, `<div class="cap"><div class="pill ${DARK.has(si) ? "dk" : ""}">${html}</div></div>`);
      const rot = (rnd(ci++) - .5) * 4;
      gsap.set(el, { rotation: rot, transformOrigin: "50% 50%" });
      tl.fromTo(el, { scale: .72, opacity: 0, y: 24 }, { scale: 1, opacity: 1, y: 0, duration: .17, ease: "back.out(2.4)" }, t);
      tl.set(el, { opacity: 0 }, nxt);
    });
  });
})();
