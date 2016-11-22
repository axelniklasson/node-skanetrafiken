var chai = require('chai');
var expect = chai.expect;
var nodeSkanetrafiken = require('../lib/skanetrafiken');

/* findStop */
describe('Find stop by name with correct parameters', function() {
    it('should successfully return stops matching the query', function(done) {
        nodeSkanetrafiken.findStop('Kristianstad', function(results, err) {
            expect(results).to.not.be.empty;
            done();
        });
    });
});

describe('Find stop by name with empty query', function() {
    it('should return null, since query was empty', function(done) {
        nodeSkanetrafiken.findStop('', function(results, err) {
            expect(results).to.be.null;
            done();
        });
    });
});

/* findStartAndStop */
describe('Find starts and stops by names with correct parameters', function() {
    it('should successfully return starts and stops matching the query', function(done) {
        nodeSkanetrafiken.findStartAndStop('Kristianstad', 'Lund', function(results, err) {
            expect(results).to.not.be.empty;
            done();
        });
    });
});

describe('Find stop by name with empty query', function() {
    it('should return null, since query was empty', function(done) {
        nodeSkanetrafiken.findStartAndStop('', '', function(results, err) {
            expect(results).to.be.null;
            done();
        });
    });
});

/* findNearestStops */
describe('Find nearest stops by names with correct parameters', function() {
    it('should successfully return nearest', function(done) {
        nodeSkanetrafiken.findNearestStops(6167930, 1323215, 500, function(results, err) {
            expect(results).to.not.be.empty;
            done();
        });
    });
});

describe('Find nearest stops by names with correct parameters', function() {
    it('should successfully return nearest stops', function(done) {
        nodeSkanetrafiken.findNearestStops(6167930, 1323215, function(results, err) {
            expect(results).to.not.be.empty;
            done();
        });
    });
});

describe('Find stop by name with empty query', function() {
    it('should return null, since query was empty', function(done) {
        nodeSkanetrafiken.findStartAndStop(0, 0, function(results, err) {
            expect(results).to.be.null;
            done();
        });
    });
});

describe('Find nearest stops within specified radius', function() {
    it('should successfully return nearest stops, all within specified radius', function(done) {
        nodeSkanetrafiken.findNearestStops(6167930, 1323215, 500, function(results, err) {
            for (var i = 0; i < results.length; i++) {
                expect(results[i].Distance).to.be.most(500);
            }
            done();
        });
    });
});
