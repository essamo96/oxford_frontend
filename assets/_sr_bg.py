"""Super-resolve bc-remove.png to ~4K using FSRCNN x4."""
import cv2
from pathlib import Path

ASSETS = Path(__file__).parent
SRC    = ASSETS / "bc-remove.png"
OUT    = ASSETS / "bc-remove-4k.png"
MODEL  = ASSETS / "hero-animation-img" / "FSRCNN_x4.pb"

img = cv2.imread(str(SRC), cv2.IMREAD_UNCHANGED)
if img is None:
    raise SystemExit("Could not read bc-remove.png")
print(f"Source: {img.shape[1]}x{img.shape[0]}")

# Drop alpha for SR (FSRCNN can't take 4 channels) — re-attach after if needed.
has_alpha = img.ndim == 3 and img.shape[2] == 4
rgb = img[:, :, :3] if has_alpha else img

sr = cv2.dnn_superres.DnnSuperResImpl_create()
sr.readModel(str(MODEL))
sr.setModel("fsrcnn", 4)
up = sr.upsample(rgb)
print(f"After SR:  {up.shape[1]}x{up.shape[0]}")

# Light sharpening
blur  = cv2.GaussianBlur(up, (0, 0), 1.2)
sharp = cv2.addWeighted(up, 1.35, blur, -0.35, 0)

if has_alpha:
    # Upscale alpha channel separately with Lanczos.
    alpha = cv2.resize(img[:, :, 3], (sharp.shape[1], sharp.shape[0]),
                       interpolation=cv2.INTER_LANCZOS4)
    sharp = cv2.merge([sharp[:, :, 0], sharp[:, :, 1], sharp[:, :, 2], alpha])

cv2.imwrite(str(OUT), sharp, [cv2.IMWRITE_PNG_COMPRESSION, 6])
print(f"Wrote {OUT}")
