'use strict';
var _ = require('lodash');
var utils = require('../utils');
var Base = require('./base');
var singletonOrArray = utils.checkers.singletonOrArray;
var cleaner = utils.cleaner;

module.exports = {

    image: function() {

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
    
    imagePoly: function() {

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

    gallery: function() {
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

