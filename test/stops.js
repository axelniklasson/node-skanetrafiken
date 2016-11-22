var chai = require('chai');
var expect = chai.expect;
var nodeSkanetrafiken = require('../lib/skanetrafiken');

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

describe('Find stop by name without', function() {
    it('should return null, since query was empty', function(done) {
        nodeSkanetrafiken.findStop(function(results, err) {
            expect(results).to.be.null;
            done();
        });
    });
});
