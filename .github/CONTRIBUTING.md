# Contributing

Whether you plan on opening a bug report, requesting a feature, or submitting a pull request: we thank you for your interest in contributing to our project.

## Issues

Issues can be used to request a feature or open a bug report.

### Request a feature

### Report a Bug

## Pull Requests
At Rangle.io we use a fork-and-branch strategy for pull requests, with some modifications for our internal tooling. To follow this strategy, please do the following:

### Setup

- Fork the repo you would like to contribute to.

- Clone that fork to your local machine.

- Add our repo as a new remote called upstream.

```bash
# Add upstream remote to repo
git remote add upstream git@github.com:rangle/[repo_name].git
```

- Work on a branch that is descriptively named. (We prefer the `chore/fix/feat` convention).

```bash
# chore branch
git checkout -b chore/update-documentation

# fix branch
git checkout -b fix/authentication

# feature branch
git checkout -b feat/add-login-modal
```
### Commits

- Commit messages should be descriptive of the changes made
- Keep the first line of your commit to no more than 72 characters. But why?
  - Github wraps commit messages after 72 characters so your message will get cut off
  - This is force you to think about how to concisely describe the change the commit introduces
- If you need to explain the changes in more detail, add a new line and explain the changes there.

**Bad commit messages:**<br/>

Not descriptive:
```
fixed the bad code
```

Descriptive but too long:
```
Added new CSS class to the button component to change the appearance of the :hover state of the button
```

**Good commit Messages:**<br/>

Descriptive and concise message
```
Add :hover style rule to button component
```

Concise first line with more details below
```
Handle exception due to missing local storage instance

Accessing localstorage throws an error in private mode.
Added an in-memory workaround for this case.
```

### Submitting a Pull Request

Once you've finished, rebase from `upstream/master` to make sure you have the most up to date changes. Then, push your branch to **your** remote fork to create a pull request

```sh
# get latest changes from the main repo
git fetch upstream

# replay your work on top of the latest changes
git rebase upstream/master

## If you have conflicts, fix them in your editor, then do
git add [conflicted files]
git rebase --continue

# Push it up.
git push origin feat(my-awesome-feature)
```
