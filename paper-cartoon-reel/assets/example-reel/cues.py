"""SFX cue sheet. c(time_s, sfx_name, gain_db). W(scene,k)=start of word k, T0(scene)=scene start (1-based scenes).
sfx names: pop pop_s boing tick stamp slam slam_soft whoosh swish wind ding chime sad fanfare splash confetti"""


def cues(c, W, T0, SC):
    # --- scene 1
    c(T0(1) + .05, "whoosh", -10); c(T0(1) + .2, "pop", -5); c(W(1, 3) - .05, "pop", -5); c(T0(1) + .45, "pop_s", -10); c(W(1, 2), "boing", -9); c(W(1, 6) + .05, "ding", -12)
    # --- scene 2
    c(T0(2) + .05, "whoosh", -10)
    for k in (0, 2, 4): c(W(2, k) - .08 + .3, "pop", -5)
    for k in (1, 3, 6): c(W(2, k) - .02 + .16, "stamp", -3)
    c(W(2, 4), "wind", -14); c(W(2, 3) + .05, "sad", -11)
    # --- scene 3
    c(T0(3) + .05, "whoosh", -10); c(T0(3) + .35, "slam_soft", -6); c(W(3, 1) + .14, "stamp", -2); c(W(3, 7) - .1 + .2, "pop", -6); c(W(3, 5), "sad", -12)
    # --- scene 4
    c(T0(4) + .05, "whoosh", -10); c(T0(4) + .45, "pop", -5)
    for i in range(6):
        ts = T0(4) + .85 + i * .5; c(ts, "swish", -16); c(ts + .52, "ding", -10)
    c(W(4, 7) - .05, "wind", -13); c(W(4, 10) - .05, "wind", -13); c(W(4, 10) + .15, "pop", -8)
    # --- scene 5
    c(T0(5) + .05, "whoosh", -10); c(T0(5) + .3, "pop", -6)
    for i in range(27): c(T0(5) + .35 + i * .035, "tick", -22)
    for k in (1, 3, 8): c(W(5, k), "swish", -9)
    c(W(5, 9) + .12, "slam", -4); c(W(5, 9) + .2, "fanfare", -9); c(W(5, 9) + .27, "confetti", -8)
    # --- scene 6
    c(T0(6) + .05, "whoosh", -10); c(T0(6) + .5, "pop", -6); c(W(6, 2) - .1, "swish", -7); c(W(6, 2) + .35, "pop", -5); c(W(6, 2) + .55, "swish", -12)
    for k in (3, 4, 6): c(W(6, k) + .2, "pop_s", -8); c(W(6, k) + .3, "ding", -9)
    c(W(6, 10) - .3, "swish", -12); c(W(6, 11) - .02, "tick", -6); c(W(6, 11) + .1, "ding", -8)
    # --- scene 7
    c(T0(7) + .05, "whoosh", -10)
    for k in (3, 6, 8): c(W(7, k) - .12 + .3, "slam", -5); c(W(7, k) + .45, "pop_s", -9)
    c(W(7, 8) + .3, "fanfare", -8); c(W(7, 8) + .38, "confetti", -7)
    # --- scene 8
    c(T0(8) + .05, "whoosh", -8); c(T0(8) + .45, "splash", -4); c(T0(8) + .9, "pop", -8)
    c(W(8, 6) - .1 + .3, "pop", -6)
    for i in range(8): c(W(8, 7) + i * .06, "tick", -14)
    c(W(8, 7) + .7, "pop_s", -8)
    for k in (10, 13): c(W(8, k) - .1, "swish", -9); c(W(8, k) + .38, "slam_soft", -7)
    c(SC[7]["words"][15]["e"] + .1, "chime", -9)
