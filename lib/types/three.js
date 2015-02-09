'use strict';

var _ = require('lodash');

module.exports = {

    scatter3: function(x, y, z, additionalData) {
        return {
            data: _.extend(additionalData || {}, {
                points: _.zip(x, y, z)
            })
        };
    },

    volume: function(imageData) {
        return {
            images: _.isArray(imageData) ? imageData : [imageData]
        };
    },

};

