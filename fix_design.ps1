
# ========================================================
# fix_design.ps1 — Restore LTR for English pages,
#   keep logo_backup.png, and fix toggleLanguage()
# ========================================================

$htmlFiles = Get-ChildItem -Path . -Recurse -Include *.html -File

foreach ($file in $htmlFiles) {
    # Skip .stitch folder
    if ($file.FullName -like "*.stitch*") { continue }

    $content  = Get-Content $file.FullName -Raw -Encoding UTF8
    $original = $content

    # ----------------------------------------------------------
    # 1. If <html> starts with lang="en" and has dir="rtl"
    #    → restore dir="ltr" (English pages should start LTR)
    # ----------------------------------------------------------
    $content = $content -replace '(<html\s[^>]*lang="en"[^>]*)dir="rtl"', '$1dir="ltr"'

    # ----------------------------------------------------------
    # 2. Fix toggleLanguage() — English branch that was wrongly
    #    changed to set dir="rtl" and font-ar.
    #    We look for the ELSE branch (English) and fix both lines.
    # ----------------------------------------------------------

    # Pattern: the else block that currently has dir="rtl" and font-ar
    # Replace dir="rtl" with dir="ltr" inside the English else branch
    # We'll do a targeted multi-line replacement
    $content = $content -replace `
        "(if \(lang === 'ar'\)[\s\S]*?htmlElement\.setAttribute\('dir',\s*'rtl'\);[\s\S]*?htmlElement\.setAttribute\('lang',\s*'ar'\);[\s\S]*?document\.body\.style\.fontFamily\s*=\s*'var\(--font-ar\)';[\s\S]*?} else \{[\s\S]*?)htmlElement\.setAttribute\('dir',\s*'rtl'\);", `
        "`$1htmlElement.setAttribute('dir', 'ltr');"

    # Fix the font in the else (English) branch
    # After the else branch dir fix, fix the font
    # Strategy: find the else block and fix fontFamily line
    # The else block pattern after dir fix:
    $content = $content -replace `
        "(} else \{[\s\S]*?htmlElement\.setAttribute\('dir',\s*'ltr'\);[\s\S]*?htmlElement\.setAttribute\('lang',\s*'en'\);[\s\S]*?)document\.body\.style\.fontFamily\s*=\s*'var\(--font-ar\)';", `
        "`$1document.body.style.fontFamily = 'var(--font-en)';"

    if ($content -ne $original) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "Fixed: $($file.Name)"
    }
}

Write-Host ""
Write-Host "Done! All English pages restored to dir=ltr with correct toggleLanguage()."
