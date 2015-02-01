'use strict';

module.exports = {

    image: function(imageData) {
        return {
            images: [imageData]
        };
    },

    gallery: function(imageDataArray) {
        return {
            images: imageDataArray
        };
    }

};

