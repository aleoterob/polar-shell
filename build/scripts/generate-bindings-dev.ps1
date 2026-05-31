param(
    [string]$OutputDir = "frontend/bindings"
)

$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "../..")
$absoluteOutputDir = Join-Path $repoRoot $OutputDir
$temporaryOutputDir = Join-Path ([System.IO.Path]::GetTempPath()) ("polarshell-bindings-" + [guid]::NewGuid())

try {
    & wails3 generate bindings -d $temporaryOutputDir -ts
    if ($LASTEXITCODE -ne 0) {
        exit $LASTEXITCODE
    }

    if (-not (Test-Path -LiteralPath $absoluteOutputDir)) {
        New-Item -ItemType Directory -Path $absoluteOutputDir | Out-Null
    }

    Copy-Item -Path (Join-Path $temporaryOutputDir "*") -Destination $absoluteOutputDir -Recurse -Force
}
finally {
    Remove-Item -LiteralPath $temporaryOutputDir -Recurse -Force -ErrorAction SilentlyContinue
}
