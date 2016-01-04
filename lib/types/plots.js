'use strict';
var _ = require('lodash');
var utils = require('../utils');
var Base = require('./base');
var cleaner = utils.cleaner;

module.exports = {

    line: function() {
        var options = _.extend(Base.options, {
            zoom: true
        });

        var additionalFields = {
            index: utils.checkers.array,
            color: utils.checkers.arrayOfTuples,
            group: utils.checkers.array,
            thickness: utils.checkers.singletonOrArray,
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

    scatter: function() {
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

    matrix: function() {
        var options = _.extend(Base.options, {
            numbers: true
        });

        var additionalFields = {
            colormap: utils.checkers.string,
            rowLabels: utils.checkers.array,
            columnLabels: utils.checkers.array,
        };

        var clean = cleaner(options, additionalFields);

        return function(mat, additionalData) {

            var cleaned = clean(additionalData);
            return {
                data: _.extend(cleaned.data, {
                    matrix: mat
                }),
                options: cleaned.options
            };
        };
    },

    adjacency: function() {
        var options = _.extend(Base.options, {
            numbers: true,
            symmetric: true,
            sort: true
        });

        var additionalFields = {
            labels: utils.checkers.array,
            group: utils.checkers.singletonOrArray
        };

        var clean = cleaner(options, additionalFields);

        return function(mat, additionalData) {
            var cleaned = clean(additionalData);
            return {
                data: _.extend(cleaned.data, {
                    links: utils.matrixToLinks(mat),
                    nodes: _.range(mat.length)
                }),
                options: cleaned.options
            };
        };
    },

    force: function() {
        var options = _.extend(Base.options, {
            tooltips: true,
            zoom: true,
            brush: true
        });

        var additionalFields = {
            labels: utils.checkers.array,
            color: utils.checkers.arrayOfTuples,
            group: utils.checkers.singletonOrArray,
            colormap: utils.checkers.string,
            size: utils.checkers.singletonOrArray
        };

        var clean = cleaner(options, additionalFields);

        return function(mat, additionalData) {
            var cleaned = clean(additionalData);
            return {
                data: _.extend(cleaned.data, {
                    links: utils.matrixToLinks(mat),
                    nodes: _.range(mat.length)
                }),
                options: cleaned.options
            };
        };
    },

    graph: function() {
        var options = _.extend(Base.options, {
            tooltips: true,
            zoom: true,
            brush: true
        });

        var additionalFields = {
            labels: utils.checkers.array,
            color: utils.checkers.arrayOfTuples,
            group: utils.checkers.singletonOrArray,
            colormap: utils.checkers.string,
            size: utils.checkers.singletonOrArray
        };

        var clean = cleaner(options, additionalFields);

        return function(x, y, mat, additionalData) {
            var cleaned = clean(additionalData);
            return {
                data: _.extend(cleaned.data, {
                    links: utils.matrixToLinks(mat),
                    nodes: _.zip(x, y)
                }),
                options: cleaned.options
            };
        };
    },

    grapBundled: function() {
        var options = _.extend(Base.options, {
            tooltips: true,
            zoom: true,
            brush: true
        });

        var additionalFields = {
            labels: utils.checkers.array,
            color: utils.checkers.arrayOfTuples,
            group: utils.checkers.singletonOrArray,
            colormap: utils.checkers.string,
            size: utils.checkers.singletonOrArray
        };

        var clean = cleaner(options, additionalFields);

        return function(x, y, mat, additionalData) {
            var cleaned = clean(additionalData);
            return {
                data: _.extend(cleaned.data, {
                    links: utils.matrixToLinks(mat),
                    nodes: _.zip(x, y)
                }),
                options: cleaned.options
            };
        };
    },

    map: function() {
        var options = _.extend(Base.options, {

        });

        var additionalFields = {
            weights: utils.checkers.singletonOrArray,
            colormap: utils.checkers.string,
        };

        var clean = cleaner(options, additionalFields);

        return function(regions, values, additionalData) {
            var cleaned = clean(additionalData);
            return {
                data: _.extend(cleaned.data, {
                    regions: utils.listToRegions(regions),
                    values: values
                }),
                options: cleaned.options
            };
        };
    }

};
