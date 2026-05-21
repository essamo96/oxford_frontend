"""
Super-resolution upscale 1280x720 -> 2560x1440 using FSRCNN x2.
Writes into ./upscaled/ (overwriting the previous Lanczos pass).
"""
import cv2, os
from pathlib import Path

SRC_DIR  = Path(__file__).parent
OUT_DIR  = SRC_DIR / "upscaled"
MODEL    = SRC_DIR / "FSRCNN_x2.pb"
OUT_DIR.mkdir(exist_ok=True)

sr = cv2.dnn_superres.DnnSuperResImpl_create()
sr.readModel(str(MODEL))
sr.setModel("fsrcnn", 2)

files = sorted(p for p in SRC_DIR.glob("ezgif-frame-*.jpg"))
total = len(files)
print(f"Found {total} frames, upscaling with FSRCNN x2 -> 2560x1440")

for i, p in enumerate(files, 1):
    img = cv2.imread(str(p))
    if img is None:
        continue
    up = sr.upsample(img)  # x2 -> 2560x1440
    # Slight sharpening via unsharp mask
    blur  = cv2.GaussianBlur(up, (0,0), 1.2)
    sharp = cv2.addWeighted(up, 1.4, blur, -0.4, 0)
    out = OUT_DIR / p.name
    cv2.imwrite(str(out), sharp, [cv2.IMWRITE_JPEG_QUALITY, 90, cv2.IMWRITE_JPEG_PROGRESSIVE, 1])
    if i % 20 == 0 or i == total:
        print(f"  {i}/{total}")

print("Done.")
