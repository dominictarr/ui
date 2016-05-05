#! /usr/bin/env bash

rm html/*.html
for js in *.js; do
  file=${js%.js}
  echo "building $js -> html/$file.html"
  browserify $js | indexhtmlify > html/$file.html
done
