#!/usr/bin/env node

const spawn = require('child_process').spawn;
const path = require('path');
const rimraf = require('rimraf').sync;

const rxRepo = /[:\/](.+)\/(.+)\.git$/;

main();

function main() {
  usage();

  // Arg indexes off by 1 because this is called with 'node repocopy.js args'.
  const techStack = process.argv[2];
  const gitHubName = process.argv[3];
  const destRepoInfo = parseRepoUrl(process.argv[4]);
  clone(techStack, gitHubName, destRepoInfo.name, destRepoInfo.url, destRepoInfo.org)
    .catch(log);
}

function usage() {
  if (process.argv.length < 4) {
    log('usage: rangle-starter techStack yourGithubName destRepoUrl');
    process.exit(-1);
  }
}

function parseRepoUrl(repoUrl) {
  const match = rxRepo.exec(repoUrl);
  if (!match || !match[1] || !match[2]) {
    log(`Unable to parse destination repo URL: ${repoUrl}.`);
    log('Make sure it has the form git@github.org:org/repo-name.git');
    process.exit(-2);
  }

  return {
    url: repoUrl,
    org: match[1],
    name: match[2]
  };
}

function clone(techStack, gitHubName, folder, destRepoUrl) {
  // Clone the starter repo for the specified techstack and re-initialize it as
  // a new repo with correct remotes.
  const cwd = process.cwd();
  return git('clone', 'git@github.com:rangle/' + techStack, '--depth=1', folder)
    .then(() => process.chdir(path.join(cwd, folder)))
    .then(() => rimraf('.git'))
    .then(() => git('init'))
    .then(() => git('remote', 'add', 'upstream', destRepoUrl))
    .then(() => git('remote', 'add', 'origin', `git@github.com:${gitHubName}/${folder}.git`));
}

function git() {
  const args = [].slice.call(arguments);
  log.apply(null, ['git'].concat(args));
  return childProc('git', [].slice.call(args));
}

function childProc(command, args) {
  const child = spawn(command, args);

  return new Promise((resolve, reject) => {
    child.stderr.setEncoding('utf8');
    child.stderr.on('data', log);
    child.on('exit', code => {
      if (!!code) {
        reject(new Error(command + ' exited with code ' + code));
      } else {
        resolve();
      }
    });
  });
}

function log() {
  /* eslint-disable no-console */
  console.log.apply(null, [].slice.call(arguments));
  /* eslint-enable no-console */
}
