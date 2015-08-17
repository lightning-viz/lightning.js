'use strict';

var _ = require('lodash');

var singletonOrArray = function(s) {
    if(_.isArray(s)) {
        return s;
    } else {
        return [s];
    }
};

module.exports = {
    matrixToLinks: function(mat) {
        var links = [];
        _.each(mat, function(row, i) {
            _.each(row, function(cell, j) {
                if(cell !== 0) {
                    links.push([i, j, cell]);
                }
            });
        });

        return links;
    },

    listToRegions: function(l) {
        if(_.isString(l)) {
            return [l];
        }

        var lengthChecker = function(n) {
            return function(s) {
                return s.length === n;
            };
        };

        if(!_.every(l, lengthChecker(2)) && !_.every(l, lengthChecker(3))) {
            throw new Error('All region names must be two letters (for US) or three letters (for world)');
        }

        return l;
    },

    checkers: {
        singletonOrArray: singletonOrArray,
        arrayOfTuples: function(d) {
            if(_.isArray(d) && d.length) {
                if(_.isArray(d[0])) {
                    return d;
                }
                return [d];
            }
            console.warn('Warning! Could not parse this data value: ');
            console.warn(d);
            return d;
        },

        string: function(d) {
            if(_.isString(d)) {
                return d;
            }
            console.warn('Warning! Expected a string and got: ');
            console.warn(d);
        },

        array: function(d) {
            if(_.isArray(d)) {
                return d;
            }
            console.warn('Warning! Expected a string and got: ');
            console.warn(d);
        }
    },

    cleaner: function(options, additionalFields) {
        return function(additionalData) {
            var opts = {};
            additionalData = additionalData || {};
            _.each(additionalData, function(val, key) {
                if(_.has(options, key)) {
                    opts[key] = val;
                    delete additionalData[key];
                }
            });


            var filteredData = _.pick(additionalData, _.keys(additionalFields));
            additionalData = _.object(_.keys(filteredData), _.map(filteredData, function(val, key) {
                if(_.isFunction(additionalFields[key])) {
                    return additionalFields[key](val);
                }
                return val;
            }));

            return {
                data: additionalData,
                options: opts
            };
        };
    }
};
