/* Example scenes (Alex & the website that brings nothing). Replace with your own story; keep the helper calls. */
/* =============== SCENE 1 — Alex =============== */
(function () {
  const n = 1, st = scene(n), t0 = T0(n);
  paper(st, "var(--light)", "dots");
  mk(st, `<div class="ring" style="left:-160px;top:1000px;width:520px;height:520px"></div>`);
  mk(st, `<div class="ring" style="left:760px;top:560px;width:460px;height:460px"></div>`);
  hdr(st, n, "DAS IST ALEX");
  // plant
  mk(st, `<svg class="abs" style="left:40px;top:1030px" width="170" height="240" viewBox="0 0 170 240"><g fill="#6f9a6a"><path d="M85 190 Q40 120 50 60 Q86 100 85 190Z"/><path d="M85 190 Q85 90 110 24 Q140 90 85 190Z" fill="#82ad7a"/><path d="M85 190 Q120 130 150 90 Q142 150 85 190Z"/></g><path d="M40 190 H130 L118 240 H52Z" fill="#c9825a"/><rect x="36" y="184" width="98" height="14" rx="6" fill="#d89570"/></svg>`);
  // monitor + site
  const stand = mk(st, `<div class="abs" style="left:700px;top:1020px;width:80px;height:210px;background:#8b7d63;border-radius:6px"></div>`);
  const base = mk(st, `<div class="abs" style="left:620px;top:1214px;width:240px;height:38px;background:#7a6d55;border-radius:12px"></div>`);
  const win = at(mk(st, siteWin("s1win", 540, 400, "clean")), 480, 620, 1.2);
  gsap.set(win, { transformOrigin: "50% 100%" });
  // desk
  mk(st, `<div class="abs" style="left:40px;top:1250px;width:1000px;height:46px;background:#c79c6e;border-radius:14px;box-shadow:0 8px 0 rgba(60,40,15,.18)"></div>`);
  mk(st, `<div class="abs" style="left:70px;top:1296px;width:940px;height:150px;background:#a97c52"></div>`);
  mk(st, `<div class="abs" style="left:150px;top:1330px;width:300px;height:80px;border-radius:10px;background:#9a6f48"></div><div class="abs" style="left:610px;top:1330px;width:300px;height:80px;border-radius:10px;background:#9a6f48"></div>`);
  mk(st, `<div class="abs" style="left:255px;top:1362px;width:90px;height:14px;border-radius:7px;background:#e3c9a0"></div><div class="abs" style="left:715px;top:1362px;width:90px;height:14px;border-radius:7px;background:#e3c9a0"></div>`);
  // mug
  const mug = mk(st, `<svg class="abs" style="left:420px;top:1160px" width="110" height="100" viewBox="0 0 110 100"><rect x="10" y="20" width="70" height="72" rx="10" fill="#fffaf0"/><path d="M80 36 Q108 38 100 62 Q94 74 80 72" stroke="#fffaf0" stroke-width="10" fill="none"/><rect x="10" y="20" width="70" height="14" rx="7" fill="#ecb085"/></svg>`);
  // Alex
  const a = character(st, "a1", 110, 835, 1.55, { acc: ["glasses", "tie"] });
  // timeline
  tl.fromTo(a, { y: 520, opacity: 0, scaleY: 1.25, scaleX: .8 }, { y: 0, opacity: 1, scaleX: 1, scaleY: 1, duration: .55, ease: "back.out(1.9)" }, t0 + .1);
  pop(win, W(1, 3) - .05, .5, .1);
  tl.fromTo([stand, base], { opacity: 0 }, { opacity: 1, duration: .2 }, W(1, 3) - .05);
  pop(mug, t0 + .4, .35);
  look("a1", 10, W(1, 3));
  blink("a1", t0 + 1.3); face("a1", "h", W(1, 6)); look("a1", 0, W(1, 6));
  wave("a1", "R", t0 + .75, 3);
  hop(a, W(1, 2), 40);
  idle(a, t0 + 1.4, t0 + SC[0].dur, 4);
})();

