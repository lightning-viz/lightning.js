'use strict';

var _ = require('lodash');

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
    }
};
