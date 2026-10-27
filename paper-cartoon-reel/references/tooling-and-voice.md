# Tooling, voice and sound

## Sweep of installed skills, plugins and MCP tools (Phase 1)

Goal: make the reel better than this skill alone could. Read the available-skills list and MCP tool names; shortlist anything relevant. No fixed list, no fixed order, no limit:

| Need | Look for (any installed skill/plugin/MCP) |
|---|---|
| Who/why/what to say | marketing strategy, audience and competitor research, positioning, psychology, content strategy |
| Hook, script, caption | hooks, copywriting, reels/short-video scripting, social post writers, humanizers, translation/localisation |
| Look | design, brand, motion/animation principles, image generation, colour/type accessibility |
| Build | the video framework docs (HyperFrames), animation libraries (GSAP), docs tools (Context7) |
| Sound | earshot (below), audio/music tools |
| Check | video analysis, virality/retention predictors, reviewers, QA, analytics |
| Ship | scheduling/publishing tools — only if the user asks to publish |

Rules:
- Use several; use one more than once if a later phase needs it (e.g. a copy skill for the script, again for the caption).
- Write each use into `PLAN.md` ("skill → output → what changed").
- If a tool needs auth or credit, say so and ask before spending anything. Never publish or post without an explicit request.
- A skill's output is input to your judgment, not an order: keep what serves the one goal and the one action.

## Rendering: HyperFrames only

The reel is assembled, checked and rendered with `npx hyperframes` (`init`, `lint`, `check --json`, `snapshot`, `preview`, `render`). Other video tools in the environment (Motion, AI video generators such as Higgsfield, Figma video export, editors, ffmpeg) are not used to build or render the reel; at most they supply assets for it (an image, a sound, a reference clip) which are imported into the HyperFrames composition. For HyperFrames details load its own skills (`hyperframes`, `hyperframes-cli`, `media-use`) or run `npx hyperframes docs <topic>`; for GSAP/library docs use Context7 if installed.

## Sound with earshot

earshot gives you ears (it measures and describes audio locally). It is available as the `earshot` MCP server when installed; load its skill and follow its loops. If the MCP tools are missing, look for an earshot checkout (the user keeps one at `~/Projects/earshot`) and run `<venv>/bin/python -m earshot doctor`. If earshot is not installed at all, fall back to `scripts/mix.py` and say sound was verified by measurement with ffmpeg only.

Use it to:
1. **Pick/make SFX** — `sfx_list` / `sfx_render` (shipped bank, aimed with `dur`, `apex`, `pitch`) or `kit_render` for the whole reel's kit with measured onset/peak per take. This replaces or supplements the numpy recipes in `mix.py`.
2. **Choose music/ambience** — `rank` candidates, `find` the best moment; `realness` when real recordings are required.
3. **Verify the mix** — `timeline` with `--video`/`--cues` (does each hit land on its cue frame, is the voice clear), `measure` (LUFS/true peak), `ab` after any change, `critique` for a scorecard. Quote the numbers in the delivery report.
4. `llm_critique` uploads audio to a third party: only with the user's explicit consent.

If you use earshot takes instead of `mix.py`'s synth, still place them from the same cue sheet on the `vo_timing.json` timeline, duck music under the voice, and end at -14 LUFS, peak ≤ -1 dBTP. Music: none is bundled; use only what the user supplies or what is licensed for the use, and record the licence in `PLAN.md`.

## Voice

The agent chooses the voice and the provider for each video (language, tone, character, brand, what is installed or available). The only fixed part is what the build needs from any provider: `assets/audio/vo.wav` plus `vo_timing.json`:

```json
{"total": 31.2, "scenes": [{"line": 1, "text": "...", "start": 0.0, "dur": 3.4,
  "words": [{"t": "word", "s": 0.12, "e": 0.40}, ...]}]}
```

`s`/`e` are seconds on the final joined audio; there is one scene per spoken line of `SCRIPT.md`. `scripts/gen_vo.py --voice <id>` produces this with Edge TTS (free, no key, word timestamps built in). A provider without word timestamps needs a forced-alignment step to produce the `words`. HyperFrames itself offers `tts`, `transcribe` (Whisper word timestamps), `beats` and `normalize-audio` (see its `media-use` skill); any of them is a valid way to produce the same two files. After every voice run check word counts per scene (`len(text.split())` vs `len(words)`).

Do not call a voice "natural" or "good" unless the user has heard it; earshot can only report measurements. Offer 2–3 sample lines when the voice matters.
