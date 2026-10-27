/* character.js: DRAW A NEW CHARACTER FOR EVERY VIDEO. This stub is only a placeholder with the required part ids.
   Rules: new species/object/shape language each time (round, tall, spiky, soft, geometric; animal, robot, food, tool,
   weather, ...); never reuse the previous video's character; avoid a rounded-square body with two rectangular
   eyes in warm orange/tan. Draw in a 200x262 viewBox, colours from palette tokens via P("token").
   Required ids: #id-all, #id-sh (shadow), #id-eyes (open eyes, centre 100,121), #id-eyesH #id-eyesS #id-eyesZ #id-eyesO
   (happy / sad / sleeping / surprised, opacity 0), #id-hL #id-hR (hands, pivots 14,152 and 186,152), #id-a-<name> per
   accessory in o.acc. Props come from art.js; give the character its own face, posture and accessories (role per scene). */
function characterSVG(id, o = {}) {
  const k = o.k || 1, body = P("steel"), ink = INK;
  return `<svg id="${id}" class="abs" width="${200 * k}" height="${262 * k}" viewBox="0 0 200 262" style="left:0;top:0">
  <g id="${id}-all">
   <ellipse id="${id}-sh" cx="100" cy="256" rx="60" ry="8" fill="rgba(var(--sh),.2)"/>
   <circle cx="100" cy="150" r="90" fill="${body}"/>
   <g id="${id}-eyes"><circle cx="72" cy="121" r="11" fill="${ink}"/><circle cx="128" cy="121" r="11" fill="${ink}"/></g>
   <g id="${id}-eyesH" opacity="0"><path d="M58 130 Q72 106 86 130 M114 130 Q128 106 142 130" stroke="${ink}" stroke-width="8" fill="none" stroke-linecap="round"/></g>
   <g id="${id}-eyesS" opacity="0"><circle cx="72" cy="128" r="11" fill="${ink}"/><circle cx="128" cy="128" r="11" fill="${ink}"/></g>
   <g id="${id}-eyesZ" opacity="0"><path d="M58 126 H86 M114 126 H142" stroke="${ink}" stroke-width="8" stroke-linecap="round"/></g>
   <g id="${id}-eyesO" opacity="0"><ellipse cx="72" cy="122" rx="12" ry="16" fill="${ink}"/><ellipse cx="128" cy="122" rx="12" ry="16" fill="${ink}"/></g>
   ${(o.acc || []).map(a => `<g id="${id}-a-${a}"></g>`).join("")}
   <g transform="translate(14,152)"><g id="${id}-hL"><circle r="14" fill="${body}"/></g></g>
   <g transform="translate(186,152)"><g id="${id}-hR"><circle r="14" fill="${body}"/></g></g>
  </g></svg>`;
}
