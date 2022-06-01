#!/bin/sh

set -e

if [ -n "db" ]; then
  /usr/src/app/wait-for.sh "db:5432"
fi

exec "$@"