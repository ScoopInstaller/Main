#requires -Modules @{ ModuleName = 'Pester'; ModuleVersion = '4.4.0' }

if(!$env:SCOOP_HOME) { $env:SCOOP_HOME = resolve-path (split-path (split-path (scoop which scoop))) }
Invoke-Pester "$psscriptroot/.."
