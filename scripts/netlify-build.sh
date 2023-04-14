#!/bin/sh

set -ex

curl -fsSL https://deno.land/x/install/install.sh | sh

export DENO_INSTALL="/opt/buildhome/.deno"
export PATH="$DENO_INSTALL/bin:$PATH"

deno --version

which yarn || npm install --global yarn
yarn --version

echo "# Finished preparing build environment"

yarn build

set +ex

