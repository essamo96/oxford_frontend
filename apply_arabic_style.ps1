$files = Get-ChildItem -Path . -Recurse -Include *.html, *.js -File

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $original = $content

    # 1. Replace logo
    $content = $content -replace 'favicon-removebg-preview.png', 'img/logo_backup.png'

    # 2. Update toggleLanguage for dir
    $content = $content -replace "htmlElement\.setAttribute\('dir', 'ltr'\);", "htmlElement.setAttribute('dir', 'rtl');"

    # 3. Update toggleLanguage for font
    $content = $content -replace "document\.body\.style\.fontFamily = 'var\(--font-en\)';", "document.body.style.fontFamily = 'var(--font-ar)';"

    # 4. Update the html tag's dir attribute from ltr to rtl
    $content = $content -replace 'dir="ltr"', 'dir="rtl"'

    if ($content -ne $original) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Updated $($file.FullName)"
    }
}
