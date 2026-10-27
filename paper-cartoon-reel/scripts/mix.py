"""Synthesize SFX (numpy), place them from <project>/cues.py on the voice timeline, mix with VO (+ optional ducked music bed) -> assets/audio/mix.wav (-14 LUFS).
Usage: python mix.py [--project .] [--bed path/to/music.mp3] [--bed-start 8] [--bed-volume 0.34]"""
import argparse, importlib.util
import json, pathlib, subprocess, wave
import numpy as np

ap = argparse.ArgumentParser()
ap.add_argument("--project", default=".")
ap.add_argument("--bed")
ap.add_argument("--bed-start", type=float, default=8)
ap.add_argument("--bed-volume", type=float, default=.34)
A_ = ap.parse_args()
ROOT = pathlib.Path(A_.project).resolve()
SR = 48000
TM = json.load(open(ROOT / "vo_timing.json", encoding="utf8"))
SC = TM["scenes"]
TOTAL = TM["total"]
rng = np.random.default_rng(7)


def t_(d): return np.arange(int(SR * d)) / SR
def env(n, a=.002, tau=.05):
    t = np.arange(n) / SR; e = np.exp(-t / tau); e[:int(SR * a)] *= np.linspace(0, 1, int(SR * a)); return e
def lp(x, fc):
    a = 1 - np.exp(-2 * np.pi * fc / SR); y = np.empty_like(x); s = 0.0
    for i, v in enumerate(x): s += a * (v - s); y[i] = s
    return y
def hp(x, fc): return x - lp(x, fc)
def sweep(f0, f1, d, tau=.05, shape="sine"):
    t = t_(d); f = f0 * (f1 / f0) ** (t / d); ph = 2 * np.pi * np.cumsum(f) / SR
    w = np.sin(ph) if shape == "sine" else (2 / np.pi) * np.arcsin(np.sin(ph))
    return w * env(len(t), .002, tau)
def add(*a):
    n = max(len(x) for x in a); y = np.zeros(n)
    for x in a: y[:len(x)] += x
    return y
def noise(d): return rng.standard_normal(int(SR * d))

S = {}
S["pop"] = sweep(560, 190, .12, .035) * .9
S["pop_s"] = sweep(900, 400, .07, .02) * .6
S["boing"] = sweep(200, 520, .22, .09) * np.cos(2 * np.pi * 14 * t_(.22)) * .7
S["tick"] = hp(noise(.012), 2500) * env(int(SR * .012), .0005, .003) * .5
S["stamp"] = add(sweep(110, 48, .22, .07) * .9, lp(noise(.05), 1800) * env(int(SR * .05), .001, .012) * .8)
S["slam"] = add(sweep(95, 40, .38, .12) * 1.0, lp(noise(.1), 2200) * env(int(SR * .1), .001, .025) * .9)
S["slam_soft"] = S["slam"] * .55
n = int(SR * .45); x = lp(noise(.45), 3500) * np.sin(np.linspace(0, np.pi, n)) ** 1.5; S["whoosh"] = hp(x, 400) * .8
n = int(SR * .3); x = lp(noise(.3), 6000) * np.sin(np.linspace(0, np.pi, n)) ** 1.2; S["swish"] = hp(x, 900) * .7
n = int(SR * .6); x = lp(noise(.6), 900) * np.sin(np.linspace(0, np.pi, n)) ** 1.1; S["wind"] = x * 1.6
tt = t_(.7); S["ding"] = sum(a * np.sin(2 * np.pi * f * tt) for f, a in ((1320, 1), (1980, .45), (2640, .2))) * env(len(tt), .001, .16) * .5
tt = t_(1.2); S["chime"] = sum(a * np.sin(2 * np.pi * f * tt) for f, a in ((880, 1), (1320, .5), (1760, .25))) * env(len(tt), .002, .35) * .5
tt = t_(.55); f = np.linspace(430, 210, len(tt)); S["sad"] = (np.sin(2 * np.pi * np.cumsum(f * (1 + .02 * np.sin(2 * np.pi * 6 * tt))) / SR) + .3 * np.sin(4 * np.pi * np.cumsum(f) / SR)) * env(len(tt), .02, .3) * .35
fan = np.zeros(int(SR * .8))
for i, fr in enumerate((523, 659, 784, 1047)):
    seg = sweep(fr, fr, .22, .09, "tri") * .6; o = int(SR * .08 * i); fan[o:o + len(seg)] += seg[:len(fan) - o]
