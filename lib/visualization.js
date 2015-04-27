'use strict';

var _ = require('lodash');
var rp = require('request-promise');
var open = require('open');

function Visualization(lightning, id, formatter) {
    if (!(this instanceof Visualization)) {
        return new Visualization(lightning, id);
    }

    this.lightning = lightning;
    this.id = id;
    this.formatter = formatter || function() { return Array.prototype.slice.call(arguments); };
}


module.exports = Visualization;


Visualization.prototype.appendData = function() {
    var output = this.formatter.apply(null, arguments);
    return rp({
        uri: this._getUrl() + '/data',
        method: 'POST',
        json: {
            data: output.data
        },
        auth: this.lightning.auth,
        withCredentials: !_.isNull(this.lightning.auth)
    });
};


Visualization.prototype.updateData = function() {
    var output = this.formatter.apply(null, arguments);
    return rp({
        uri: this._getUrl(),
        method: 'PUT',
        json: {
            data: output.data
        },
        auth: this.lightning.auth,
        withCredentials: !_.isNull(this.lightning.auth)
    });
};


Visualization.prototype.updateImage = function() {
    var output = this.formatter.apply(null, arguments);
    return rp({
        uri: this._getUrl() + '/images',
        method: 'PUT',
        auth: this.lightning.auth,
        withCredentials: !_.isNull(this.lightning.auth),
        formData: {
            files: output.images
        }
    });
};

Visualization.prototype.appendImage = function() {
    var output = this.formatter.apply(null, arguments);
    return rp({
        uri: this._getUrl() + '/images',
        method: 'POST',
        auth: this.lightning.auth,
        withCredentials: !_.isNull(this.lightning.auth),
        formData: {
            files: output.images
        }
    });
};



Visualization.prototype.open = function() {
    if(_.isFunction(open)) {
        return open(this._getPermalinkUrl());    
    } else {
        console.warn('Cannot call open() from client-side javascript');
    }
    
};


Visualization.prototype._getPermalinkUrl = function() {
    return this.lightning.host + '/visualizations/' + this.id;
}

Visualization.prototype._getUrl = function() {
    return this.lightning.host + '/sessions/' + this.lightning.session + '/visualizations/' + this.id + '/data';
}

Visualization.prototype.getEmbedLink = function() {
    return this._getPermalinkUrl() + '/embed';
}

Visualization.prototype.getPymLink = function() {
    return this._getPermalinkUrl() + '/pym';
}

Visualization.prototype.getIframeLink = function() {
    return this._getPermalinkUrl() + '/iframe';
}

Visualization.prototype.getPublicLink = function() {
    return this._getPermalinkUrl() + '/public';
}

Visualization.prototype.getHTML = function() {
    return rp({
        uri: this.getEmbedLink(),
        method: 'GET',
        auth: this.lightning.auth,
        withCredentials: !_.isNull(this.lightning.auth)
    });
}

