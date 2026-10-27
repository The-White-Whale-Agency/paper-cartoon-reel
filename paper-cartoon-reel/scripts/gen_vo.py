"""One Edge-TTS call per SENTENCE (Edge inserts ~0.8s after every . ? so we cut there and re-join with short gaps).
Reads SCRIPT.md (spoken lines = 4-space-indented lines) -> assets/audio/vo.wav + vo_timing.json (scene starts, word times).
Usage: python gen_vo.py --voice <edge-tts voice id> [--project .] [--rate +12%] [--seg-gap 0.10] [--line-gap 0.22]
The voice is chosen per video (language, tone, brand); list ids with `edge-tts --list-voices`.
Needs a CURRENT edge-tts (old versions get HTTP 403): pip install --target <project>/.pydeps edge-tts"""
import sys, asyncio, json, pathlib, subprocess, re, argparse

ap = argparse.ArgumentParser()
ap.add_argument("--project", default=".")
ap.add_argument("--voice", required=True)
ap.add_argument("--rate", default="+12%")
ap.add_argument("--seg-gap", type=float, default=0.10, help="s between sentences inside a line")
ap.add_argument("--line-gap", type=float, default=0.22, help="s of air after each line (scene breath)")
A = ap.parse_args()
ROOT = pathlib.Path(A.project).resolve()
sys.path.insert(0, str(ROOT / ".pydeps"))
import edge_tts
VOICE, RATE, SEG_GAP, LINE_GAP = A.voice, A.rate, A.seg_gap, A.line_gap
LINES = re.findall(r"^    (.+)$", (ROOT / "SCRIPT.md").read_text(encoding="utf8"), re.M)
OUT = ROOT / "assets" / "audio"
TMP = ROOT / ".vo"
OUT.mkdir(parents=True, exist_ok=True); TMP.mkdir(exist_ok=True)
TRIM_END = "areverse,silenceremove=start_periods=1:start_threshold=-42dB:start_silence=0.03,areverse"


def split_sentences(t):
    return [s.strip() for s in re.findall(r"[^.?!:]+[.?!:]?", t) if s.strip()]


async def synth(path, text):
    com = edge_tts.Communicate(text, VOICE, rate=RATE, boundary="WordBoundary")
    words = []
    with open(path, "wb") as f:
        async for ch in com.stream():
            if ch["type"] == "audio":
                f.write(ch["data"])
            elif ch["type"] == "WordBoundary":
                words.append({"t": ch["text"], "s": ch["offset"] / 1e7, "d": ch["duration"] / 1e7})
    return words


def dur(p):
    return float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(p)]))


def sil(path, d):
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "lavfi", "-i", f"anullsrc=r=44100:cl=mono", "-t", str(d), str(path)], check=True)


async def main():
    scenes, t, parts = [], 0.0, []
    for i, line in enumerate(LINES):
        t_line, words = t, []
        segs = split_sentences(line)
        for j, seg in enumerate(segs):
            mp3, wav = TMP / f"l{i}_{j}.mp3", TMP / f"l{i}_{j}.wav"
            w = await synth(mp3, seg)
            subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(mp3), "-ac", "1", "-ar", "44100", "-af", TRIM_END, str(wav)], check=True)
            for x in w:  # Edge sometimes glues words ("auf Platz"): split proportionally by length
                parts_ = x["t"].split(); tot = sum(len(p) for p in parts_); o = x["s"]
                for p_ in parts_:
                    dd = x["d"] * len(p_) / tot
                    words.append({"t": p_, "s": round(t + o, 3), "e": round(t + o + dd, 3)}); o += dd
            parts.append(wav); t += dur(wav)
            gap = SEG_GAP if j < len(segs) - 1 else LINE_GAP
            g = TMP / f"g{i}_{j}.wav"; sil(g, gap); parts.append(g); t += gap
        scenes.append({"line": i + 1, "text": line, "start": round(t_line, 3), "dur": round(t - t_line, 3), "words": words})
    lst = TMP / "list.txt"
    lst.write_text("".join(f"file '{p.as_posix()}'\n" for p in parts))
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", str(lst), str(OUT / "vo.wav")], check=True)
    (ROOT / "vo_timing.json").write_text(json.dumps({"total": round(t, 3), "scenes": scenes}, ensure_ascii=False, indent=1), encoding="utf8")
    for s in scenes:
        print(s["line"], s["start"], s["dur"], len(s["words"]), s["text"].encode("ascii", "replace").decode())
    print("TOTAL", round(t, 2), "actual", dur(OUT / "vo.wav"))

asyncio.run(main())
