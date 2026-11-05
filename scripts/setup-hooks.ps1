$root = git rev-parse --show-toplevel
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
git -C $root config core.hooksPath .githooks
Write-Host "hooksPath set to .githooks"
Write-Host "Pull and push will now print changes to docs/TODO.md, docs/DONE.md, and docs/decisions/."
