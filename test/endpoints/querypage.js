var chai = require('chai');
var expect = chai.expect;
var nodeSkanetrafiken = require('../../lib/node_skanetrafiken');

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

