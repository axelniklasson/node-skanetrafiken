var chai = require('chai');
var expect = chai.expect;
var nodeSkanetrafiken = require('../../lib/node_skanetrafiken');

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

