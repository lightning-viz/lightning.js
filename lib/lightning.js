'use strict';

/**
 * Module dependencies
 */

var _ = require('lodash');
var rp = require('request-promise');
var slashes = require('remove-trailing-slash');
var Promise = require('bluebird');
var Visualization = require('./visualization');
var paramCase = require('param-case');


function Lightning(options) {
    if (!(this instanceof Lightning)) {
        return new Lightning(options);
    }

    if(_.isString(options)) {
        options = {
            host: options
        };
    }

    options = _.defaults(options || {}, {
        host: 'http://localhost:3000',
        auth: null,
        session: null,
    });

    this.auth = options.auth;
    this.session = options.session;
    this.host = slashes(options.host);
}


Lightning.VERSION = require('../package.json').version;
module.exports = Lightning;


Lightning.prototype.createSession = function(name) {
    var self = this;
    var payload = (name) ? {name: name} : {};

    return rp({
        uri: this.host + '/sessions',
        method: 'POST',
        json: payload,
        auth: this.auth,
        withCredentials: !_.isNull(this.auth)
    }).then(function(response) {
        self.session = response.id;
        return response.id;
    });
};


Lightning.prototype.useSession = function(id) {
    this.session = id;  
};


Lightning.prototype.plot = function(type, data, images, options, formatter) {
    var self = this;

    return this._checkSession()
        .then(function() {
            var opts = {
                uri: self.host + '/sessions/' + self.session + '/visualizations',
                method: 'POST',
                auth: self.auth,
                withCredentials: !_.isNull(self.auth),
                type: type
            };

            if(images) {
                opts.formData = {
                    files: [_.first(images)],
                    type: type
                };

                return rp(opts).then(function(response) {
                    response = JSON.parse(response);
                    return new Visualization(self, response.id, formatter);
                }).then(function(viz) {
                    if(_.rest(images).length === 0) {
                        return viz;
                    }
                    return Promise.all(_.map(_.rest(images), function(imageData) {
                        return viz.appendImage(imageData);
                    })).then(function() {
                        return viz;
                    });
                });
            } else {

                opts.json = {
                    data: data,
                    type: type
                };

                return rp(opts).then(function(response) {
                    return new Visualization(self, response.id, formatter);
                }).catch(function(e) {
                    console.warn(e);
                }); 
            }
        }).catch(function(e) {
            console.warn(e);
        });
};


Lightning.prototype._checkSession = function() {
    if(_.isNull(this.session) || _.isUndefined(this.session)) {
        return this.createSession();
    }
    var deferred = Promise.pending();
    deferred.fulfill();
    return deferred.promise;
};


// Mimick a function decorator for all of the
// visualization types
var types = require('./types');
_.extend(Lightning.prototype, _.object(_.keys(types), _.map(types, function(f, type) {
    return function() {
        var output = f.apply(null, arguments);
        return this.plot(paramCase(type), output.data, output.images, output.options, f);
    };
})));
