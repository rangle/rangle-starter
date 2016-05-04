#!/usr/bin/env node

'use strict';

const inquire = require('./src/inquire');
const execute = require('./src/execute');

inquire().then(execute);
