import urllib.request
import os

os.makedirs(".stitch/designs", exist_ok=True)

html_url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzZmNTBhMGU1YjJjZjRlZWJhZTFjYWYzOTMxZjZiYmU1EgoSBhCD-JyvZRgBkgEkCgpwcm9qZWN0X2lkEhZCFDE3MjgwOTI1NTg4NDM1NzMxMzk4&filename=&opi=96797242"
screenshot_url = "https://lh3.googleusercontent.com/aida/AP1WRLve1frSlBTtNmAFRagKuq88i3S7PgtDfSzfO18nQJW_a5SWOUH-kWbwTqXTj0wYT1porWjtOFCS2gnLDNuqDcHJGoB0_CCME65OgBcwMatOrWs3P-brNrxHF1AenqYO2MAa25zYryYFqQ3mI26oAJQmdsoTaSvahcs8OZAInQeTixaRXD4bbHPu82RRM8vgoqfXd9Vhr29T0GCbK85uuEuIsSMZJ6KYANzdOiM9WRlsvSdgrJP7yYpvww=w2816"

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

# Download HTML
try:
    req = urllib.request.Request(html_url, headers=headers)
    with urllib.request.urlopen(req) as response:
        with open(".stitch/designs/teacher-login.html", "wb") as f:
            f.write(response.read())
    print("HTML downloaded successfully.")
except Exception as e:
    print(f"Error HTML: {e}")

# Download PNG
try:
    req = urllib.request.Request(screenshot_url, headers=headers)
    with urllib.request.urlopen(req) as response:
        with open(".stitch/designs/teacher-login.png", "wb") as f:
            f.write(response.read())
    print("PNG downloaded successfully.")
except Exception as e:
    print(f"Error PNG: {e}")
