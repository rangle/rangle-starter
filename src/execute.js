const spawn = require('child_process').spawn;
const path = require('path');
const rimraf = require('rimraf').sync;
const log = require('./log');

module.exports = function execute(config) {
  const gitOrigin = config.useRepo ?
    buildGitUrl(config.repoOrg, config.repoName, config.useHttps) : false;
  const gitFork = config.repoForkOrg ?
    buildGitUrl(config.repoForkOrg, config.repoName, config.useHttps) : false;

  clone(config.techStack, gitFork, gitOrigin, config.repoName)
    .catch(log);
};

const HTTPS = 'https://github.com/';
const SSH = 'git@github.com:';
const buildGitUrl = (orgName, projectName, useHttps) =>
  `${useHttps ? HTTPS : SSH}${orgName}/${projectName}.git`;


function clone(techStack, gitFork, gitOrigin, repoName) {
  // Clone the starter repo for the specified techstack and re-initialize it as
  // a new repo with correct remotes.
  const cwd = process.cwd();
  return git('clone', 'git@github.com:rangle/' + techStack, '--depth=1', repoName)
    .then(() => process.chdir(path.join(cwd, repoName)))
    .then(() => rimraf('.git'))
    .then(() => !gitOrigin || git('init'))
    .then(() => !gitFork || git('remote', 'add', 'upstream', gitFork))
    .then(() => !gitOrigin || git('remote', 'add', 'origin', gitOrigin));
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

