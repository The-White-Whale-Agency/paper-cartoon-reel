# example-reel

Source of the first reel built with this pipeline (a German explainer about a website that brings no customers). It is kept **only to show the file formats and the code structure** of a finished project:

| File | Shows |
|---|---|
| `BRIEF.md`, `SCRIPT.md`, `STORYBOARD.md` | the planning documents (`SCRIPT.md` spoken lines are the 4-space-indented ones) |
| `scenes.js` | one IIFE per scene, reveals timed with `W(n,k)`, props from `art.js` |
| `character.js` | a finished character factory following the contract in `references/look-and-motion.md`, plus an example brand hero |
| `palette.css` | a finished `:root` palette block |
| `cues.py` | the sound cue sheet read by `scripts/mix.py` |

Do not copy from it into a new video:
- its **opening line is a deliberately weak example** (an introduction of the character is not a hook; see `references/marketing-and-hooks.md`);
- its **character and palette** belong to that reel (every new video gets its own);
- its story, wording and brand scene are specific to that client.

To try the pipeline end to end, copy `template/*` and these files into a fresh HyperFrames project, paste `palette.css` over the `:root` block, and follow `SKILL.md`.
