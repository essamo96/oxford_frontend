import numpy as np
from PIL import Image

def process_logo():
    src_path = "assets/full_mark (1).png"
    img = Image.open(src_path).convert('RGBA')
    img_data = np.array(img)
    
    # Extract alpha channel
    alpha = img_data[:, :, 3]
    
    # Find bounding box
    coords = np.argwhere(alpha > 10)
    if len(coords) == 0:
        print("Empty image!")
        return
    y0, x0 = coords.min(axis=0)
    y1, x1 = coords.max(axis=0) + 1
    
    alpha_cropped = alpha[y0:y1, x0:x1]
    
    # Change height to 200px for high-res rendering at 100px CSS height
    h_new = 200
    w_new = int((x1 - x0) * h_new / (y1 - y0))
    
    alpha_img = Image.fromarray(alpha_cropped).resize((w_new, h_new), Image.Resampling.LANCZOS)
    alpha_resized = np.array(alpha_img)
    
    themes = {
        "gold":  ((197, 168, 128), (125, 99, 63)),   # Gold
        "blue":  ((2, 132, 199), (3, 105, 161)),     # Blue
    }
    
    for theme_name, (color_top, color_bottom) in themes.items():
        colored = np.zeros((h_new, w_new, 4), dtype=np.uint8)
        
        # Apply vertical gradient
        for y in range(h_new):
            t = y / max(1, h_new - 1)
            r = int(color_top[0] * (1 - t) + color_bottom[0] * t)
            g = int(color_top[1] * (1 - t) + color_bottom[1] * t)
            b = int(color_top[2] * (1 - t) + color_bottom[2] * t)
            
            colored[y, :, 0] = r
            colored[y, :, 1] = g
            colored[y, :, 2] = b
            colored[y, :, 3] = alpha_resized[y, :]
        
        out_img = Image.fromarray(colored)
        out_path = f"assets/logo_v2_{theme_name}.png"
        out_img.save(out_path)
        print(f"Saved {out_path} with gradient")

if __name__ == '__main__':
    process_logo()
