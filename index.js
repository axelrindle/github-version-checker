#!/usr/bin/env node
'use strict'

// register coffee-script
require('coffee-script/register')

// export lib
module.exports = require('./lib/main.coffee')