S["fanfare"] = fan * .9
n = int(SR * .7); S["splash"] = hp(lp(noise(.7), 7000), 700) * np.exp(-np.arange(n) / SR / .18) * .9
S["confetti"] = (hp(noise(.18), 1500) * env(int(SR * .18), .001, .05) * .6)[:int(SR * .18)]

W = lambda s, k: SC[s - 1]["words"][k]["s"]
T0 = lambda s: SC[s - 1]["start"]
cues = []
def c(t, name, db=-6): cues.append((t, name, db))
spec = importlib.util.spec_from_file_location("cues", ROOT / "cues.py"); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
mod.cues(c, W, T0, SC)

n = int((TOTAL + .6) * SR); bus = np.zeros(n)
for t, name, db in cues:
    x = S[name] * 10 ** (db / 20); o = int(t * SR)
    if o < 0 or o >= n: continue
    m_ = min(len(x), n - o); bus[o:o + m_] += x[:m_]
bus = np.clip(bus, -1, 1)
Aud = ROOT / "assets" / "audio"; Aud.mkdir(parents=True, exist_ok=True)
sfx_path = Aud / "sfx_bus.wav"
with wave.open(str(sfx_path), "wb") as w_:
    w_.setnchannels(1); w_.setsampwidth(2); w_.setframerate(SR); w_.writeframes((bus * 32767).astype("<i2").tobytes())
print("cues", len(cues), "bus", round(len(bus) / SR, 2), "s")

T = TOTAL
voice = f"highpass=f=80,equalizer=f=250:t=q:w=1:g=-1.5,equalizer=f=3200:t=q:w=1.2:g=2.2,acompressor=threshold=-24dB:ratio=3:attack=8:release=140:makeup=4,apad=whole_dur={T},atrim=0:{T}"
sf = f"atrim=0:{T},apad=whole_dur={T}"
if A_.bed:  # music ducked under the voice by sidechain compression
    mus = f"atrim=0:{T},afade=t=in:d=1.0,afade=t=out:st={T - 2.2:.2f}:d=2.2,volume={A_.bed_volume}"
    fc = (f"[0:a]{voice},asplit=2[v][vs];[1:a]{mus}[m0];[m0][vs]sidechaincompress=threshold=0.015:ratio=7:attack=20:release=450:makeup=1[md];"
          f"[2:a]{sf}[sf];[v][md][sf]amix=inputs=3:normalize=0:duration=first,alimiter=limit=0.95")
    ins = ["-i", str(Aud / "vo.wav"), "-ss", str(A_.bed_start), "-i", A_.bed, "-i", str(sfx_path)]
else:
    fc = f"[0:a]{voice}[v];[1:a]{sf}[sf];[v][sf]amix=inputs=2:normalize=0:duration=first,alimiter=limit=0.95"
    ins = ["-i", str(Aud / "vo.wav"), "-i", str(sfx_path)]
subprocess.run(["ffmpeg", "-v", "error", "-y", *ins, "-filter_complex", fc, "-ar", "48000", "-ac", "2", str(Aud / "mix_pre.wav")], check=True)
m = subprocess.run(["ffmpeg", "-hide_banner", "-i", str(Aud / "mix_pre.wav"), "-af", "loudnorm=I=-14:TP=-1:LRA=9:print_format=json", "-f", "null", "-"], capture_output=True, text=True).stderr
j = json.loads(m[m.rindex("{"):m.rindex("}") + 1])
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(Aud / "mix_pre.wav"), "-af",
                f"loudnorm=I=-14:TP=-1:LRA=9:measured_I={j['input_i']}:measured_TP={j['input_tp']}:measured_LRA={j['input_lra']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true,aresample=48000",
                "-ar", "48000", "-ac", "2", str(Aud / "mix.wav")], check=True)
out = subprocess.run(["ffmpeg", "-hide_banner", "-i", str(Aud / "mix.wav"), "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True).stderr
print([l.strip() for l in out.splitlines() if l.strip().startswith(("I:", "Peak:"))][-2:])
