#!/bin/sh
set -e
root=$(git rev-parse --show-toplevel)
git -C "$root" config core.hooksPath .githooks
echo "hooksPath set to .githooks"
echo "Pull and push will now print changes to docs/TODO.md, docs/DONE.md, and docs/decisions/."
