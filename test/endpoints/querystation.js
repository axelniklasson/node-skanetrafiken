var chai = require('chai');
var expect = chai.expect;
var nodeSkanetrafiken = require('../../lib/node_skanetrafiken');

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

