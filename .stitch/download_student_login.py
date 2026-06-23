import urllib.request
import os

os.makedirs(".stitch/designs", exist_ok=True)

html_url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzZjODM3ODUxYjZiODQyODliZjNiNDRmNmI3MTYyNmQ3EgoSBhCD-JyvZRgBkgEkCgpwcm9qZWN0X2lkEhZCFDE3MjgwOTI1NTg4NDM1NzMxMzk4&filename=&opi=96797242"
screenshot_url = "https://lh3.googleusercontent.com/aida/AP1WRLuwfezdcgt8O9WBajEiMrYG8kJXm1h-7pU_swRzFL8Clefd2ZbQRJTo5w0kVmrmOJNQzdva7FgYGDZmG0HyRYnPFUo0AhsseJMsl_qy7A8p2p0Ekm5mFkCAplVriGW_WRF0dXRP9_lbApWrz0Myqgb-dWutZmDOcc3TlhMUk73WsgJ0vaqqsJwGuLl65eOJcoTjrHSFmzNj7XqJ7h5qsQPRIETaXX-QLz8HGlpAmaGPvb7NbmTevAeM7mk=w2816"

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

# Download HTML
try:
    req = urllib.request.Request(html_url, headers=headers)
    with urllib.request.urlopen(req) as response:
        with open(".stitch/designs/student-login.html", "wb") as f:
            f.write(response.read())
    print("HTML downloaded successfully.")
except Exception as e:
    print(f"Error HTML: {e}")

# Download PNG
try:
    req = urllib.request.Request(screenshot_url, headers=headers)
    with urllib.request.urlopen(req) as response:
        with open(".stitch/designs/student-login.png", "wb") as f:
            f.write(response.read())
    print("PNG downloaded successfully.")
except Exception as e:
    print(f"Error PNG: {e}")
