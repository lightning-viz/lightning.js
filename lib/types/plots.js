'use strict';
var _ = require('lodash');
var utils = require('../utils');

module.exports = {

    line: function(series, additionalData) {
        return {
            data: _.extend(additionalData || {}, {
                series: series
            })
        };
    },

    scatter: function(x, y, additionalData) {
        return {
            data: _.extend(additionalData || {}, {
                points: _.zip(x, y)
            })
        };
    },

    matrix: function(mat, additionalData) {
        return {
            data: _.extend(additionalData || {}, {
                matrix: mat
            })
        };
    },

    lineStacked: function(series, additionalData) {
        return {
            data: _.extend(additionalData || {}, {
                series: series
            })
        };
    },

    adjacency: function(mat, additionalData) {
        return {
            data: _.extend(additionalData || {}, {
                links: utils.matrixToLinks(mat),
                nodes: _.range(mat.length)
            })
        };
    },

    force: function(mat, additionalData) {
        return {
            data: _.extend(additionalData || {}, {
                links: utils.matrixToLinks(mat),
                nodes: _.range(mat.length)
            })
        };
    },

    graph: function(x, y, mat, additionalData) {
        return {
            data: _.extend(additionalData || {}, {
                links: utils.matrixToLinks(mat),
                nodes: _.zip(x, y)
            })
        };
    },

    grapBundled: function(x, y, mat, additionalData) {
        return {
            data: _.extend(additionalData || {}, {
                links: utils.matrixToLinks(mat),
                nodes: _.zip(x, y)
            })
        };
    },

    map: function(regions, values, additionalData) {
        return {
            data: _.extend(additionalData || {}, {
                regions: utils.listToRegions(regions),
                values: values
            })
        };
    }

};