/* =============== SCENE 2 — Null =============== */
(function () {
  const n = 2, st = scene(n), t0 = T0(n);
  paper(st, "#dfe3df", "dots");
  mk(st, `<div class="ring" style="left:700px;top:1100px;width:520px;height:520px"></div>`);
  hdr(st, n, "KEINE KUNDEN");
  const labels = ["BESUCHER", "ANFRAGEN", "REAKTIONEN"], ks = [0, 2, 4], nulls = [1, 3, 6];
  labels.forEach((lab, i) => {
    const c = at(mk(st, counterCard("c2" + i, lab, 310, 270, "0", false, 140)), 40 + i * 345, 440, i === 1 ? 1.2 : i === 0 ? -1.8 : 2);
    drop(c, W(2, ks[i]) - .08, -340, .5);
    const sp = at(mk(st, `<div class="stamp red sm">NULL</div>`), 82 + i * 345, 636, -10 + i * 8);
    stamp(sp, W(2, nulls[i]) - .02, -10 + i * 8, st, 12);
    tl.to(c, { keyframes: [{ rotation: i === 1 ? 4 : 3, duration: .05 }, { rotation: i === 1 ? 1.2 : i === 0 ? -1.8 : 2, duration: .14 }] }, W(2, nulls[i]));
  });
  mk(st, `<div class="abs" style="left:330px;top:1334px;width:420px;height:26px;border-radius:50%;background:rgba(60,40,15,.18)"></div>`);
  const a = character(st, "a2", 405, 990, 1.35, { acc: ["glasses", "tie"] });
  rise(a, t0 + .1, 420, .5);
  look("a2", -9, t0 + .6); look("a2", 9, t0 + 1.2); look("a2", 0, t0 + 1.7);
  blink("a2", t0 + 2.3);
  face("a2", "s", W(2, 3)); arms(`a2`, W(2, 5) - .05, .2); tl.to(a, { rotation: 3, duration: .25 }, W(2, 5));
  const tw = mk(st, `<div class="abs" style="left:-200px;top:1180px;width:150px;height:150px">${ICON.tumble}</div>`);
  tl.fromTo(tw, { x: 0, rotation: 0 }, { x: 1500, rotation: 900, duration: SC[1].dur - (W(2, 4) - t0) - .1, ease: "none" }, W(2, 4));
  tl.to(tw, { y: -44, duration: .28, repeat: 7, yoyo: true, ease: "sine.inOut" }, W(2, 4));
})();

/* =============== SCENE 3 — Nur ein Bild =============== */
(function () {
  const n = 3, st = scene(n), t0 = T0(n);
  paper(st, "linear-gradient(#e8dcc2 0 1180px,#b08a63 1180px)");
  paper(st, "repeating-linear-gradient(90deg,rgba(120,90,50,.06) 0 40px,transparent 40px 80px)");
  mk(st, `<div class="abs" style="left:0;top:1160px;width:100%;height:28px;background:#9c7650;box-shadow:0 6px 0 rgba(60,40,15,.2)"></div>`);
  mk(st, `<div class="abs" style="left:0;top:1190px;width:100%;height:730px;background:repeating-linear-gradient(90deg,rgba(60,40,15,.14) 0 3px,transparent 3px 150px)"></div>`);
  hdr(st, n, "NUR EIN BILD");
  // frame hanging
  const fr = mk(st, `<div class="abs" style="left:250px;top:420px;width:580px;height:490px"><svg class="abs" style="left:0;top:-70px" width="580" height="90"><path d="M70 70 L290 0 L510 70" stroke="#6c5c3a" stroke-width="5" fill="none"/><circle cx="290" cy="0" r="9" fill="#6c5c3a"/></svg>
    <div class="abs" style="left:0;top:0;width:580px;height:490px;border-radius:12px;background:linear-gradient(135deg,#e6bd55,#c99a2e);box-shadow:0 12px 0 rgba(60,40,15,.2),0 28px 40px rgba(60,40,15,.25)"></div>
    <div class="abs" style="left:28px;top:28px;width:524px;height:434px;background:#fffaf0"></div></div>`);
  const pic = mk(fr, siteWin("s3win", 524, 434, "clean")); pic.style.left = "28px"; pic.style.top = "28px"; pic.style.boxShadow = "none"; pic.style.borderRadius = "0";
  gsap.set(fr, { transformOrigin: "50% -70px" });
  tl.fromTo(fr, { y: -700, opacity: 0, rotation: 8 }, { y: 0, opacity: 1, rotation: 0, duration: .9, ease: "elastic.out(1,.45)" }, t0 + .05);
  const plate = at(mk(st, `<div class="card" style="width:330px;height:62px;background:#fffaf0"><div class="abs tcenter" style="left:0;top:0;width:100%;line-height:62px;font:700 28px Inter;color:#6a5d47;letter-spacing:.02em">Website.jpg</div></div>`), 375, 950, -1.5);
  pop(plate, W(3, 7) - .1, .35, .4);
  const sp = at(mk(st, `<div class="stamp red">FEHLER</div>`), 270, 590, -11);
  stamp(sp, W(3, 1), -11, st, 16);
  const a = character(st, "a3", 50, 910, 1.2, { acc: ["glasses", "tie"] });
  rise(a, t0 + .2, 420, .5);
  face("a3", "s", t0 + .2); tl.to(a, { rotation: -3, duration: .3 }, W(3, 1) + .1);
  blink("a3", t0 + 1.8);
  const cols = ["#d5e3e8", "#ecb085", "#9bc3a2"];
  [0, 1, 2].forEach(i => {
    const w = mk(st, `<div class="abs" style="left:-220px;top:${1210 + i * 18}px;width:${124}px;height:${162}px">${characterSVG("w3" + i, { shirt: cols[i], k: .62, acc: i === 1 ? ["cap"] : i === 2 ? ["explorer"] : [] })}</div>`);
    const s0 = W(3, 3) + i * .38, d = 1.9;
    tl.fromTo(w, { x: 0 }, { x: 1520, duration: d, ease: "none" }, s0);
    tl.to(w, { y: -14, duration: .17, repeat: Math.floor(d / .17) - 1, yoyo: true, ease: "sine.inOut" }, s0);
  });
})();

