/*global describe, it, done, before */
'use strict';
var expect = require('expect.js');
var Lightning = require('../');
var Visualization = require('../lib/visualization');
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

    it('should plot a line-streaming', function(done) {
        lightning
            .lineStreaming([1,1,2,3,5,8,13,21])
            .then(function(viz) {
                expect(viz).to.be.a(Visualization);
                expect(viz.id).to.not.be(null);
                done();
            });
    });

    it('should plot a matrix', function(done) {

        var mat = _.map(_.range(10), function() {
            return _.map(_.range(10), function() {
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

    it('should plot a scatter', function(done) {

        var x = _.range(100);
        var y = _.map(_.range(100), Math.random);

        lightning
            .scatter(x, y)
            .then(function(viz) {
                expect(viz).to.be.a(Visualization);
                expect(viz.id).to.not.be(null);
                done();
            });
    });

    it('should plot a scatter with additional data', function(done) {

        var x = _.range(100);
        var y = _.map(_.range(100), Math.random);

        lightning
            .scatter(x, y, {
                color: [166, 24, 32],
                xaxis: 'test x axis label',
                yaxis: 'test y axis label'
            })
            .then(function(viz) {
                expect(viz).to.be.a(Visualization);
                expect(viz.id).to.not.be(null);
                done();
            }).catch(function (err) {
                console.log(err);
                done();
            });
    });

    it('should plot a scatter with additional data and options', function(done) {

        var x = _.range(100);
        var y = _.map(_.range(100), Math.random);

        lightning
            .scatter(x, y, {
                color: [166, 24, 32],
                xaxis: 'test x axis label',
                yaxis: 'test y axis label',
                zoom: false,
                tooltips: false
            })
            .then(function(viz) {
                expect(viz).to.be.a(Visualization);
                expect(viz.id).to.not.be(null);
                done();
            }).catch(function (err) {
                console.log(err);
                done();
            });
    });

    it('should plot a scatter-streaming', function(done) {

        var x = _.range(100);
        var y = _.map(_.range(100), Math.random);

        lightning
            .scatterStreaming(x, y)
            .then(function(viz) {
                expect(viz).to.be.a(Visualization);
                expect(viz.id).to.not.be(null);
                done();
            });
    });

    it('should plot a scatter3', function(done) {

        var x = _.range(100);
        var y = _.map(_.range(100), function() {
            return Math.random() * 100;
        });
        var z = _.map(_.range(100), function() {
            return Math.random() * 100;
        });

        lightning
            .scatter3(x, y, z)
            .then(function(viz) {
                expect(viz).to.be.a(Visualization);
                expect(viz.id).to.not.be(null);
                done();
            });
    });

    it('should plot a adjacency', function(done) {

        var mat = _.map(_.range(3), function(i) {
            return _.map(_.range(3), function(j) {
                return i * 3 + j;
            });
        });

        lightning
            .adjacency(mat)
            .then(function(viz) {
                expect(viz).to.be.a(Visualization);
                expect(viz.id).to.not.be(null);
                done();
            });
    });

    it('should plot a force', function(done) {

        var mat = _.map(_.range(13), function(i) {
            return _.map(_.range(13), function(j) {
                return i * 3 + j;
            });
        });

        lightning
            .force(mat)
            .then(function(viz) {
                expect(viz).to.be.a(Visualization);
                expect(viz.id).to.not.be(null);
                done();
            });
    });

    it('should plot a graph', function(done) {

        var mat = _.map(_.range(10), function(i) {
            return _.map(_.range(10), function(j) {
                return i * 3 + j;
            });
        });

        var x = _.range(10);
        var y = _.map(_.range(10), Math.random);

        lightning
            .graph(x, y, mat)
            .then(function(viz) {
                expect(viz).to.be.a(Visualization);
                expect(viz.id).to.not.be(null);
                done();
            });
    });

    it('should make a map', function(done) {

        var regions = ['NY', 'MI', 'NM'];
        var values = [0.33, 0.6, 0.07];

        lightning
            .map(regions, values)
            .then(function(viz) {
                expect(viz).to.be.a(Visualization);
                expect(viz.id).to.not.be(null);
                done();
            });
    });

    it('should not make a map', function(done) {

        var regions = ['NY', 'MI', 'USA'];
        var values = [0.33, 0.6, 0.07];
        try {
            lightning
                .map(regions, values);
        } catch(e) {
            expect(e.toString()).to.eql('Error: All region names must be two letters (for US) or three letters (for world)');
            done();
        }
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

});
