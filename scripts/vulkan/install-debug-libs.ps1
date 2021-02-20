<#
.SYNOPSIS
    Triggers the download of debug
    libs and bin files for the VulkanSdk
.PARAMETER CacheDirectory
    Current scoop '$cachedir' of the SDK
.PARAMETER Directory
    Current scoop '$dir' of the SDK
.PARAMETER Version
    Version of the SDK
#>
param(
    [Parameter(Mandatory)][String] $CacheDirectory,
    [Parameter(Mandatory)][String] $Directory,
    [Parameter(Mandatory)][String] $Version
)

function GetUrlStatusCode {
    [OutputType([int])]
    Param ([string]$url)

    try {
        (Invoke-WebRequest -Uri $Url -UseBasicParsing -DisableKeepAlive -Method Head).StatusCode
    }
    catch [Net.WebException] {
        $_.Exception.Response.StatusCode
    }
}

# Replaces x.x.x.1(2(3(etc))) with x.x.x.0
function ReplaceMinVersion {
    [OutputType([string])]
    Param ([string]$ver)

    [int] $index = $ver.LastIndexOf(".")
    if ($index -eq -1) {
        throw "Version isn't of format {x.x.x.x}"
    }
    $ver = $ver.Remove($index, $ver.Length - $index);
    return $ver = $ver + ".0"
}

# Obtains the filename from the URL
# https://stackoverflow.com/a/44475621
function GetDownloadFileName {
    [OutputType([string])]
    Param ([string]$url)
    $(split-path -path "$url" -leaf)
}

$baseUrl = "https://files.lunarg.com/SDK-"
$minVersion = ReplaceMinVersion $Version
Write-Host "Min version $minVersion"

# URL example be https://files.lunarg.com/SDK-1.2.154.1/VulkanSDK-1.2.154.1-DebugLibs.zip
$urlStandard = "$baseUrl$version/VulkanSDK-$version-DebugLibs.zip"

# URL example be https://files.lunarg.com/SDK-1.2.154.1/VulkanSDK-1.2.154.0-DebugLibs.zip
$urlMinStandard = "$baseUrl$version/VulkanSDK-$minVersion-DebugLibs.zip"

# URL will be https://files.lunarg.com/SDK-1.2.154.0-1.2.154.1/VulkanSDK-1.2.154.0-DebugLibs.zip
$urlVersionCurrent = "$baseUrl$minVersion-$version/VulkanSDK-$version-DebugLibs.zip"
$urlMinCurrent = "$baseUrl$minVersion-$version/VulkanSDK-$minVersion-DebugLibs.zip"

# Find the URl that works
$urlsToTest = "$urlStandard", $urlMinStandard, "$urlVersionCurrent", "$urlMinCurrent"

# Inform the user of what is going on
Write-Host "Attempting to find Vulkan debug libs"

foreach ($url in $urlsToTest) {
    $code = GetUrlStatusCode $url
    Write-Host "$code - $url"

    if ($code -eq 200) {
        # Creates the output directory of the file to download and checks
        # for it's existance in the cache
        $download = "$CacheDirectory\" + (GetDownloadFileName $url)
        if (-Not (Test-Path $download)) {
            # Download the zip file
            Invoke-WebRequest -Uri $url -UseBasicParsing -DisableKeepAlive -OutFile "$download"
        }

        # And extract it
        Expand-Archive -Path "$download" -DestinationPath $Directory
    }
}
