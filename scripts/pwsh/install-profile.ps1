# Made by rafaeloledo (rafaeloliveiraledo@gmail.com)

# Usage: powershell -ExecutionPolicy Bypass -FIle install-profile.ps1

$packagesPath = "$env:LOCALAPPDATA\Packages"

$scoopPath = $env:SCOOP.Replace('\','\\')

if (-not $scoopPath) {
    Write-Host "SCOOP environment variable is not set." -ForegroundColor Red
    exit 1
}

function Get-WindowsTerminalPath {
    $wtPackages = Get-ChildItem -Path $packagesPath -Filter "Microsoft.WindowsTerminal_*" -Directory
    if ($wtPackages.Count -eq 0) { return $null }
    return $wtPackages[0]
}

function Get-WindowsTerminalSettingsPath {
    $wtPackage = Get-WindowsTerminalPath
    $settingsPath = Join-Path $wtPackage.FullName "LocalState\settings.json"
    if (-not (Test-Path $settingsPath)) { return $null }
    return $settingsPath
}

$settingsPath = Get-WindowsTerminalSettingsPath
if (-not $settingsPath) { exit 1 }

$settingsText = Get-Content $settingsPath -Raw -Encoding UTF8

try {
    $settings = $settingsText | ConvertFrom-Json -ErrorAction Stop
} catch {
    Write-Host "Please check for trailing commas or other syntax errors on $settingsPath" -ForegroundColor Red
    exit 1
}

$ProfileName = "PowerShell"
$existingProfile = $settings.profiles.list | Where-Object { $_.name -eq $ProfileName }
if ($existingProfile) { exit 0 }

$guid = [guid]::NewGuid().ToString()

$newProfile = @"
            {
                "commandline": "$scoopPath\\apps\\pwsh\\current\\pwsh.exe -nologo",
                "guid": "{$guid}",
                "hidden": false,
                "icon": "$scoopPath\\apps\\pwsh\\current\\pwsh.exe",
                "name": "$ProfileName",
                "startingDirectory": "%USERPROFILE%"
            }
"@

# magic regex
$regex = '(?s)(\"list\":\s*\[)(.*?)(\s*\])'

if ($settingsText -match $regex) {
    $listContent = $matches[2]

    if ($listContent.Trim() -eq "") {
        # empty list -> insert profile without a leading comma
        $result = "`$1`n$newProfile`$3"
    } else {
        # non-empty list -> append profile with a single separating comma
        $result = "`$1`$2,`n$newProfile`$3"
    }

    $settingsText = $settingsText -replace $regex, $result
}

[System.IO.File]::WriteAllText($settingsPath, $settingsText, [System.Text.UTF8Encoding]($false))
