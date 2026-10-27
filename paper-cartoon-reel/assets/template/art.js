/* Paper-craft art factories. Everything returns markup strings; ids are prefixed so scenes never collide. */
/* Palette access. Colour literals in this file are palette SLOTS: tint() swaps each for this video's value of the
   matching --token in style.css, so changing :root recolours the props. In scenes/characters use var(--token) in CSS
   and P("token") in SVG attributes; never literal hex. */
const P = n => getComputedStyle(document.documentElement).getPropertyValue("--" + n).trim();
const SLOT = {"#f4ebd8": "light", "#efe3c8": "paper", "#fffaf0": "card", "#2a2622": "ink", "#8b7d63": "muted", "#cfc4ad": "line", "#ecb085": "accent", "#d9824f": "accent-d", "#d5e3e8": "cool", "#7f9db0": "steel", "#0a141d": "dark", "#1a2832": "dark2", "#26384a": "dark3", "#22323f": "dark4", "#2f3b44": "dark3", "#c8453a": "red", "#5f9b6e": "green", "#e3b73e": "gold", "#3a342c": "ink", "#2b2620": "ink", "#e9dfc8": "paper", "#a9b9c2": "cool", "#6c5c3a": "muted", "#8b6b45": "muted"};
const tint = s => s.replace(/#[0-9a-fA-F]{6}\b/g, h => { const n = SLOT[h.toLowerCase()]; return (n && P(n)) || h; });
const INK = P("ink") || "#2a2622";

/* ---------- Browser window / site card ---------- */
function siteWinRaw(id, w, h, mode = "clean", url = "example.com") {
  const bar = (x, y, bw, bh, col = "#cfc4ad") => `<div class="bar" style="left:${x}px;top:${y}px;width:${bw}px;height:${bh}px;background:${col}"></div>`;
  const top = Math.round(h * .12), pad = Math.round(w * .06);
  let body;
  if (mode === "messy") {
    body = bar(pad, top + 16, w * .5, 26, "#c8453a") + bar(pad + w * .42, top + 50, w * .46, 54, "#5f9b6e") + bar(pad, top + 70, w * .34, 70, "#e3b73e")
      + bar(pad + 20, top + 150, w * .7, 18, "#7f9db0") + bar(pad, top + 178, w * .3, 70, "#ecb085") + bar(pad + w * .36, top + 190, w * .5, 22, "#9a6fb0")
      + bar(pad + w * .5, top + 224, w * .36, 56, "#c8453a") + bar(pad, top + 262, w * .4, 18, "#26384a") + bar(pad + w * .46, top + 296, w * .4, 16, "#e3b73e");
  } else {
    body = bar(pad, top + 22, w * .56, 30, "#3a342c") + bar(pad, top + 66, w * .42, 16, "#cfc4ad") + bar(pad, top + 94, w * .36, 16, "#cfc4ad")
      + `<div class="abs" style="left:${pad}px;top:${top + 138}px;width:${w * .3}px;height:${h * .13}px;border-radius:${h * .065}px;background:var(--accent-d);box-shadow:0 5px 0 rgba(0,0,0,.18);display:flex;align-items:center;justify-content:center;font:800 ${Math.round(h * .052)}px Inter;color:#fff;letter-spacing:.04em">KONTAKT</div>`
      + `<div class="abs" style="right:${pad}px;top:${top + 22}px;width:${w * .3}px;height:${h * .5}px;border-radius:12px;background:linear-gradient(160deg,#ecb085,#d5e3e8)"></div>`;
  }
  const dots = ["#e58a7b", "#e8c36b", "#8fbf8a"].map((c, i) => `<div class="abs" style="left:${18 + i * 22}px;top:${(top - 14) / 2}px;width:14px;height:14px;border-radius:50%;background:${c}"></div>`).join("");
  return `<div id="${id}" class="card" style="width:${w}px;height:${h}px"><div class="abs" style="left:0;top:0;width:100%;height:${top}px;background:#e9dfc8"></div>${dots}
   <div class="abs" style="left:${w * .26}px;top:${(top - 22) / 2}px;width:${w * .5}px;height:22px;border-radius:11px;background:#fffaf0;font:600 15px/22px Inter;color:#8b7d63;text-align:center">${url}</div>${body}</div>`;
}

const siteWin = (...a) => tint(siteWinRaw(...a));

/* ---------- Counter card ---------- */
function counterCardRaw(id, label, w, h, val = "0", dark = false, numSize = 120) {
  return `<div id="${id}" class="card ${dark ? "dk" : ""}" style="width:${w}px;height:${h}px">
   <div class="lbl tcenter abs" style="left:0;top:24px;width:100%;font-size:${Math.round(w * .088)}px;${dark ? "color:#a9b9c2" : ""}">${label}</div>
   <div id="${id}-n" class="big tcenter abs" style="left:0;top:${Math.round(h * .3)}px;width:100%;font-size:${numSize}px;${dark ? "color:var(--light)" : ""}">${val}</div></div>`;
}

const counterCard = (...a) => tint(counterCardRaw(...a));

/* ---------- small icons (all fill var colours, 100x100 boxes) ---------- */
const ICON = {
  person: c => `<svg width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="32" r="18" fill="${c}"/><path d="M14 92 Q14 56 50 56 Q86 56 86 92Z" fill="${c}"/></svg>`,
  eye: c => `<svg width="100" height="100" viewBox="0 0 100 100"><path d="M6 50 Q50 6 94 50 Q50 94 6 50Z" fill="${c}"/><circle cx="50" cy="50" r="19" fill="#fffaf0"/><circle cx="50" cy="50" r="10" fill="${INK}"/></svg>`,
  shield: c => `<svg width="100" height="100" viewBox="0 0 100 100"><path d="M50 6 L88 20 V50 Q88 80 50 95 Q12 80 12 50 V20Z" fill="${c}"/><path d="M30 50 L45 65 L72 36" stroke="#fffaf0" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  stopwatch: c => `<svg width="100" height="100" viewBox="0 0 100 100"><rect x="42" y="4" width="16" height="10" rx="3" fill="${c}"/><circle cx="50" cy="56" r="38" fill="${c}"/><circle cx="50" cy="56" r="28" fill="#fffaf0"/><path d="M50 56 V36 M50 56 L64 64" stroke="${INK}" stroke-width="6" stroke-linecap="round"/></svg>`,
  phone: c => `<svg width="100" height="100" viewBox="0 0 100 100"><rect x="26" y="6" width="48" height="88" rx="10" fill="${c}"/><rect x="32" y="16" width="36" height="62" rx="4" fill="#fffaf0"/><circle cx="50" cy="86" r="3.5" fill="#fffaf0"/></svg>`,
  stars: c => `<svg width="100" height="100" viewBox="0 0 100 100">${[16, 50, 84].map((x, i) => `<path transform="translate(${x - 17},${i == 1 ? 26 : 38}) scale(1.1)" d="M17 0 L21 12 L34 12 L24 20 L28 33 L17 25 L6 33 L10 20 L0 12 L13 12Z" fill="${c}"/>`).join("")}</svg>`,
  check: c => `<svg width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="${c}"/><path d="M26 52 L43 69 L75 33" stroke="#fffaf0" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  moon: `<svg width="200" height="200" viewBox="0 0 200 200"><path d="M130 14 A88 88 0 1 0 186 130 A70 70 0 1 1 130 14Z" fill="#f4ebd8"/></svg>`,
  sun: `<svg width="240" height="240" viewBox="-20 -20 240 240"><g stroke="#e3b73e" stroke-width="12" stroke-linecap="round">${Array.from({ length: 12 }, (_, i) => `<path transform="rotate(${i * 30} 100 100)" d="M100 -6 V22"/>`).join("")}</g><circle cx="100" cy="100" r="62" fill="#f1c84b"/></svg>`,
  mag: `<svg width="150" height="170" viewBox="0 0 150 170"><circle cx="64" cy="64" r="48" fill="rgba(213,227,232,.55)" stroke="#6c5c3a" stroke-width="12"/><path d="M99 99 L138 154" stroke="#6c5c3a" stroke-width="18" stroke-linecap="round"/></svg>`,
  medal: `<svg width="170" height="220" viewBox="0 0 170 220"><path d="M50 0 L85 70 L120 0Z" fill="#c8453a"/><path d="M30 0 L72 82 L58 90 L18 6Z" fill="#a8362c" opacity=".0"/><circle cx="85" cy="135" r="62" fill="#e3b73e" stroke="#b8892a" stroke-width="8"/><circle cx="85" cy="135" r="44" fill="#f1c84b"/><text x="85" y="156" text-anchor="middle" font-family="Inter" font-weight="900" font-size="64" fill="#8a5f12">1</text></svg>`,
  cursor: `<svg width="90" height="110" viewBox="0 0 90 110"><path d="M8 4 L8 84 L28 66 L42 100 L56 94 L42 62 L70 62Z" fill="#2a2622" stroke="#fffaf0" stroke-width="6" stroke-linejoin="round"/></svg>`,
  tumble: `<svg width="150" height="150" viewBox="0 0 150 150"><g fill="none" stroke="#8b6b45" stroke-width="5" stroke-linecap="round"><circle cx="75" cy="75" r="62"/><path d="M20 70 Q50 20 120 50 M30 110 Q80 60 130 100 M45 30 Q90 80 40 120 M100 22 Q60 70 110 128 M12 90 Q70 85 138 70"/></g></svg>`,
  heart: `<svg width="64" height="60" viewBox="0 0 64 60"><path d="M32 56 C4 36 2 14 18 8 C26 5 32 12 32 16 C32 12 38 5 46 8 C62 14 60 36 32 56Z" fill="#e0526a"/></svg>`,
};
for (const k of Object.keys(ICON)) { const v = ICON[k]; ICON[k] = typeof v === "function" ? (...a) => tint(v(...a)) : tint(v); }
