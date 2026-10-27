/* core.js: timeline + helpers (globals shared with scenes.js / captions.js). Timings come from timing.js (real voice). */
const TM = window.TIMING, SC = TM.scenes;
const W = (s, k) => SC[s - 1].words[k].s;      // word start, scene s (1-based), word k
const WE = (s, k) => SC[s - 1].words[k].e;
const T0 = s => SC[s - 1].start;
const tl = gsap.timeline({ paused: true });
const frac = x => x - Math.floor(x);
const rnd = i => frac(Math.sin(i * 12.9898 + 7.1) * 43758.5453);

/* ---------- helpers ---------- */
function mk(parent, html) { const d = document.createElement("div"); d.innerHTML = html.trim(); const e = d.firstElementChild; parent.appendChild(e); return e; }
function at(el, x, y, rot = 0) { el.style.left = x + "px"; el.style.top = y + "px"; if (rot) gsap.set(el, { rotation: rot }); return el; }
const pop = (el, t, d = .42, from = .2) => tl.fromTo(el, { scale: from, opacity: 0 }, { scale: 1, opacity: 1, duration: d, ease: "back.out(2.6)" }, t);
const drop = (el, t, y = -260, d = .55) => tl.fromTo(el, { y, opacity: 0 }, { y: 0, opacity: 1, duration: d, ease: "back.out(1.7)" }, t);
const rise = (el, t, y = 260, d = .5) => drop(el, t, y, d);
const slide = (el, t, x, d = .5) => tl.fromTo(el, { x, opacity: 0 }, { x: 0, opacity: 1, duration: d, ease: "back.out(1.5)" }, t);
const shake = (st, t, a = 14) => tl.to(st, { keyframes: [{ x: a, y: -a * .6, duration: .04 }, { x: -a * .8, y: a * .5, duration: .04 }, { x: a * .5, y: -a * .3, duration: .04 }, { x: 0, y: 0, duration: .06 }] }, t);
const stamp = (el, t, rot, st, a) => { tl.fromTo(el, { scale: 2.8, opacity: 0, rotation: rot - 14 }, { scale: 1, opacity: .94, rotation: rot, duration: .16, ease: "power4.in" }, t); if (st) shake(st, t + .15, a); };
const count = (el, t, d, a, b) => tl.fromTo(el, { textContent: a }, { textContent: b, duration: d, ease: "power1.out", snap: { textContent: 1 } }, t);
const bump = (el, t) => tl.to(el, { keyframes: [{ scaleX: 1.12, scaleY: .88, duration: .08 }, { scaleX: .94, scaleY: 1.08, duration: .1 }, { scaleX: 1, scaleY: 1, duration: .14 }] }, t);

function scene(n) {
  const sc = document.getElementById("sc" + n);
  const st = mk(sc, `<div class="abs" style="inset:0"></div>`);
  tl.fromTo(st, { scale: 1.06 }, { scale: 1, duration: .45, ease: "power3.out" }, T0(n));
  return st;
}
function paper(st, bg, extra = "") { return mk(st, `<div class="abs ${extra}" style="inset:-40px;background:${bg}"></div>`); }
function finish(st) { mk(st, `<div class="grain"></div>`); mk(st, `<div class="vign"></div>`); }
function hdr(st, n, text, dark) {
  const h = mk(st, `<div class="hdr ${dark ? "dark" : ""}">${text}</div>`);
  gsap.set(h, { rotation: -1.4 });
  tl.fromTo(h, { y: -320, opacity: 0, rotation: -6 }, { y: 0, opacity: 1, rotation: -1.4, duration: .6, ease: "back.out(1.8)" }, T0(n) + .05);
  return h;
}

/* ---------- Character (drawn per video in character.js as characterSVG) ----------
   Factory contract: characterSVG(id, {k, acc, ...}) returns an <svg id=id> with viewBox 0 0 200 262 and groups
   #id-eyes (open eyes, centre 100,121), #id-eyesH/-eyesS/-eyesZ/-eyesO (happy/sad/sleep/surprised, opacity 0),
   #id-hL / #id-hR (hands, pivots 14,152 and 186,152), #id-a-<name> (accessories). Missing parts only make that helper a no-op. */