/* =============== SCENE 4 — Mitarbeiter =============== */
(function () {
  const n = 4, st = scene(n), t0 = T0(n);
  paper(st, "linear-gradient(#f7e4b8,#f4ebd8 70%)");
  const night = paper(st, "linear-gradient(#142330,#26384a 70%)"); gsap.set(night, { opacity: 0 });
  mk(st, `<div class="abs dots" style="inset:0"></div>`);
  const stars = mk(st, `<div class="abs" style="inset:0">${Array.from({ length: 22 }, (_, i) => `<div class="abs" style="left:${30 + rnd(i) * 1000}px;top:${320 + rnd(i + 3) * 700}px;width:${5 + rnd(i + 9) * 6}px;height:${5 + rnd(i + 9) * 6}px;border-radius:50%;background:#f4ebd8"></div>`).join("")}</div>`); gsap.set(stars, { opacity: 0 });
  const sun = at(mk(st, `<div class="abs" style="width:240px;height:240px">${ICON.sun}</div>`), 60, 330);
  const moon = at(mk(st, `<div class="abs" style="width:200px;height:200px">${ICON.moon}</div>`), 800, 340); gsap.set(moon, { opacity: 0 });
  hdr(st, n, "ARBEITET 24/7");
  const ground = mk(st, `<div class="abs" style="left:0;top:1290px;width:100%;height:630px;background:#b08a63"></div><div class="abs" style="left:0;top:1290px;width:100%;height:630px;background:repeating-linear-gradient(90deg,rgba(60,40,15,.14) 0 3px,transparent 3px 150px)"></div>`);
  const dim = mk(st, `<div class="abs" style="left:0;top:0;width:100%;height:100%;background:rgba(10,20,40,.38);opacity:0"></div>`);
  // counter
  const cc = at(mk(st, counterCard("c4", "ANFRAGEN", 380, 270, "0", false, 140)), 350, 600, 0);
  drop(cc, t0 + .2, -300, .5);
  // bed + sleeping Alex
  mk(st, `<div class="abs" style="left:14px;top:1222px;width:560px;height:44px;background:#8a5f3d;border-radius:10px"></div><div class="abs" style="left:22px;top:1040px;width:50px;height:250px;background:#8a5f3d;border-radius:12px"></div><div class="abs" style="left:48px;top:1160px;width:526px;height:70px;background:#fffaf0;border-radius:18px 18px 8px 8px"></div>`);
  const sl = character(st, "a4", 100, 960, 1.2, { acc: ["sleepcap"] });
  gsap.set(sl, { rotation: -90, transformOrigin: "50% 50%" }); face("a4", "z", 0);
  mk(st, `<div class="abs" style="left:290px;top:1096px;width:290px;height:140px;background:#7f9db0;border-radius:14px 8px 8px 14px;box-shadow:0 6px 0 rgba(0,0,0,.14)"></div><div class="abs" style="left:290px;top:1096px;width:290px;height:20px;background:rgba(255,255,255,.25);border-radius:14px"></div>`);
  ["z", "Z", "Z"].forEach((ch, i) => {
    const z = mk(st, `<div class="abs serif" style="left:${130 + i * 46}px;top:${930 - i * 72}px;font:italic 800 ${48 + i * 14}px Fraunces;color:#6f8ea1;opacity:0">${ch}</div>`);
    tl.fromTo(z, { y: 40, opacity: 0 }, { y: -40, opacity: 1, duration: 1.1, repeat: 2, ease: "sine.inOut", repeatDelay: 0 }, t0 + .3 + i * .45);
  });
  // desk + website worker
  mk(st, `<div class="abs" style="left:560px;top:1196px;width:490px;height:44px;background:#d5ab7a;border-radius:12px;box-shadow:0 8px 0 rgba(60,40,15,.2)"></div><div class="abs" style="left:590px;top:1240px;width:430px;height:170px;background:#a97c52"></div>`);
  const wk = mk(st, `<div class="abs" style="left:${600 / 1.3}px;top:${884 / 1.3}px;width:280px;height:270px;zoom:1.3"></div>`);
  mk(wk, `<div class="abs" style="left:46px;top:206px;width:26px;height:50px;background:#c39670;border-radius:3px"></div><div class="abs" style="left:127px;top:206px;width:26px;height:50px;background:#c39670;border-radius:3px"></div><div class="abs" style="left:208px;top:206px;width:26px;height:50px;background:#c39670;border-radius:3px"></div>`);
  const wwin = mk(wk, siteWin("s4win", 280, 214, "clean")); wwin.style.left = "0"; wwin.style.top = "0";
  mk(wk, `<div class="abs" style="left:68px;top:82px;width:24px;height:40px;background:#2a2622;border-radius:3px"></div><div class="abs" style="left:188px;top:82px;width:24px;height:40px;background:#2a2622;border-radius:3px"></div><div class="abs" style="left:96px;top:140px;width:88px;height:14px;border-radius:7px;background:#2a2622"></div>`);
  const hl = mk(wk, `<div class="abs" style="left:-24px;top:130px;width:32px;height:32px;background:#c39670;transform:rotate(45deg)"></div>`), hr = mk(wk, `<div class="abs" style="left:272px;top:130px;width:32px;height:32px;background:#c39670;transform:rotate(45deg)"></div>`);
  mk(wk, `<div class="tag" style="left:70px;top:222px;background:#d9824f">WEBSITE</div>`);
  pop(wk, t0 + .3, .5, .2); gsap.set(wk, { transformOrigin: "50% 100%" });
  tl.to(hl, { y: -16, duration: .12, repeat: 25, yoyo: true, ease: "sine.inOut" }, t0 + .9); tl.to(hr, { y: 12, duration: .12, repeat: 25, yoyo: true, ease: "sine.inOut" }, t0 + .96);
  tl.to(wk, { y: -6, duration: .2, repeat: 15, yoyo: true, ease: "sine.inOut" }, t0 + .9);
  // envelopes -> counter
  const nEnv = 6, vals = [2, 4, 6, 8, 10, 12];
  for (let i = 0; i < nEnv; i++) {
    const e = mk(st, `<div class="abs" style="left:790px;top:990px;width:84px;height:58px;background:#fffaf0;border-radius:6px;box-shadow:0 4px 0 rgba(0,0,0,.18);opacity:0"><svg width="84" height="58" viewBox="0 0 84 58"><path d="M2 4 L42 34 L82 4" stroke="#d9824f" stroke-width="5" fill="none"/></svg></div>`);
    const ts = t0 + .85 + i * .5;
    tl.set(e, { opacity: 1 }, ts);
    tl.to(e, { keyframes: [{ x: -90, y: -170, rotation: -14, duration: .26, ease: "power2.out" }, { x: -250, y: -250, scale: .5, opacity: 0, rotation: 6, duration: .24, ease: "power2.in" }] }, ts);
    tl.fromTo("#c4-n", { textContent: i * 2 }, { textContent: vals[i], duration: .12, snap: { textContent: 1 } }, ts + .52);
    tl.to(cc, { keyframes: [{ scale: 1.06, duration: .06 }, { scale: 1, duration: .1 }] }, ts + .52);
  }
  // day -> night -> day
  tl.to(night, { opacity: 1, duration: .45 }, W(4, 7) - .05); tl.to(stars, { opacity: 1, duration: .45 }, W(4, 7)); tl.to(dim, { opacity: 1, duration: .45 }, W(4, 7) - .05);
  tl.to(sun, { y: 380, opacity: 0, duration: .4, ease: "power2.in" }, W(4, 7) - .1); tl.to(moon, { opacity: 1, duration: .4 }, W(4, 7) + .1);
  tl.to(night, { opacity: 0, duration: .35 }, W(4, 10) - .05); tl.to(stars, { opacity: 0, duration: .3 }, W(4, 10) - .05); tl.to(dim, { opacity: 0, duration: .35 }, W(4, 10) - .05);
  tl.to(moon, { y: 300, opacity: 0, duration: .35, ease: "power2.in" }, W(4, 10) - .1); tl.fromTo(sun, { y: 380, opacity: 0 }, { y: 0, opacity: 1, duration: .45, ease: "back.out(1.6)" }, W(4, 10));
  tl.to(sun, { rotation: 360, duration: 1.1, ease: "none", transformOrigin: "50% 50%" }, t0 + .2);
})();

