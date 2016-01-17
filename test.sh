#!/bin/bash

regex="\/(.+)\.git$"
wut="git@github.com:org/waaat.git"

if [[ $wut =~ $regex ]]; then
    echo ${BASH_REMATCH[1]}
else
    echo "unable to parse string $wut"
fi
