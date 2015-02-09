'use strict';

var _ = require('lodash');
var rp = require('request-promise');

function Visualization(lightning, id) {
    if (!(this instanceof Visualization)) {
        return new Visualization(lightning, id);
    }

    this.lightning = lightning;
    this.id = id;
}


module.exports = Visualization;


Visualization.prototype.appendData = function(data) {
    return rp({
        uri: this._getUrl(),
        method: 'POST',
        json: {
            data: data
        },
        auth: this.lightning.auth
    });
};


Visualization.prototype.updateData = function(data) {
    return rp({
        uri: this._getUrl(),
        method: 'PUT',
        json: {
            data: data
        },
        auth: this.lightning.auth
    });
};


Visualization.prototype.updateImage = function(imageData) {

    
    return rp({
        uri: this._getUrl() + '/images',
        method: 'PUT',
        auth: this.lightning.auth,
        formData: {
            files: [imageData]
        }
    });
};

Visualization.prototype.appendImage = function(imageData) {
    return rp({
        uri: this._getUrl() + '/images',
        method: 'POST',
        auth: this.lightning.auth,
        formData: {
            files: [imageData]
        }
    });
};



Visualization.prototype._getUrl = function() {
    return this.lightning.host + '/sessions/' + this.lightning.session + '/visualizations/' + this.id + '/data';
}