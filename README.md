[![Stories in Ready](https://badge.waffle.io/rangle/rangle-starter.png?label=ready&title=Ready)](https://waffle.io/rangle/rangle-starter)
# rangle-starter

A command-line utility to create a repo based on one of Rangle.io's standard tech stacks.

These stacks are designed to play nice with Rangle.io's dev ops tools and internal
workflow. However they are open source and available to the community on an
unsupported basis as well.

## Installation

Install it like this:

```
npm install -g rangle-starter
```

## Usage

First, create a repository for your new project on github. Leave it empty for
now.

Next, run `rangle-starter` and answer the questions in order to setup your new project.

This will create a new repo locally based on the appropriate tech stack.
`npm install; npm start` will build and run the sample app for that stack.

Push up your new repo with:

```sh
git push upstream master -u
```

Finally, go back to GitHub and fork your new repo to allow you to work using
Rangle-Flow (see note below).

## Options

Currently supported tech stacks are:

### react-redux-starter
(based on https://github.com/rangle/react-redux-starter)

React, redux, babel, webpack and associated utilities.

Demo app: https://react-redux-starter.herokuapp.com

### typescript-react-redux-starter
(based on https://github.com/rangle/typescript-react-redux-starter)

React, redux, typescript, webpack and associated utilities.

Demo app: https://typescript-react-redux-starter.herokuapp.com

### angular2-starter

(based on https://github.com/rangle/angular2-starter)

Angular 2, typescript, webpack and associated utilities.


Demo app: https://angular2-starter-rangle.herokuapp.com

### angular2-redux-starter

(based on https://github.com/rangle/angular2-redux-starter)

Angular 2, redux, typescript, webpack and associated utilities.

Demo app: https://angular2-redux-starter.herokuapp.com

### angular-redux-starter

(based on https://github.com/rangle/angular-redux-starter)

Angular 1.x, redux, typescript, webpack and associated utilities.

Demo app: https://angular-redux-starter.herokuapp.com

## A note on Rangle-flow

At Rangle.io we use a fork-and-branch strategy for pull requests, with some
modifications for our internal tooling.  Repos set up using this script assume
that your have a central repo for the team and developers work on personal forks.

Therefore the script sets up two remotes:

`origin`, which points to your personal fork, and `upstream`, which points to
a team repo which typically belongs your github organization.

If you want to change this, just fiddle with `git remote` after running the
script.
