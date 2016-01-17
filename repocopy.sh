#!/bin/bash

techStack=$1
yourGithubName=$2
destRepoUrl=$3

if [ -z $techStack ] || [ -z $destRepoUrl ] || [ -z $yourGithubName ]
then
  echo "usage: $0 techStack yourGithubName destRepoUrl"
  exit -1
fi

regex="[:\/](.+)\/(.+)\.git$"
if [[ $destRepoUrl =~ $regex ]]; then
    org=${BASH_REMATCH[1]}
    folder=${BASH_REMATCH[2]}
    echo "org: $org folder: $folder"
else
    echo "Unable to parse destination repo URL: $destRepoUrl."
    echo "Make sure it has the form git@github.org:org/repo-name.git"
    exit -2
fi

git clone git@github.com:rangle/$techStack --depth=1 -o $yourGithubName $folder
cd $folder
rm -rf .git
git init
git remote add upstream $destRepoUrl
git remote add origin ${destRepoUrl/$org/$yourGithubName}
git add --all
git commit -m "Initial commit from source: $srcRepoUrl"
