/*global describe, it, done, before */
'use strict';
var expect = require('expect.js');
var Lightning = require('../');
var Visualization = require('../lib/visualization');
var fs = require('fs');
var _ = require('lodash');


describe('lightningjs node module', function () {

    var lightning;

    before(function(done) {
        lightning = new Lightning();
        done();
    });


    it('should instantiate a Lightning object', function (done) {
        expect(lightning).to.be.a(Lightning);
        done();
    });


    it('should plot a line', function(done) {
        lightning
            .line([1,1,2,3,5,8,13,21])
            .then(function(viz) {
                expect(viz).to.be.a(Visualization);
                expect(viz.id).to.not.be(null);
                done();
            });
    });

    it('should plot a matrix', function(done) {

        var mat = _.map(_.range(100), function() {
            return _.map(_.range(100), function() {
                return Math.random();
            });
        });

        lightning
            .matrix(mat)
            .then(function(viz) {
                expect(viz).to.be.a(Visualization);
                expect(viz.id).to.not.be(null);
                done();
            });
    });

    it.only('should plot a stacked line plot', function(done) {

        var series = _.map(_.range(5), function() {
            return _.map(_.range(20), function() {
                return Math.random();
            });
        });

        lightning
            .lineStacked(series)
            .then(function(viz) {
                expect(viz).to.be.a(Visualization);
                expect(viz.id).to.not.be(null);
                done();
            });
    });

    it('should work with an existing session', function(done) {
        lightning.session = 1;
        lightning
            .line([1,1,2,3,5,8,13,21])
            .then(function(viz) {
                expect(viz).to.be.a(Visualization);
                expect(viz.id).to.not.be(null);
                done();
            });
    });

    it('should create a session', function(done) {
        var sessionName = 'test-session';
        lightning.createSession(sessionName)
            .then(function(sessionId) {
                expect(lightning.session).to.be(sessionId);
                done();
            });
    });


    it('should upload an image', function(done) {

        lightning.image(fs.createReadStream(__dirname + '/img/example.png'))
            .then(function(viz) {
                expect(viz).to.be.a(Visualization);
                done();
            });
    });

    it('should upload a gallery', function(done) {

        lightning.gallery([fs.createReadStream(__dirname + '/img/example.png'), fs.createReadStream(__dirname + '/img/example2.png')])
            .then(function(viz) {
                expect(viz).to.be.a(Visualization);
                done();
            });
    });

});
