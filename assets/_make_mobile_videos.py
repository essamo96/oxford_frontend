"""
Build mobile-portrait (720x1280) versions of the hero videos.

Technique: each output frame is a blurred & zoomed copy of the source
filling the full 720x1280 portrait canvas, with the original 16:9 video
centered on top at native aspect. This is the standard 'Instagram /
TikTok letterbox replacement' pattern — fills the screen with on-brand
visual context instead of black bars.
"""
import imageio_ffmpeg, subprocess, sys
from pathlib import Path

FF = imageio_ffmpeg.get_ffmpeg_exe()
ASSETS = Path(__file__).parent

JOBS = [
    ("last_vidio.mp4",                 "last_vidio_mobile.mp4"),
    ("ezgif-4717916b679dc07a.mp4",     "ezgif-4717916b679dc07a_mobile.mp4"),
    ("aboutUs.mp4",                    "aboutUs_mobile.mp4"),
]

OUT_W, OUT_H = 720, 1280

# Filter graph:
#   [0:v] split into bg + fg
#   bg  : scale to fill 720x1280 (cropping if needed) + heavy blur + slight darken
#   fg  : scale to 720 wide, keep aspect (~720x405), pad vertically to 1280 transparent
#   overlay fg over bg centered
filter_complex = (
    "[0:v]split=2[bg][fg];"
    f"[bg]scale={OUT_W}:{OUT_H}:force_original_aspect_ratio=increase,"
    f"crop={OUT_W}:{OUT_H},gblur=sigma=22,eq=brightness=-0.06[bgf];"
    f"[fg]scale={OUT_W}:-2[fgs];"
    "[bgf][fgs]overlay=(W-w)/2:(H-h)/2[v]"
)

for src_name, out_name in JOBS:
    src = ASSETS / src_name
    out = ASSETS / out_name
    if not src.exists():
        print(f"skip (missing): {src}"); continue
    print(f"-> {out_name}")
    cmd = [
        FF, "-y", "-i", str(src),
        "-filter_complex", filter_complex,
        "-map", "[v]",
        "-c:v", "libx264", "-preset", "veryfast", "-crf", "23",
        "-pix_fmt", "yuv420p", "-movflags", "+faststart",
        "-an",
        str(out),
    ]
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print(res.stderr[-1500:])
        sys.exit(res.returncode)

print("Done.")
