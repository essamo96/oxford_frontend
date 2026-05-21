"""
Upscale all hero animation frames from 1280x720 -> 1920x1080
using Lanczos resampling + light unsharp mask for perceived clarity.

Writes outputs into ./upscaled/ next to this script. The frontend will
read from this folder once you point hero-animation.js at it.
"""
import os, sys
from pathlib import Path
from PIL import Image, ImageFilter

SRC_DIR = Path(__file__).parent
OUT_DIR = SRC_DIR / "upscaled"
OUT_DIR.mkdir(exist_ok=True)

TARGET = (1920, 1080)
QUALITY = 88

files = sorted([p for p in SRC_DIR.glob("ezgif-frame-*.jpg")])
total = len(files)
print(f"Found {total} frames")

for i, p in enumerate(files, 1):
    out = OUT_DIR / p.name
    with Image.open(p) as im:
        im = im.convert("RGB").resize(TARGET, Image.LANCZOS)
        im = im.filter(ImageFilter.UnsharpMask(radius=1.2, percent=110, threshold=2))
        im.save(out, "JPEG", quality=QUALITY, optimize=True, progressive=True)
    if i % 20 == 0 or i == total:
        print(f"  {i}/{total}")

print("Done.")