/* =============== SCENE 5 — SEO =============== */
(function () {
  const n = 5, st = scene(n), t0 = T0(n);
  paper(st, "var(--light)", "dots");
  mk(st, `<div class="ring" style="left:-200px;top:1160px;width:520px;height:520px"></div>`);
  hdr(st, n, "PLATZ 1 BEI GOOGLE");
  const bar = at(mk(st, `<div class="card" style="width:900px;height:104px;border-radius:52px"><svg class="abs" style="left:34px;top:26px" width="52" height="52" viewBox="0 0 52 52"><circle cx="22" cy="22" r="16" stroke="#8b7d63" stroke-width="7" fill="none"/><path d="M34 34 L48 48" stroke="#8b7d63" stroke-width="8" stroke-linecap="round"/></svg><div class="abs" style="left:112px;top:0;line-height:104px;font:600 42px Inter;color:#4a4235;white-space:nowrap" id="q5"></div></div>`), 90, 340);
  drop(bar, t0 + .1, -240, .5);
  const q = "beste Lösung in meiner Nähe", qEl = document.getElementById("q5");
  [...q].forEach((ch, i) => { const s = mk(qEl, `<span style="opacity:0;white-space:pre">${ch}</span>`); tl.set(s, { opacity: 1 }, t0 + .35 + i * .035); });
  const STEP = 118, TOP = 520, slotY = s => TOP + s * STEP;
  const greys = [];
  const names = ["handwerk-profi.de", "meister-online.net", "branchenbuch24.de", "dienste-vergleich.com", "portal-finder.de"];
  for (let i = 0; i < 5; i++) {
    const r = at(mk(st, `<div class="card" style="width:900px;height:106px;border-radius:18px"><div class="abs" style="left:26px;top:28px;width:50px;height:50px;border-radius:50%;background:#cfc4ad"></div><div class="abs" style="left:100px;top:22px;font:700 24px Inter;color:#8b7d63">${names[i]}</div><div class="bar" style="left:100px;top:58px;width:${380 + i * 50}px;height:20px"></div><div class="bar" style="left:100px;top:84px;width:${220 + i * 30}px;height:10px;opacity:.6"></div></div>`), 90, slotY(i));
    greys.push(r);
    tl.fromTo(r, { x: 1100, opacity: 0 }, { x: 0, opacity: 1, duration: .45, ease: "back.out(1.3)" }, t0 + .5 + i * .07);
  }
  const ar = at(mk(st, `<div class="card" style="width:900px;height:106px;border-radius:18px;background:linear-gradient(90deg,#fff1de,#fffaf0);outline:6px solid #d9824f"><div class="abs tcenter" style="left:20px;top:18px;width:70px;height:70px;border-radius:50%;background:#d9824f;color:#fff;font:900 36px/70px Inter"><span>#</span><span id="r5-n">6</span></div><div class="abs" style="left:112px;top:20px;font:800 30px Inter;color:#d9824f">alex-service.de</div><div class="bar" style="left:112px;top:62px;width:520px;height:22px;background:#3a342c"></div><div class="bar" style="left:112px;top:90px;width:300px;height:8px;opacity:.6"></div></div>`), 90, slotY(5));
  tl.fromTo(ar, { x: -1100, opacity: 0 }, { x: 0, opacity: 1, duration: .5, ease: "back.out(1.3)" }, t0 + .75);
  // rank + climb
  tl.fromTo("#r5-n", { textContent: 6 }, { textContent: 4, duration: .4, snap: { textContent: 1 } }, W(5, 1)); tl.to(ar, { y: slotY(3) - slotY(5), duration: .5, ease: "back.out(1.4)" }, W(5, 1));
  tl.to(greys[4], { y: slotY(5) - slotY(4), duration: .4 }, W(5, 1) + .05); tl.to(greys[3], { y: slotY(4) - slotY(3), duration: .4 }, W(5, 1) + .05);
  tl.fromTo("#r5-n", { textContent: 4 }, { textContent: 2, duration: .4, snap: { textContent: 1 } }, W(5, 3)); tl.to(ar, { y: slotY(1) - slotY(5), duration: .5, ease: "back.out(1.4)" }, W(5, 3));
  tl.to(greys[2], { y: slotY(3) - slotY(2), duration: .4 }, W(5, 3) + .05); tl.to(greys[1], { y: slotY(2) - slotY(1), duration: .4 }, W(5, 3) + .05);
  tl.fromTo("#r5-n", { textContent: 2 }, { textContent: 1, duration: .25, snap: { textContent: 1 } }, W(5, 8)); tl.to(ar, { y: slotY(0) - slotY(5), duration: .5, ease: "back.out(1.6)" }, W(5, 8));
  tl.to(greys[0], { y: slotY(1) - slotY(0), duration: .4 }, W(5, 8) + .05);
  const medal = at(mk(st, `<div class="abs" style="width:170px;height:220px">${ICON.medal}</div>`), 830, 430, 10);
  tl.fromTo(medal, { y: -420, opacity: 0, scale: 1.6 }, { y: 0, opacity: 1, scale: 1, duration: .45, ease: "bounce.out" }, W(5, 9) - .05);
  shake(st, W(5, 9) + .3, 12); confetti(st, W(5, 9) + .25, 880, 560, 22, 700);
  // Alex with magnifier
  const a = character(st, "a5", 70, 1240, .85, { acc: ["explorer"] });
  const mg = at(mk(st, `<div class="abs" style="width:150px;height:170px">${ICON.mag}</div>`), 190, 1170); gsap.set(mg, { transformOrigin: "30% 100%", rotation: -10 });
  rise([a, mg], t0 + .3, 380, .5);
  tl.to(mg, { rotation: 12, duration: .5, repeat: 5, yoyo: true, ease: "sine.inOut" }, t0 + .9);
  face("a5", "h", W(5, 8)); hop(a, W(5, 9), 40); arms("a5", W(5, 9) + .05);
  blink("a5", t0 + 1.6);
})();

