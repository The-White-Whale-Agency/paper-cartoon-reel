# Pipeline gotchas (all hit while building the first reel)

| Symptom | Cause | Fix |
|---|---|---|
| `WSServerHandshakeError 403` from edge-tts | Vendored/old `edge-tts` has an outdated token version | `pip install --target <project>/.pydeps edge-tts` (current version); `gen_vo.py` imports from `<project>/.pydeps` |
| Voice is ~40 % longer than the script suggests | Edge adds ~0.8 s silence after every `.` `?` `:` | Already handled: `gen_vo.py` synthesizes per sentence and re-joins with `--seg-gap`/`--line-gap` |
| `check` → `page_error: Cannot read properties of undefined (reading 's')` | A `W(scene, k)` index beyond the scene's word count. Edge sometimes glues two words ("auf Platz") | `gen_vo.py` splits glued words proportionally; verify word counts per scene (`len(text.split())` vs `len(words)`) after every voice run |
| `check` → `page_error: X is not defined` | `scenes.js` calls a factory (`heroSVG`, `characterSVG` variant, a prop) that `character.js`/`art.js` does not define; one error blanks all scenes | Define it, or remove the call; re-run `check --json` |
| `render` prints `render_cancelled_parent_exited` | The render was started detached from the shell | Run `render` in the foreground (a 35 s reel takes about 25 s at `--quality draft`, longer for `delivery`/60 fps) |
| `check` → `contrast_aa_failure`, `line_unread`, `text_below_floor` | Palette contrast; text on screen too briefly (≈0.5 s + 0.3 s per word, last line ≥2 s); text under 28 px | Fix on captions, plaques and the CTA; ignore fake-UI text inside decorative props |
| `lint` → `missing_timeline_registry` | Timeline registered inside an external `.js` | `build_index.py` registers `window.__timelines["main"] = tl` in an inline script |
| `console_error: <svg> attribute height NaN` | A local function shadowing a core helper (a local `wave()` replaced the hand-wave helper) | Use unique local names; the example uses `sea()` for water |
| Counter shows wrong number after seeking | `onUpdate` callbacks are suppressed when the renderer seeks | Tween `textContent` with `snap:{textContent:1}` (the `count()` helper) |
| `lint` → `gsap_css_transform_conflict` | CSS `transform` plus a GSAP tween on the same property | Position with `left/top`; set rotations with `gsap.set`; use CSS `zoom` to scale a static group |
| Render dies with disk-space errors | Default temp is on a nearly full system drive | Set `TMPDIR` (macOS/Linux) or `TEMP`/`TMP` (Windows) to a drive with several GB free before `render`; remove the folder afterwards |
| `?` characters in Python output on Windows | Console is cp1252; files are fine (UTF-8) | Ignore or print `.encode("ascii","replace")` |
| Highlighted caption words are wrong or missing | `KW` in `captions.js` ships empty / holds another video's words | Fill `KW` with this video's key words exactly as spoken (no trailing punctuation) |
| New character does nothing on `face()` / `wave()` / `blink()` | Its SVG lacks the part ids the helpers target | Follow the factory contract in `core.js` (viewBox 200×262, `#id-eyes…`, `#id-hL/-hR`) |
| Heredoc with nested quotes fails in bash | Quote nesting in `python - <<'EOF'` blocks with `'''` | Write the script to a file, then run it |
| Layout info `container_overflow` / `panel_out_of_canvas` / `content_overlap` | Intentional: stage scale punch, off-canvas slide-ins, a stamp on a number | Only act on real clipping seen in snapshots |
| Stamp hides the number it stamps | Same position | Place stamps over a card's lower edge, not the number |
| `npx hyperframes init` prints "npx not found" | Its skill-install sub-step | Project is created anyway; continue |

## Environment notes
- HyperFrames needs no sign-in; HeyGen music/voice are optional and unused here.
- The `.pydeps` / `TMPDIR` advice is cross-platform; commands are written for macOS/Linux shells, adapt quoting on Windows.
- Fonts need `@font-face` to files in the project (lint rule); bundled in `assets/template/fonts` (Fraunces, Inter — SIL OFL).
- GSAP is loaded from the CDN by default (`build_index.py --gsap` overrides); no music is bundled — supply `--bed` yourself and respect its licence.
- 60 fps, 35 s, 1080×1920 rendered in ~4.5 min on the first machine.
