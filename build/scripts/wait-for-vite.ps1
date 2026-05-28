param(
    [int]$Port = 9245
)

$url = "http://127.0.0.1:$Port"
Write-Host "Waiting for Vite at $url ..."

for ($i = 0; $i -lt 90; $i++) {
    try {
        $null = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 2
        Write-Host "Vite is ready."
        exit 0
    } catch {
        Start-Sleep -Seconds 1
    }
}

Write-Error "Timed out waiting for Vite dev server at $url"
exit 1
