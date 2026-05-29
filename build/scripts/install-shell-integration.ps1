# Registers PolarShell in the Windows Explorer right-click menu (folder + background).
# Usage:
#   powershell -NoProfile -ExecutionPolicy Bypass -File install-shell-integration.ps1
#   powershell -NoProfile -ExecutionPolicy Bypass -File install-shell-integration.ps1 -Uninstall
#   powershell -NoProfile -ExecutionPolicy Bypass -File install-shell-integration.ps1 -ExePath "C:\path\polarshell.exe"
param(
    [switch]$Uninstall,
    [string]$ExePath,
    [switch]$NoRefreshExplorer
)

$ErrorActionPreference = "Stop"

$MenuLabel = "Abrir en PolarShell"
$RegistryName = "PolarShell"
$ShellContexts = @(
    "HKCU:\Software\Classes\Directory\shell\$RegistryName",
    "HKCU:\Software\Classes\Directory\Background\shell\$RegistryName"
)

function Get-DefaultExePath {
    $repoRoot = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
    Join-Path $repoRoot "bin\polarshell.exe"
}

function Resolve-PolarShellExe {
    param([string]$Path)

    if ($Path) {
        if (-not (Test-Path -LiteralPath $Path)) {
            throw "Executable not found: $Path"
        }
        return (Resolve-Path -LiteralPath $Path).Path
    }

    $default = Get-DefaultExePath
    if (Test-Path -LiteralPath $default) {
        return (Resolve-Path -LiteralPath $default).Path
    }

    $onPath = Get-Command polarshell.exe -ErrorAction SilentlyContinue
    if ($onPath) {
        return $onPath.Source
    }

    throw @"
Could not find polarshell.exe.
  - Build the app: wails3 build
  - Or pass -ExePath to this script
  - Or add bin\ to your user PATH
"@
}

function Install-ShellIntegration {
    param([string]$Exe)

    $command = "`"$Exe`" `"%V`""

    foreach ($shellKey in $ShellContexts) {
        $commandKey = Join-Path $shellKey "command"

        New-Item -Path $shellKey -Force | Out-Null
        Set-ItemProperty -LiteralPath $shellKey -Name "(default)" -Value $MenuLabel
        Set-ItemProperty -LiteralPath $shellKey -Name "Icon" -Value $Exe

        New-Item -Path $commandKey -Force | Out-Null
        Set-ItemProperty -LiteralPath $commandKey -Name "(default)" -Value $command
    }

    Write-Host "Installed: $MenuLabel"
    Write-Host "  Executable: $Exe"
    Write-Host "  Context:    folders and folder background (Explorer)"
}

function Uninstall-ShellIntegration {
    foreach ($shellKey in $ShellContexts) {
        if (Test-Path -LiteralPath $shellKey) {
            Remove-Item -LiteralPath $shellKey -Recurse -Force
            Write-Host "Removed: $shellKey"
        }
    }
    Write-Host "PolarShell removed from Explorer context menu."
}

function Refresh-Explorer {
    if ($NoRefreshExplorer) {
        Write-Host "Skipped Explorer refresh (-NoRefreshExplorer). Log off or restart Explorer to see changes."
        return
    }
    Stop-Process -Name explorer -Force -ErrorAction SilentlyContinue
    Write-Host "Explorer restarted."
}

try {
    if ($Uninstall) {
        Uninstall-ShellIntegration
    } else {
        $exe = Resolve-PolarShellExe -Path $ExePath
        Install-ShellIntegration -Exe $exe
    }
    Refresh-Explorer
} catch {
    Write-Error $_.Exception.Message
    exit 1
}
