#!/usr/bin/env node

const inquire = require('./src/inquire');
const execute = require('./src/execute');

inquire().then(execute);
