$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
if (-not (Get-Command npm.cmd -ErrorAction SilentlyContinue)) {
    throw 'Install Node.js 22.13 or newer, then run this script again.'
}
if (-not (Test-Path -LiteralPath (Join-Path $PSScriptRoot 'node_modules'))) {
    & npm.cmd ci
    if ($LASTEXITCODE -ne 0) { throw 'Dependency installation failed.' }
}
& npm.cmd run dev
