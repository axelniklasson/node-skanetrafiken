var chai = require('chai');
var expect = chai.expect;
var nodeSkanetrafiken = require('../../lib/node_skanetrafiken');

/* getJourneyPath- dummy tests for now */
describe('Get journeypath with correct parameters', function() {
    it('Should successfully (if the API will start working) return journeypath matching the query', function(done) {
        nodeSkanetrafiken.getJourneyPath({ journeyKey: '13632115750062105252600390800220033', sequenceNo: '0' }, function(results, err) {
            expect(results).to.not.be.null;
            expect(err).to.be.null;
            done();
        });
    });
});

describe('Get journeypath without correct parameters', function() {
    it('Should fail to return journeypath', function(done) {
        nodeSkanetrafiken.getJourneyPath({ sequenceNo: 0 }, function(results, err) {
            expect(results).to.be.null;
            expect(err).to.equal('Parameters journeyKey and sequenceNo must be specified.');
            done();
        });
    });
});
