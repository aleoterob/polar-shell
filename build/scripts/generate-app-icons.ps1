# Regenerates build/appicon.png and platform icons from frontend/public/react-dark.svg.
param(
    [string]$SvgPath = "..\frontend\public\react-dark.svg",
    [switch]$SkipSyso,
    [string[]]$Architectures = @("amd64", "arm64")
)

$ErrorActionPreference = "Stop"
$buildDir = Split-Path -Parent $PSScriptRoot
Set-Location $buildDir

Write-Host "Rendering appicon.png from $SvgPath ..."
npx --yes @resvg/resvg-js-cli --fit-width 1024 $SvgPath appicon.png

Write-Host "Generating platform icons ..."
wails3 generate icons `
    -input appicon.png `
    -macfilename darwin/icons.icns `
    -windowsfilename windows/icon.ico

if ($SkipSyso) {
    Write-Host "Done (syso files are generated per-arch during windows:build)."
    exit 0
}

foreach ($arch in $Architectures) {
    Write-Host "Generating wails_windows_$arch.syso ..."
    wails3 generate syso `
        -arch $arch `
        -icon windows/icon.ico `
        -manifest windows/wails.exe.manifest `
        -info windows/info.json `
        -out "../wails_windows_$arch.syso"
}

Write-Host "Done."
