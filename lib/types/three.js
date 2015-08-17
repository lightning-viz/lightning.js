'use strict';

var _ = require('lodash');
var utils = require('../utils');
var Base = require('./base');
var singletonOrArray = utils.checkers.singletonOrArray;
var cleaner = utils.cleaner;

module.exports = {

    scatter3: function() {

        var options = _.extend(Base.options, {
            zoom: true,
            tooltips: true,
            brush: true
        });

        var additionalFields = {
            color: utils.checkers.arrayOfTuples,
            group: utils.checkers.singletonOrArray,
            size: utils.checkers.singletonOrArray,
            alpha: utils.checkers.singletonOrArray,
        };


        var clean = cleaner(options, additionalFields);

        return function(x, y, z, additionalData) {
            var cleaned = clean(additionalData);
            return {
                data: _.extend(cleaned.data, {
                    points: _.zip(x, y, z)
                }),
                options: cleaned.options
            };
        };
    },

    volume: function() {

        var options = _.extend(Base.options, {

        });
        var clean = cleaner(options);

        return function(imageData, additionalData) {
            var cleaned = clean(additionalData);

            return {
                images: singletonOrArray(imageData),
                options: cleaned.options
            }
        };
    },

};

