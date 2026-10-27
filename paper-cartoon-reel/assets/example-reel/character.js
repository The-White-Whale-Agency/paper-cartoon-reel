/* EXAMPLE ONLY. The first reel's character, kept to show a finished factory. Do NOT reuse this look: design a new character for every video. */
function characterSVG(id, o = {}) {
  const shirt = o.shirt || "#7f9db0", skin = o.skin || "#caa07c", skinH = o.skinH || "#d8b392", leg = o.leg || "#c39670";
  const acc = o.acc || []; const k = o.k || 1;
  const A = {
    glasses: `<g stroke="${INK}" stroke-width="7" fill="rgba(255,255,255,.28)"><circle cx="72" cy="121" r="27"/><circle cx="128" cy="121" r="27"/><path d="M99 121h2"/></g>`,
    tie: `<path d="M93 160 L107 160 L113 198 L100 210 L87 198Z" fill="#26384a"/>`,
    explorer: `<ellipse cx="100" cy="72" rx="96" ry="15" fill="#a89968"/><path d="M42 72 Q44 16 100 14 Q156 16 158 72Z" fill="#b9a878"/><rect x="42" y="54" width="116" height="13" fill="#6c5c3a"/>`,
    beret: `<g><ellipse cx="108" cy="62" rx="72" ry="25" fill="#c2603f"/><circle cx="110" cy="34" r="7" fill="#8f3f27"/></g>`,
    crown: `<path d="M50 74 L50 26 L77 50 L100 12 L123 50 L150 26 L150 74Z" fill="#e3b73e" stroke="#b8892a" stroke-width="4" stroke-linejoin="round"/><circle cx="50" cy="26" r="6" fill="#c8453a"/><circle cx="100" cy="12" r="6" fill="#c8453a"/><circle cx="150" cy="26" r="6" fill="#c8453a"/>`,
    bowtie: `<path d="M100 164 L66 146 L66 182Z M100 164 L134 146 L134 182Z" fill="#ecb085"/><circle cx="100" cy="164" r="9" fill="#d9824f"/>`,
    sleepcap: `<path d="M38 76 Q54 6 132 36 Q176 52 162 76Z" fill="#7f9db0"/><rect x="38" y="68" width="124" height="12" rx="6" fill="#f4ebd8"/><circle cx="150" cy="34" r="12" fill="#f4ebd8"/>`,
    nametag: `<rect x="62" y="172" width="76" height="22" rx="4" fill="#fffaf0"/><rect x="70" y="180" width="60" height="6" rx="3" fill="#8b7d63"/>`,
    cap: `<path d="M30 76 Q40 24 100 22 Q160 24 170 76Z" fill="#2f3b44"/><path d="M150 74 L196 80 L150 86Z" fill="#232d34"/>`,
  };
  return `<svg id="${id}" class="abs" width="${200 * k}" height="${262 * k}" viewBox="0 0 200 262" style="left:0;top:0">
  <g id="${id}-all">
   <ellipse id="${id}-sh" cx="100" cy="256" rx="72" ry="8" fill="rgba(60,40,15,.2)"/>
   <g id="${id}-legs" fill="${leg}"><rect x="42" y="208" width="26" height="42" rx="3"/><rect x="87" y="208" width="26" height="42" rx="3"/><rect x="132" y="208" width="26" height="42" rx="3"/></g>
   <g id="${id}-body">
    <rect x="25" y="70" width="150" height="145" rx="9" fill="${skin}"/>
    <rect x="25" y="70" width="150" height="34" rx="9" fill="${skinH}"/>
    <rect x="25" y="158" width="150" height="46" fill="${shirt}"/><rect x="25" y="158" width="150" height="8" fill="rgba(255,255,255,.2)"/>
    <rect x="25" y="70" width="150" height="145" rx="9" fill="none" stroke="rgba(60,40,15,.2)" stroke-width="3"/>
   </g>
   <g id="${id}-eyes"><rect x="62" y="104" width="20" height="34" rx="3" fill="${INK}"/><rect x="118" y="104" width="20" height="34" rx="3" fill="${INK}"/></g>
   <g id="${id}-eyesH" opacity="0"><path d="M58 130 Q72 106 86 130" stroke="${INK}" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M114 130 Q128 106 142 130" stroke="${INK}" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M84 148 Q100 166 116 148" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/></g>
   <g id="${id}-eyesS" opacity="0"><rect x="62" y="116" width="20" height="30" rx="3" fill="${INK}"/><rect x="118" y="116" width="20" height="30" rx="3" fill="${INK}"/><path d="M56 100 L86 110 M144 100 L114 110" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M86 160 Q100 148 114 160" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/></g>
   <g id="${id}-eyesZ" opacity="0"><path d="M58 126 H86 M114 126 H142" stroke="${INK}" stroke-width="8" stroke-linecap="round"/></g>
   <g id="${id}-eyesO" opacity="0"><ellipse cx="72" cy="122" rx="14" ry="18" fill="${INK}"/><ellipse cx="128" cy="122" rx="14" ry="18" fill="${INK}"/><ellipse cx="100" cy="156" rx="9" ry="12" fill="${INK}"/></g>
   ${acc.map(a => `<g id="${id}-a-${a}">${A[a]}</g>`).join("")}
   <g transform="translate(14,152)"><g id="${id}-hL"><rect x="-15" y="-15" width="30" height="30" transform="rotate(45)" fill="${leg}"/></g></g>
   <g transform="translate(186,152)"><g id="${id}-hR"><rect x="-15" y="-15" width="30" height="30" transform="rotate(45)" fill="${leg}"/></g></g>
  </g></svg>`;
}


/* Example brand hero (600x330), also example-only. */
/* ---------- Whale (600x330) ---------- */
function heroSVG(id) {
  return `<svg id="${id}" class="abs" width="600" height="330" viewBox="0 0 600 330" style="left:0;top:0;filter:drop-shadow(0 12px 0 rgba(0,0,0,.28))">
  <g id="${id}-all">
   <path d="M566 196 C562 118 470 66 360 68 C250 70 152 108 92 148 C70 162 56 148 36 98 C30 86 18 92 22 106 C28 150 42 188 80 205 C62 216 40 252 34 266 C32 278 46 274 52 264 C72 242 92 232 122 230 C192 256 302 268 402 258 C502 246 570 232 566 196Z" fill="#fffdf7"/>
   <path d="M122 230 C192 256 302 268 402 258 C502 246 570 232 566 196 C520 226 440 238 340 236 C250 234 170 222 100 206Z" fill="#d5e3e8"/>
   <path d="M360 214 C346 250 312 266 282 272 C326 238 340 214 352 196Z" fill="#e6eef0"/>
   <path d="M170 200 H300 M200 218 H320 M240 236 H360" stroke="#b9ccd3" stroke-width="5" stroke-linecap="round" opacity=".8"/>
   <circle id="${id}-eye" cx="490" cy="152" r="10" fill="${INK}"/>
   <circle cx="486" cy="148" r="3.2" fill="#fff"/>
   <ellipse cx="470" cy="186" rx="20" ry="11" fill="#ecb085" opacity=".7"/>
   <path d="M505 200 Q526 210 542 196" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/>
  </g></svg>`;
}