/* =============== SCENE 6 — Design =============== */
(function () {
  const n = 6, st = scene(n), t0 = T0(n);
  paper(st, "var(--light)", "dots");
  mk(st, `<div class="ring" style="left:700px;top:700px;width:560px;height:560px"></div>`);
  hdr(st, n, "KLAR &amp; VERTRAUENSWÜRDIG").style.fontSize = "60px";
  const messy = at(mk(st, siteWin("s6m", 620, 500, "messy", "alex-service.de")), 230, 440, 4);
  tl.fromTo(messy, { y: -700, opacity: 0, rotation: -12 }, { y: 0, opacity: 1, rotation: 4, duration: .6, ease: "back.out(1.5)" }, t0 + .15);
  tl.to(messy, { rotation: 6, duration: .09, repeat: 5, yoyo: true }, t0 + .9);
  tl.to(messy, { x: -1300, y: 120, rotation: -46, duration: .45, ease: "power2.in" }, W(6, 2) - .1);
  const clean = at(mk(st, siteWin("s6c", 620, 500, "clean", "alex-service.de")), 230, 440, -1.5);
  pop(clean, W(6, 2) + .25, .55, .35);
  const sheen = mk(clean, `<div class="sheen"></div>`); tl.fromTo(sheen, { x: -700 }, { x: 700, duration: .8, ease: "power2.inOut" }, W(6, 2) + .55);
  // feature cards
  const feats = [{ k: 3, ic: ICON.stopwatch("#d9824f"), t: "SCHNELL" }, { k: 4, ic: ICON.phone("#7f9db0"), t: "MOBIL" }, { k: 6, ic: ICON.stars("#e3b73e"), t: "VERTRAUEN" }];
  feats.forEach((f, i) => {
    const c = at(mk(st, `<div class="card" style="width:310px;height:222px"><div class="abs" style="left:105px;top:16px;width:100px;height:100px">${f.ic}</div><div class="abs tcenter" style="left:0;top:136px;width:100%;font:900 38px Inter;letter-spacing:.06em;color:#3a342c">${f.t}</div></div>`), 40 + i * 345, 1000, i === 0 ? -2 : i === 1 ? 1 : -1);
    rise(c, W(6, f.k) - .1, 360, .5);
    const ck = at(mk(st, `<div class="abs" style="width:78px;height:78px">${ICON.check("#5f9b6e")}</div>`), 40 + i * 345 + 250, 984);
    pop(ck, W(6, f.k) + .22, .35, .2);
  });
  // cursor click
  const cur = mk(st, `<div class="abs" style="left:0;top:0;width:90px;height:110px">${ICON.cursor}</div>`);
  const bx = 230 + 37, by = 440 + 60 + 138, tx = bx + 93 - 8, ty = by + 34 - 4;
  tl.fromTo(cur, { x: 1000, y: 1250, opacity: 0 }, { x: tx, y: ty, opacity: 1, duration: .5, ease: "power3.out" }, W(6, 10) - .3);
  tl.to(cur, { scale: .82, duration: .07, yoyo: true, repeat: 1, transformOrigin: "10% 5%" }, W(6, 11) - .05);
  const rip = mk(st, `<div class="abs" style="left:${bx + 93 - 60}px;top:${by + 34 - 60}px;width:120px;height:120px;border-radius:50%;border:8px solid #d9824f;opacity:0"></div>`);
  tl.fromTo(rip, { scale: .2, opacity: .9 }, { scale: 2.2, opacity: 0, duration: .5, ease: "power2.out" }, W(6, 11));
  const plus = at(mk(st, `<div class="tag" style="background:#5f9b6e;font-size:34px;padding:14px 22px">+1 ANFRAGE</div>`), bx + 20, by - 40);
  tl.fromTo(plus, { y: 0, opacity: 0, scale: .5 }, { y: -160, opacity: 1, scale: 1, duration: .6, ease: "back.out(2)" }, W(6, 11) + .05); tl.to(plus, { opacity: 0, duration: .25 }, W(6, 11) + 1.0);
  // Alex
  const a = character(st, "a6", 790, 1250, .85, { acc: ["beret", "glasses"] });
  rise(a, t0 + .5, 380, .5); face("a6", "h", W(6, 2)); blink("a6", t0 + 2.2); hop(a, W(6, 2), 36);
  wave("a6", "L", W(6, 6), 3);
})();

