'use strict';

var _ = require('lodash');

module.exports = {

    lineStreaming: function(series, additionalData) {
        return {
            data: _.extend(additionalData || {}, {
                series: series
            })
        };
    },

    scatterStreaming: function(x, y, additionalData) {
        return {
            data: _.extend(additionalData || {}, {
                points: _.zip(x, y)
            })
        };
    },

};

