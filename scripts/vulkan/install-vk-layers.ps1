if ($global -and (-not $is_admin)) {
    Write-Host "ERROR write registries for global installation needs admin rights!" -ForegroundColor DarkRed
    exit 1
}

$reg_root = if ($global) { [Microsoft.Win32.Registry]::LocalMachine } else { [Microsoft.Win32.Registry]::CurrentUser }
$vk_explicit_reg_path = 'SOFTWARE\Khronos\Vulkan\ExplicitLayers'
$vk_explicit_reg = $reg_root.CreateSubKey($vk_explicit_reg_path)

$vk_layers = Get-ChildItem -Path $vulkan_bin -Filter '*.json' | ForEach-Object { $_.FullName }
foreach ($vk_layer in $vk_layers) {
    $vk_explicit_reg.SetValue($vk_layer, 0, [Microsoft.Win32.RegistryValueKind]::DWord)
}

$vk_explicit_reg.Close()
