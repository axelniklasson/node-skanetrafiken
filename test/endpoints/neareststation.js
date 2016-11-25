var chai = require('chai');
var expect = chai.expect;
var nodeSkanetrafiken = require('../../lib/node_skanetrafiken');

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

