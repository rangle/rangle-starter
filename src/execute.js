const spawn = require('child_process').spawn;
const path = require('path');
const rimraf = require('rimraf').sync;
const log = require('./log');

module.exports = function execute(config) {
  const gitCentral = config.useRepo ?
    buildGitUrl(config.repoOrg, config.repoName, config.useHttps) : false;
  const gitFork = config.repoForkOrg ?
    buildGitUrl(config.repoForkOrg, config.repoName, config.useHttps) : false;

  clone(config.techStack, gitFork, gitCentral, config.repoName)
    .catch(log);
};

const HTTPS = 'https://github.com/';
const SSH = 'git@github.com:';
const buildGitUrl = (orgName, projectName, useHttps) =>
  `${useHttps ? HTTPS : SSH}${orgName}/${projectName}.git`;


function clone(techStack, gitFork, gitCentral, repoName) {
  // Clone the starter repo for the specified techstack and re-initialize it as
  // a new repo with correct remotes.
  const cwd = process.cwd();
  return git('clone', 'git@github.com:rangle/' + techStack, '--depth=1', repoName)
    .then(() => process.chdir(path.join(cwd, repoName)))
    .then(() => rimraf('.git'))
    .then(() => initRepo(techStack, gitFork, gitCentral, repoName));
}

function initRepo(techStack, gitFork, gitCentral, repoName) {
  // No repo specified - don't do any git setup.
  if (!gitCentral) {
    return Promise.resolve(null);
  }

  const promise = git('init');

  if (gitFork) {
    // If you specified both a central repo and a fork, we'll
    // set origin === fork and upstream === central repo
    // (rangle flow).
    promise = promise
      .then(() => git('remote', 'add', 'origin', gitFork))
      .then(() => git('remote', 'add', 'upstream', gitCentral));
  } else {
    // If you specifed a central repo, but not a fork, we'll
    // just set origin === central repo (github flow).
    promise = promise
      .then(() => git('remote', 'add', 'origin', gitCentral));
  }

  return promise
    .then(() => git('add', '--all'))
    .then(() => git('commit', '-m', `'Created ${repoName} from ${techStack}'`));
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