/* =============== SCENE 7 — Ergebnis =============== */
(function () {
  const n = 7, st = scene(n), t0 = T0(n);
  paper(st, "var(--light)", "dots");
  mk(st, `<div class="ring" style="left:-160px;top:760px;width:520px;height:520px"></div>`);
  hdr(st, n, "DAS ERGEBNIS");
  const rows = [
    { y: 420, k: 3, col: "#d9824f", ic: ICON.person("#d9824f"), a: "QUALIFIZIERTE", b: "ANFRAGEN", side: -1 },
    { y: 690, k: 6, col: "#7f9db0", ic: ICON.eye("#7f9db0"), a: "MEHR", b: "SICHTBARKEIT", side: 1 },
    { y: 960, k: 8, col: "#5f9b6e", ic: ICON.shield("#5f9b6e"), a: "MEHR", b: "SERIOSITÄT", side: -1 },
  ];
  rows.forEach((r, i) => {
    const c = at(mk(st, `<div class="card" style="width:900px;height:236px"><div class="abs" style="left:0;top:0;width:18px;height:100%;background:${r.col}"></div><div class="abs" style="left:48px;top:48px;width:140px;height:140px">${r.ic.replace('width="100" height="100"', 'width="140" height="140"')}</div>
      <div class="abs" style="left:222px;top:${r.a.length > 6 ? 46 : 70}px;font:800 ${r.a.length > 6 ? 38 : 38}px Inter;letter-spacing:.1em;color:#8b7d63">${r.a}</div><div class="abs" style="left:222px;top:${r.a.length > 6 ? 98 : 118}px;font:900 ${r.b.length > 10 ? 52 : 58}px Inter;letter-spacing:-.01em;color:#2a2622">${r.b}</div>
      <div id="r7x${i}" class="abs" style="right:44px;top:0;width:210px;height:100%"></div></div>`), 90, r.y, i === 1 ? 1.2 : i === 0 ? -1.2 : -.8);
    slide(c, W(7, r.k) - .12, r.side * 1200, .5);
    shake(st, W(7, r.k) + .3, 10);
    const ch = at(mk(st, `<div class="abs" style="width:84px;height:84px">${ICON.check("#5f9b6e")}</div>`), 90 + 810, r.y - 28);
    pop(ch, W(7, r.k) + .4, .35, .2);
  });
  // per-row widgets
  const r0 = document.getElementById("r7x0"); mk(r0, `<div class="abs" style="left:0;top:52px;font:900 120px/1 Inter;color:#d9824f;font-variant-numeric:tabular-nums;letter-spacing:-.04em">+<span id="n7">0</span></div>`);
  count("#n7", W(7, 3) + .3, 1.3, 0, 24);
  const r1 = document.getElementById("r7x1"); [0, 1, 2, 3].forEach(j => { const b = mk(r1, `<div class="abs" style="left:${10 + j * 50}px;bottom:34px;width:36px;height:${50 + j * 36}px;background:#7f9db0;border-radius:6px 6px 0 0;opacity:.95"></div>`); gsap.set(b, { transformOrigin: "50% 100%" }); tl.fromTo(b, { scaleY: 0 }, { scaleY: 1, duration: .35, ease: "back.out(1.6)" }, W(7, 6) + .25 + j * .1); });
  const r2 = document.getElementById("r7x2");
[0, 1, 2].forEach(j => { const s = mk(r2, `<div class="abs" style="left:${j * 66}px;top:76px;width:64px;height:64px"><svg width="64" height="64" viewBox="0 0 34 34"><path d="M17 0 L21 12 L34 12 L24 20 L28 33 L17 25 L6 33 L10 20 L0 12 L13 12Z" fill="#e3b73e"/></svg></div>`); pop(s, W(7, 8) + .2 + j * .12, .3, .1); });
  // Alex
  const a = character(st, "a7", 80, 1240, .85, { acc: ["crown", "bowtie"] });
  rise(a, t0 + .5, 380, .5); face("a7", "h", W(7, 1));
  arms("a7", W(7, 8)); hop(a, W(7, 8), 50);
  confetti(st, W(7, 8) + .35, 540, 520, 34, 1000);
  idle(a, t0 + 1.2, t0 + SC[6].dur, 5);
})();

