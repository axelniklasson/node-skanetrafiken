var chai = require('chai');
var expect = chai.expect;
var nodeSkanetrafiken = require('../lib/node_skanetrafiken');

/* findStop */
describe('Find stop by name with correct parameters', function() {
    it('should successfully return stops matching the query', function(done) {
        nodeSkanetrafiken.findStop({ name: 'Kristianstad' }, function(results, err) {
            expect(results).to.not.be.empty;
            expect(err).to.be.null;
            done();
        });
    });
});

describe('Find stop by name with wrong parameters', function() {
    it('should return error message, since query was empty', function(done) {
        nodeSkanetrafiken.findStop({ foo: 'bar' }, function(results, err) {
            expect(results).to.be.null;
            expect(err).to.equal('Parameter name must be specified.');
            done();
        });
    });
});

/* findStartAndStop */
describe('Find starts and stops by names with correct parameters', function() {
    it('should successfully return starts and stops matching the query', function(done) {
        nodeSkanetrafiken.findStartAndStop({ from: 'Kristianstad', to: 'Lund' }, function(results, err) {
            expect(results).to.not.be.empty;
            expect(err).to.be.null;
            done();
        });
    });
});

describe('Find starts and stops by name without to parameter', function() {
    it('should return error message, since parameters were wrong', function(done) {
        nodeSkanetrafiken.findStartAndStop({ from: 'Kristianstad' }, function(results, err) {
            expect(results).to.be.null;
            expect(err).to.equal('Parameters from and to must be specified.');
            done();
        });
    });
});

describe('Find starts and stops by name without from parameter', function() {
    it('should return error message, since parameters were wrong', function(done) {
        nodeSkanetrafiken.findStartAndStop({ to: 'Lund' }, function(results, err) {
            expect(results).to.be.null;
            expect(err).to.equal('Parameters from and to must be specified.');
            done();
        });
    });
});

describe('Find starts and stops by name without set parameters', function() {
    it('should return error message, since parameters were wrong', function(done) {
        nodeSkanetrafiken.findStartAndStop({ foo: 'bar', baz: 'qux' }, function(results, err) {
            expect(results).to.be.null;
            expect(err).to.equal('Parameters from and to must be specified.');
            done();
        });
    });
});

/* findNearestStops */
describe('Find nearest stops by names with correct parameters', function() {
    it('should successfully return nearest stops', function(done) {
        nodeSkanetrafiken.findNearestStops({ x: 6167930, y: 1323215, radius: 500 }, function(results, err) {
            expect(results).to.not.be.empty;
            expect(err).to.be.null;
            done();
        });
    });
});

describe('Find nearest stops by names without radius', function() {
    it('should successfully return nearest stops', function(done) {
        nodeSkanetrafiken.findNearestStops({ x: 6167930, y: 1323215 }, function(results, err) {
            expect(results).to.not.be.empty;
            expect(err).to.be.null;
            done();
        });
    });
});

describe('Find nearest stops within specified radius', function() {
    it('should successfully return nearest stops, all within specified radius', function(done) {
        nodeSkanetrafiken.findNearestStops({ x: 6167930, y: 1323215, radius: 500 }, function(results, err) {
            expect(results).to.not.be.empty;
            expect(err).to.be.null;
            for (var i = 0; i < results.length; i++) {
                expect(results[i].Distance).to.be.most(500);
            }
            done();
        });
    });
});

/* getDepartures */
describe('Find departures from a given stop.', function() {
    it('should successfully return upcoming departures, all from specified stop', function(done) {
        nodeSkanetrafiken.getDepartures({ stopID: 90042 }, function(results, err) {
            expect(results).to.not.be.null;
            expect(err).to.be.null;
            done();
        });
    });
});

describe('Find departures from a given stop, without specifying stopID.', function() {
    it('should fail, since stopID is a mandatory parameter', function(done) {
        nodeSkanetrafiken.getDepartures({ foo: 'bar' }, function(results, err) {
            expect(results).to.be.null;
            expect(err).to.not.be.null;
            expect(err).to.equal('Parameter stopID must be specified.');
            done();
        });
    });
});
