#!/bin/sh

set -ex

curl -fsSL https://deno.land/x/install/install.sh | sh

export DENO_INSTALL="/opt/buildhome/.deno"
export PATH="$DENO_INSTALL/bin:$PATH"

deno --version

npm install --global yarn
yarn --version

set +ex

echo "# Finished preparing build environment"
