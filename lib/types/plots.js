'use strict';
var _ = require('lodash');

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
                x: x,
                y: y
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
    }

};

