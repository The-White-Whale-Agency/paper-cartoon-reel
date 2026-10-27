# Look, motion and sound rules

Derived from two reference Reels (a paper/voxel mascot explaining AI-model usage and a code-graph tool) and from building a first brand reel. Read before writing `scenes.js`.

## What makes the references watchable

| Element | Rule |
|---|---|
| World | Paper diorama: flat cut-out shapes, soft drop shadows, subtle grain, dot grid on the wall. One character whose hat/accessory (or equivalent: scarf, tool, badge) shows its role in the scene. |
| Metaphor over interface | Show the idea as objects: a limit becomes a bitten coin, a website becomes a picture on a wall, "works around the clock" becomes a sun/moon swap. Never a screenshot of UI. |
| Pacing | New scene (new backdrop) every 2–5 s, one idea per scene. Voice is brisk, one fact per sentence. |
| Header plaque | A paper sign at the top names the scene's idea in 1–3 words, drops in with overshoot. |
| Captions | 1–3 words on paper pills, ≤21 characters, popped in at the word; key word in italic serif + accent colour. |
| Dopamine hits | Counters tick, bars fill, stamps slam with a screen shake, items fly into a counter, confetti on the win. Something moves every ~0.3 s. |
| Character life | Overshoot on entrances, squash & stretch on hops, blink, eyes look toward the object, face swaps (happy / sad / sleeping / surprised), idle bob. |
| Sound | Every pop/stamp/slide has a hit; quiet music bed ducked under the voice. |

## Characters (new for every video)

No default character ships with the skill. Design one per video, from the topic and the hook, and show it at the approval gate.

- **Vary the shape language** each time: round blob, tall and thin, spiky, soft and squashy, geometric, hand-cut, animal, robot, food, tool, weather, plant, object come to life. A character that suits the topic (a leaking pipe for a plumbing offer, a wilting plant for a stalled project) beats a generic mascot.
- **Avoid the stock-mascot look**: a rounded-square block body with two small rectangular eyes in warm orange/tan reads as a well-known AI product icon. Change the silhouette, the eye style and the colours, not just the accessories.
- **Never reuse** the previous video's character, silhouette or colour scheme. `assets/example-reel/character.js` is a finished example of the factory format, not a template to copy the look from.
- **Technical contract** (so the helpers `face`, `blink`, `look`, `hop`, `arms`, `wave`, `idle` work): write `characterSVG(id, {k, acc})` in `character.js`; viewBox `0 0 200 262`; groups `#id-all`, `#id-sh` (shadow), `#id-eyes` (open eyes, centre 100,121), `#id-eyesH` `-eyesS` `-eyesZ` `-eyesO` (happy / sad / sleeping / surprised, opacity 0), `#id-hL` `#id-hR` (hands, pivots 14,152 and 186,152), `#id-a-<name>` per accessory. Colours via `P("token")`. A missing part only makes that helper a no-op. A different pose set or proportions are fine if you adapt the helper calls in `scenes.js`.
- Accessories show the role per scene (glasses = analyst, hard hat = builder, crown = winner); keep them as separate groups.
- One character per reel unless the story needs a second.

## Palette (chosen for every video)

You choose the palette; the user does not need to. The skill never ships a brand palette: the `:root` block in `style.css` is a placeholder to **rewrite for each video**.

- Derive it from the topic, the emotion of the hook, the audience and the platform: e.g. warm and soft for approachable services, saturated and high-contrast for urgency, cool and calm for trust or finance, playful bright pairs for consumer topics. Say in one line why (in `PLAN.md`).
- Different video, different palette. Do not drift back to cream + peach + navy.
- Fill every slot: surfaces `light paper card`, ink `ink muted line`, accent `accent accent-d`, secondary `cool steel`, dark scenes `dark dark2 dark3 dark4`, status `red green gold`, shadow rgb `sh`. Props (`siteWin`, `counterCard`, `ICON`, confetti) recolour automatically; your scenes use `var(--token)` / `P("token")`.
- Contrast: captions and plaques must stay readable at phone size; `check` reports contrast failures with a suggested colour. Keep status colours recognisable (red = bad, green = good) while matching the palette.
- If the user supplies a brand (colours, fonts, logo), use it instead and still map it onto the slots. A brand hero (mascot, logo animal) is drawn per video in `scenes.js`/`character.js`.

## Story arc template (6–9 scenes)
Open on the hook (see `marketing-and-hooks.md`), not on an introduction of the character.
1. HOOK: the problem, number or question as a picture plus the first spoken line, moving from frame 0 (the character may already be in it).
2. The problem as numbers (counters at 0, empty rooms).
3. The diagnosis as one image ("only a picture on a wall") + a red stamp.
4. The turn: the thing becomes useful (works day and night, counter ticks up).
5. How, part 1 (e.g. search ranking climbs to #1, medal).
6. How, part 2 (messy → clean, three checkmarks, a click that produces a lead).
7. Result: three badges slam in, confetti.
8. Brand + CTA (the last line stays on screen ~2 s or more).

## Timing rules
- Anchor reveals to words: `W(scene, k)`; offset by −0.05…−0.1 s so the object lands as the word is spoken.
- Stamps: impact at `t + 0.16` (see `stamp`); put the sound there.
- Slides/drops with `back.out`: audible impact ≈ 0.3 s after the start.
- A scene's clip length is its voice line + gap, so a scene ends exactly when the next line starts. Do not leave long silent animation tails.
- Read time (HyperFrames `check` "craft" rules): a text block needs roughly 0.5 s + 0.3 s per word on screen; the film's last line about 2 s.

## Layout rules (1080×1920)
Safe content band y 430–1440 under the header; captions pill centred at y 1478 (dark pill on dark backgrounds); keep important elements out of the outer 40 px; body text at least 28 px. Fill the frame: if a scene looks empty, enlarge props (use `zoom` on a group) before adding clutter.

## Sound design
Synthesized by `mix.py`: `pop pop_s boing tick stamp slam slam_soft whoosh swish wind ding chime sad fanfare splash confetti`, or from earshot's bank. Typical levels: voice 0 dB reference, whoosh −8…−10, pop −5, stamp −2…−3, slam −4, ding −9, typing ticks −14…−22, music bed volume 0.34 before ducking. Final mix −14 LUFS, peak ≤ −1 dBTP.

## Avoid
Text in the top ~10 % other than the header, UI-style gradients/glass, stock icons mixed with paper art, constant motion with no reading time on counters, unreadable pill text (>3 words), a character or palette copied from a previous reel.
