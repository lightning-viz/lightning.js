'use strict';

var _ = require('lodash');
var utils = require('../utils');
var Base = require('./base');
var cleaner = utils.cleaner;

module.exports = {

    lineStreaming: function() {
        var options = _.extend(Base.options, {
            maxWidth: true,
            zoom: true
        });

        var additionalFields = {
            index: utils.checkers.array,
            color: utils.checkers.arrayOfTuples,
            label: utils.checkers.array,
            size: utils.checkers.singletonOrArray,
            xaxis: utils.checkers.string,
            yaxis: utils.checkers.string
        };

        var clean = cleaner(options, additionalFields);

        return function(series, additionalData) {
            var cleaned = clean(additionalData);
            return {
                data: _.extend(cleaned.data, {
                    series: series
                }),
                options: cleaned.options
            };
        };
    },

    scatterStreaming: function() {
        var options = _.extend(Base.options, {
            zoom: true,
            tooltips: true,
            brush: true
        });

        var additionalFields = {
            color: utils.checkers.arrayOfTuples,
            labels: utils.checkers.array,
            group: utils.checkers.singletonOrArray,
            value: utils.checkers.singletonOrArray,
            size: utils.checkers.singletonOrArray,
            alpha: utils.checkers.singletonOrArray,
            colormap: utils.checkers.string,
            xaxis: utils.checkers.string,
            yaxis: utils.checkers.string
        };

        var clean = cleaner(options, additionalFields);

        return function(x, y, additionalData) {
            var cleaned = clean(additionalData);
            return {
                data: _.extend(cleaned.data, {
                    points: _.zip(x, y)
                }),
                options: cleaned.options
            };
        };
    },

};

