"""vo_timing.json -> timing.js + index.html (scene clips, captions clip, mixed audio, script order).
Usage: python build_index.py [--project .] [--width 1080] [--height 1920] [--title "My reel"]
Re-run after every gen_vo.py. The timeline is registered inline because lint only sees inline registration."""
import argparse, json, pathlib

ap = argparse.ArgumentParser()
ap.add_argument("--project", default=".")
ap.add_argument("--width", type=int, default=1080)
ap.add_argument("--height", type=int, default=1920)
ap.add_argument("--title", default="Cartoon Reel")
ap.add_argument("--lang", default="en", help="html lang attribute: language of the voice-over (e.g. en, de, ru)")
ap.add_argument("--gsap", default="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js", help="GSAP URL or local path (the blank hyperframes template also uses the CDN)")
A = ap.parse_args()
R = pathlib.Path(A.project).resolve()
d = json.load(open(R / "vo_timing.json", encoding="utf8"))
(R / "timing.js").write_text("window.TIMING=" + json.dumps(d, ensure_ascii=False) + ";\n", encoding="utf8")
sc = "\n".join(
    f'      <div id="sc{i + 1}" class="clip scene" data-start="{x["start"]}" data-duration="{x["dur"]}" data-track-index="{i + 1}"></div>'
    for i, x in enumerate(d["scenes"]))
html = f"""<!doctype html>
<html lang="{A.lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width={A.width}, height={A.height}" />
    <title>{A.title}</title>
    <link rel="stylesheet" href="style.css" />
    <script src="{A.gsap}"></script>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="{d["total"]}" data-width="{A.width}" data-height="{A.height}">
{sc}
      <div id="caps" class="clip" data-start="0" data-duration="{d["total"]}" data-track-index="20"></div>
      <audio id="mix" src="assets/audio/mix.wav" data-start="0" data-duration="{d["total"]}" data-track-index="30" data-volume="1"></audio>
    </div>
    <script src="timing.js"></script>
    <script src="art.js"></script>
    <script src="character.js"></script>
    <script src="core.js"></script>
    <script src="scenes.js"></script>
    <script src="captions.js"></script>
    <script>
      window.__timelines = window.__timelines || {{}};
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
"""
(R / "index.html").write_text(html, encoding="utf8")
print("timing.js + index.html written;", len(d["scenes"]), "scenes,", d["total"], "s")
