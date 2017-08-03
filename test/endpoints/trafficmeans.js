var chai = require('chai');
var expect = chai.expect;
var nodeSkanetrafiken = require('../../lib/node_skanetrafiken');

/* getTrafficMeans */
describe('Get traffic means without options', function() {
    it('Should successfully return traffic means', function(done) {
        nodeSkanetrafiken.getTrafficMeans(function(results, err) {
            expect(results).to.not.be.empty;
            expect(err).to.be.null;
            done();
        });
    });
});

