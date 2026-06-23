import os
import urllib.request
import json

# Setup directories
os.makedirs(".stitch/designs", exist_ok=True)

screens = [
    {
        "name": "dashboard",
        "html_url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzNlYzZmNTVlOWIwYjQ0ZGQ5YjNmMTE2MzZhM2E2ODhiEgoSBhCD-JyvZRgBkgEkCgpwcm9qZWN0X2lkEhZCFDE3MjgwOTI1NTg4NDM1NzMxMzk4&filename=&opi=89354086",
        "screenshot_url": "https://lh3.googleusercontent.com/aida/AP1WRLsSu82HOmMB22wvkEzVGXKjNWTBiRVo3oMPF-BaERJoGWfOL6VKLWvX-cSw20Ml-jB8i-aj90n31J1oIrdBaLuMMjk24WPIwMN8TiysEMUOBHqrbrocHGYM6M5atQM2oE-dSiHEACLwaNll1R1_MnVbneZfcOdeFeNQu71RJ3yM38LlJBB3FpyLWFE_Q5f-fj1VdgwOImamJ38bWcR7Ms-rQvyVtlSFHwOSn19zCp7YPe0fHPewE4JvuDQ=w2816"
    },
    {
        "name": "test-session",
        "html_url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2Q2NmVjNzVkNGMwMjQxZWY5OWU3NjBjZWZlZjZmM2E1EgoSBhCD-JyvZRgBkgEkCgpwcm9qZWN0X2lkEhZCFDE3MjgwOTI1NTg4NDM1NzMxMzk4&filename=&opi=89354086",
        "screenshot_url": "https://lh3.googleusercontent.com/aida/AP1WRLtDCRLfWRmsEiZNO4wymxQmSPirwFQOrDYmfAi13KZJZisqsA1fEZ4ETLa-zxpOI7dygmnXUWD3SYwvMnamC02KSC48hTNRZeQTHXjEFH-ffAL3vZBccaBrtilczUj6EoHEKmmZIEies3i-UF8kRDvSGFAGQ_bzAVr2xSKC_8iMPobCo4n3A1CZy_bJbRJkWj7noWZ_f5gX3_PE9nJg2-XHPWW-V7l9Zs-vVg1R8vmkoLkKkSjK6Ca8_ak=w2560"
    },
    {
        "name": "profile",
        "html_url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzFjZTgxOTc4NGViNDQyNTg5MGE3NTFkMWQ0OWJkNTY3EgoSBhCD-JyvZRgBkgEkCgpwcm9qZWN0X2lkEhZCFDE3MjgwOTI1NTg4NDM1NzMxMzk4&filename=&opi=89354086",
        "screenshot_url": "https://lh3.googleusercontent.com/aida/AP1WRLs30T-DwjLj7kQPeh3rqVlpyPLVYe0BXEWymwuNfaujRrY7IvIUkUUoIXcI2P44BLOyVqNrAqPFYnkUTu8MIV2VspQN2VhbCIrYdO7x2y2NHIXrk6FMPOKz-e_TTpD0U3QWIednK0KKmeaDZzNnucCPjHZ5KAoJJK7R6cN2ZpxhxmqliQPEl7b-snqIw4cyUJzy82b3G1dG5Dtmqf_FlGu3sj9rtRvUB5wchrRJzk01teKh-XX0QhA6R20=w2560"
    },
    {
        "name": "academy",
        "html_url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2E2ZTE2MDE4NmM0ZjQ3NTU5YThlNzEyZDhjMTIwZTIzEgoSBhCD-JyvZRgBkgEkCgpwcm9qZWN0X2lkEhZCFDE3MjgwOTI1NTg4NDM1NzMxMzk4&filename=&opi=89354086",
        "screenshot_url": "https://lh3.googleusercontent.com/aida/AP1WRLtRNZV491j7EOvaEnVXItGpLwJvtaeu3dzhASk-2KcFWI2b5nHCLRKzT9P7rKKkQ-Botrt3Z5Vkzy12Z0cBwhYrMkYCEyTGEaROeL-A0IuC68ojvJy_4kDvEj_3WiyK3S0NKlt3ouucEW0nlKAzirgh8j-d_aKC3P7sBZ1Bzal3HBnu-WvrC0VTHdJ0OYUsGn33Q5ItK5gZ-Eh9wTyjxYqZkRN64Afg3Y7RzKfstAsKek4YoX8Q3D02dA=w2560"
    },
    {
        "name": "financials",
        "html_url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2Q4ZjMyMzI2OWM4NjQwNTNhZDU2YzMwYWI2ZTNlNjI5EgoSBhCD-JyvZRgBkgEkCgpwcm9qZWN0X2lkEhZCFDE3MjgwOTI1NTg4NDM1NzMxMzk4&filename=&opi=89354086",
        "screenshot_url": "https://lh3.googleusercontent.com/aida/AP1WRLs4vtttnu_TvzIOMEoM8Qahmbz0zDEtZ7ECQHFH9px43cCeiZ9A_F8usfasB8qS4HDeVK06oG4K1PZfH2aZuAu7uhKbZA2pzhZQR3myKJvKFyd2-9e2uASrFlsuRgm3OuIRboc8wygXSUArNU8AqMKiUpuLKiWOlo2846OM1h4A7C0NADMlc-NcdZVWGXuMUWFHMmWrobo06kI6lKXEXqTn17AvwYSIGN26xAgaCAtDWealicOM6T1PRww=w2560"
    },
    {
        "name": "library",
        "html_url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzMzYjllZjgxZGU2YTRlZWFiNGFhM2U3NDI2YzczZjYyEgoSBhCD-JyvZRgBkgEkCgpwcm9qZWN0X2lkEhZCFDE3MjgwOTI1NTg4NDM1NzMxMzk4&filename=&opi=89354086",
        "screenshot_url": "https://lh3.googleusercontent.com/aida/AP1WRLtxtpD741mVn83Ol13LRnnQ_Q95TqTsxkknJY3ngg9f01v5oJDBOmg4Jc3YnuxobznxlqxkhY_M_VDGkaDa-H4lL4DfQOfXHOHWSwdfoxUKOvXd2pIlC8FfwXFvlp7cS1WtHDnfvYtMyZ4iB8y4-GvG6d673MMXhGNq7W9_dSEg8jy5F9_eMZ0-A0BdXnDV52ICnlI8gGV3aUGVICbI6P6wiLPhLgeVkxYSCrmGoeYdh_3DYDcwD_dsoKw=w2560"
    },
    {
        "name": "reports",
        "html_url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzMxZjU1ZjE2NzMxODRiMjJiODgxZGI4ZDlhZTc0OWNjEgoSBhCD-JyvZRgBkgEkCgpwcm9qZWN0X2lkEhZCFDE3MjgwOTI1NTg4NDM1NzMxMzk4&filename=&opi=89354086",
        "screenshot_url": "https://lh3.googleusercontent.com/aida/AP1WRLsv84wLUZHn7S_kWYS4-tKYT6iS8yj4ClvBxdVbh15JhOo5M-UmtPpNcWCWctp1y6imTg7HpsT6Awu5rDplIKGlmu-LZ-bsm6RU0gOURRxB67CiUXW4MWWfRcO41ZMR-DtCUAbXKi11obJHGNYyUpSaeVrisdC8n5d2VGQbbsOC08ReX4ipeiofo4bvyIiGgpcLmanDSJciQykqofoXnztP66W4QikIOYJkWxdwPXmpiNsco1PuxWqxHw=w2560"
    },
    {
        "name": "conversations",
        "html_url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzNjN2EwZGVjNjVmZDRiZTA5MjU4ZDY1MTlhZjFmNTk0EgoSBhCD-JyvZRgBkgEkCgpwcm9qZWN0X2lkEhZCFDE3MjgwOTI1NTg4NDM1NzMxMzk4&filename=&opi=89354086",
        "screenshot_url": "https://lh3.googleusercontent.com/aida/AP1WRLseKTTT3t66CN6LoR-9hgDaFt_KnOeQWhVH3G6NOsZWGLlgT-v2Jjvz6mc8bgc7bOIv4gXskct5xtH_FPA-reaO0DygYHingd5NCOfQGSWQJjxGHn0jbI6M7xZ5ZLZ8LqVJ5wPHUvBNIdoooPptxA841RTE2tsSX15RMG4vlhZp4d7ZtrB_6BJg6a97qtlmP2IIiX9jYaUsKRBjknyaII80zz1zcvHKAfKCzGWDrJ7kVf7LD-cgxvX-wk8=w2560"
    },
    {
        "name": "notifications",
        "html_url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzRkMjkxZWJlYjMwNTY0ODM1YTg4ZDJkOTQzNTE5MWY4OBIKEgYQg_icr2UYAZIBJAoKcHJvamVjdF9pZBIWQhQxNzI4MDkyNTU4NDM1NzMxMzk4&filename=&opi=89354086",
        "screenshot_url": "https://lh3.googleusercontent.com/aida/AP1WRLs7EIjyey2lQVoOufyxp25xACAM3hfuerSLvSXiYoiIMw5XwoGS0cDEclvGwmwQKa16CCzOmySPJGsjWTwb2GIFIXolCv4RSL0PEJAYDURNEPHp85rRr_HlzAd82VZ4Uynz642WQpQy87N_pToHdFaRDowpAtkRoED8N6iIk4_X7HgUbvloHwSaR_Kzr9HSHmhPdd8fj-QANSyt73Ad908ahMbeSQKRa--XeYRdbGGvWLWZLmD7AZcWuy8=w2560"
    }
]

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

for s in screens:
    name = s["name"]
    print(f"Downloading {name}...")
    
    # HTML file
    try:
        req = urllib.request.Request(s["html_url"], headers=headers)
        with urllib.request.urlopen(req) as response:
            html_content = response.read()
        
        # Save HTML
        html_path = f".stitch/designs/{name}.html"
        with open(html_path, "wb") as f:
            f.write(html_content)
        print(f"  Saved HTML to {html_path}")
    except Exception as e:
        print(f"  ❌ Error downloading HTML for {name}: {e}")
        
    # Screenshot file
    try:
        req = urllib.request.Request(s["screenshot_url"], headers=headers)
        with urllib.request.urlopen(req) as response:
            screenshot_content = response.read()
            
        # Save PNG
        png_path = f".stitch/designs/{name}.png"
        with open(png_path, "wb") as f:
            f.write(screenshot_content)
        print(f"  Saved PNG to {png_path}")
    except Exception as e:
        print(f"  ❌ Error downloading Screenshot for {name}: {e}")

print("All downloads completed successfully!")