const FACES = { n: "eyes", h: "eyesH", s: "eyesS", z: "eyesZ", o: "eyesO" };
function character(st, id, x, y, k, o = {}) {
  const w = mk(st, `<div class="abs" id="${id}w" style="left:${x}px;top:${y}px;width:${200 * k}px;height:${262 * k}px">${(o.svg || characterSVG)(id, { ...o, k })}</div>`);
  gsap.set(w, { transformOrigin: "50% 100%" });
  return w;
}
const face = (id, kind, t) => { for (const [kk, g] of Object.entries(FACES)) tl.set(`#${id}-${g}`, { opacity: kk === kind ? 1 : 0 }, t); };
const blink = (id, t) => tl.to(`#${id}-eyes`, { scaleY: .1, svgOrigin: "100 121", duration: .06, repeat: 1, yoyo: true }, t);
const look = (id, x, t, d = .14) => tl.to(`#${id}-eyes`, { x, duration: d, ease: "power2.out" }, t);
const hop = (w, t, h = 46) => tl.to(w, { keyframes: [{ y: 10, scaleX: 1.1, scaleY: .88, duration: .09 }, { y: -h, scaleX: .94, scaleY: 1.08, duration: .2, ease: "power2.out" }, { y: 0, scaleX: 1.08, scaleY: .92, duration: .18, ease: "power2.in" }, { y: 0, scaleX: 1, scaleY: 1, duration: .12 }] }, t);
const arms = (id, t, d = .22) => { tl.to(`#${id}-hL`, { y: -78, x: -8, duration: d, ease: "back.out(2)" }, t); tl.to(`#${id}-hR`, { y: -78, x: 8, duration: d, ease: "back.out(2)" }, t); };
const wave = (id, side, t, n = 4) => { tl.to(`#${id}-h${side}`, { y: -96, x: side === "R" ? 12 : -12, duration: .2, ease: "back.out(2)" }, t); tl.to(`#${id}-h${side}`, { rotation: 28, svgOrigin: side === "R" ? "186 152" : "14 152", duration: .16, repeat: n * 2 - 1, yoyo: true, ease: "sine.inOut" }, t + .2); };
const armsDown = (id, t) => { tl.to(`#${id}-hL`, { y: 0, x: 0, rotation: 0, duration: .2 }, t); tl.to(`#${id}-hR`, { y: 0, x: 0, rotation: 0, duration: .2 }, t); };
const idle = (w, t0, t1, amp = 6) => { const n = Math.max(1, Math.floor((t1 - t0) / .9)); tl.to(w, { y: -amp, duration: .45, repeat: n * 2 - 1, yoyo: true, ease: "sine.inOut" }, t0); };

/* confetti burst */
function confetti(st, t, cx, cy, n = 26, spread = 520) {
  const cols = ["accent", "accent-d", "steel", "gold", "green", "red", "card"].map(P);
  for (let i = 0; i < n; i++) {
    const c = mk(st, `<div class="abs" style="left:${cx}px;top:${cy}px;width:${14 + rnd(i) * 14}px;height:${10 + rnd(i + 40) * 14}px;background:${cols[i % cols.length]};border-radius:3px;opacity:0"></div>`);
    const dx = (rnd(i + 9) - .5) * spread, up = 160 + rnd(i + 21) * 300, fall = 260 + rnd(i + 31) * 320;
    tl.set(c, { opacity: 1 }, t);
    tl.to(c, { keyframes: [{ x: dx * .55, y: -up, rotation: 200 * (rnd(i + 5) - .5), duration: .42, ease: "power2.out" }, { x: dx, y: fall, rotation: 520 * (rnd(i + 3) - .5), opacity: 0, duration: 1.15, ease: "power1.in" }] }, t);
  }
}
