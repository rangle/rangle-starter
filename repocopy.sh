#!/bin/bash

#sh project-name github-user stack
srcRepoUrl=$1
destRepoUrl=$2
yourGithubName=$3

if [ -z $srcRepoUrl ] || [ -z $destRepoUrl ] || [ -z $yourGithubName ]
then
  echo "usage: $0 srcRepoUrl destRepoUrl yourGithubName"
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

git clone srcRepoUrl --depth=1 -o $yourGithubName $folder
cd $folder
rm -rf .git
git init
git remote add upstream $destRepoUrl
git remote add origin ${destRepoUrl/$org/$yourGithubName}
git add --all
git commit -m "Initial commit from source: $srcRepoUrl"
