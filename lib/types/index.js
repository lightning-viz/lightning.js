'use strict';

var _  = require('lodash');
var fs = require('fs');
var bulk = require('bulk-require');
var sections = bulk(__dirname, ['*.js']);

var exports = {};

// loop over all the other files in this directory
// and grab their module.exports. note this 
// does NOT check for name collisions
fs.readdirSync(__dirname).forEach(function (file) {
    if (~file.indexOf('.js') && file.indexOf('index.js') < 0) {

        var types = require('./' + file);
        _.each(types, function(val, key) {
            exports[key] = val;
        });
    }
});


module.exports = exports;

