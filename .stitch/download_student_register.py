import urllib.request
import os

os.makedirs(".stitch/designs", exist_ok=True)

html_url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAyOGM0Yzc4Y2QzMzRmN2NiM2E2MDY4YjllMzJkNjliEgoSBhCD-JyvZRgBkgEkCgpwcm9qZWN0X2lkEhZCFDE3MjgwOTI1NTg4NDM1NzMxMzk4&filename=&opi=96797242"
screenshot_url = "https://lh3.googleusercontent.com/aida/AP1WRLtaKTwd0etuLXj29iS6Y2oNNnMIQxhaX0rhsTEfb4n-alUtj4cXljneEJ4hkBmrqv7Gvru_V_D_lI4rSVH7BH8hsYNTyZUpuY9QQm_T-e2p5HotH4EwddO3xxD8uKZ96NP2yOIruiW7Mi3zMqSsMU0JPWK9ev0T6_RWerftiQREIbhyh-9f3QaaeOqLbrd4r1w5ayAb_gd83EuG6NEt5YangcQ9yYjoRirqV5gB-PkRvEOg2Jlv5wa7dg=w2816"

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

# Download HTML
try:
    req = urllib.request.Request(html_url, headers=headers)
    with urllib.request.urlopen(req) as response:
        with open(".stitch/designs/student-register.html", "wb") as f:
            f.write(response.read())
    print("HTML updated successfully.")
except Exception as e:
    print(f"Error HTML: {e}")

# Download PNG
try:
    req = urllib.request.Request(screenshot_url, headers=headers)
    with urllib.request.urlopen(req) as response:
        with open(".stitch/designs/student-register.png", "wb") as f:
            f.write(response.read())
    print("PNG updated successfully.")
except Exception as e:
    print(f"Error PNG: {e}")