/* =============== SCENE 8 — Wal + CTA =============== */
(function () {
  const n = 8, st = scene(n), t0 = T0(n);
  paper(st, "linear-gradient(#0a141d,#1a2832 70%,#22384a)");
  mk(st, `<div class="abs" style="inset:0">${Array.from({ length: 26 }, (_, i) => `<div class="abs" style="left:${20 + rnd(i + 2) * 1040}px;top:${60 + rnd(i + 5) * 900}px;width:${4 + rnd(i + 8) * 7}px;height:${4 + rnd(i + 8) * 7}px;border-radius:50%;background:#f4ebd8;opacity:${.35 + rnd(i + 3) * .6}"></div>`).join("")}</div>`);
  mk(st, `<div class="abs" style="left:840px;top:330px;width:150px;height:150px;border-radius:50%;background:#f4ebd8;box-shadow:0 0 120px 40px rgba(244,235,216,.18)"></div>`);
  hdr(st, n, "THE WHITE WHALE AGENCY", true);
  // whale jump
  const wh = at(mk(st, `<div class="abs" style="width:600px;height:330px">${heroSVG("wh8")}</div>`), 240, 430, -6);
  gsap.set(wh, { transformOrigin: "50% 60%" });
  tl.fromTo(wh, { x: -620, y: 900, rotation: -70, opacity: 0 }, { x: 0, y: 0, rotation: -6, opacity: 1, duration: 1.0, ease: "power3.out" }, t0 + .05);
  tl.to(wh, { y: -16, rotation: -3, duration: .9, repeat: 6, yoyo: true, ease: "sine.inOut" }, t0 + 1.1);
  // waves
  const sea = (top, col, amp, dur, ph) => { const w = mk(st, `<svg class="abs" style="left:-300px;top:${top}px" width="1680" height="${1920 - top + 60}" viewBox="0 0 1680 ${1920 - top + 60}"><path d="M0 40 ${Array.from({ length: 14 }, (_, i) => `Q${60 + i * 120} ${amp ? 0 : 40} ${120 + i * 120} 40 T${120 + i * 120 + 120 > 1680 ? 1680 : 120 + i * 120 + 120} 40`).join(" ")} V${1920 - top + 60} H0Z" fill="${col}"/></svg>`); tl.to(w, { x: 120, duration: dur, repeat: 3, yoyo: true, ease: "sine.inOut" }, t0 + ph); return w; };
  sea(1320, "#1d3042", 1, 2.2, 0); sea(1380, "#26384a", 1, 1.9, .3); sea(1440, "#2f4a60", 1, 2.5, .1);
  // splash
  for (let i = 0; i < 9; i++) { const d = mk(st, `<div class="abs" style="left:${200 + i * 18}px;top:1230px;width:${14 + rnd(i) * 14}px;height:${14 + rnd(i) * 14}px;border-radius:50%;background:#d5e3e8;opacity:0"></div>`); tl.set(d, { opacity: 1 }, t0 + .45); tl.to(d, { keyframes: [{ x: (rnd(i + 4) - .3) * 320, y: -240 - rnd(i + 9) * 260, duration: .35, ease: "power2.out" }, { x: (rnd(i + 4) - .3) * 420, y: 160, opacity: 0, duration: .55, ease: "power1.in" }] }, t0 + .45); }
  // comment bubble
  const cb = at(mk(st, `<div class="card" style="width:860px;height:150px;border-radius:24px"><div class="abs" style="left:28px;top:36px;width:78px;height:78px;border-radius:50%;background:#ecb085"></div><div class="abs" style="left:134px;top:22px;font:700 24px Inter;color:#8b7d63">du</div><div id="cm8" class="abs" style="left:134px;top:54px;font:900 62px/1 Inter;color:#2a2622;letter-spacing:.02em;white-space:nowrap"></div><div class="abs" style="right:34px;top:48px;width:64px;height:60px" id="hr8">${ICON.heart}</div></div>`), 110, 760, -1);
  drop(cb, W(8, 6) - .1, -140, .45);
  [..."VORSCHAU"].forEach((ch, i) => { const s = mk(document.getElementById("cm8"), `<span style="opacity:0">${ch}</span>`); tl.set(s, { opacity: 1 }, W(8, 7) + i * .06); });
  tl.fromTo("#hr8", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: .35, ease: "back.out(3)" }, W(8, 7) + .6);
  // tickets
  const tk = (y, bg, txt, w, k) => { const t = at(mk(st, `<div class="card" style="width:860px;height:128px;background:${bg};border-radius:20px"><div class="abs" style="left:26px;top:22px;width:84px;height:84px">${ICON.check("#2a2622")}</div><div class="abs" style="left:136px;top:0;line-height:128px;font:900 ${txt.length > 18 ? 46 : 52}px Inter;letter-spacing:.02em;color:#2a2622;white-space:nowrap">${txt}</div><div class="abs" style="left:-18px;top:46px;width:36px;height:36px;border-radius:50%;background:#1a2832"></div><div class="abs" style="right:-18px;top:46px;width:36px;height:36px;border-radius:50%;background:#1a2832"></div></div>`), 110, y, w); slide(t, W(8, k) - .1, w < 0 ? -1200 : 1200, .5); shake(st, W(8, k) + .35, 9); return t; };
  tk(950, "#ecb085", "KOSTENLOSE TESTVERSION", -1.2, 10);
  tk(1100, "#d5e3e8", "15 MIN. BERATUNG", 1, 13);
  // Alex
  const a = character(st, "a8", 790, 1180, .75, { acc: ["bowtie"] });
  rise(a, t0 + 1.2, 420, .5); face("a8", "h", W(8, 5)); wave("a8", "R", W(8, 9), 4);
  blink("a8", t0 + 2.8);
})();
