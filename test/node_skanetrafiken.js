var chai = require('chai');
var expect = chai.expect;
var nodeSkanetrafiken = require('../lib/node_skanetrafiken');

/* validate */
describe('Call a random function in the API with correct parameters', function(done) {
    it('should be validated and successfully return data', function(done) {
        nodeSkanetrafiken.findStop({ name: 'Kristianstad' }, function(results, err) {
            expect(results).to.not.be.null;
            expect(err).to.be.null;
            done();
        });
    });
});

describe('Call a random function in the API without correct parameters', function(done) {
    it('should not be validated', function(done) {
        nodeSkanetrafiken.findStop(function(results, err) {
            expect(results).to.be.null;
            expect(err).to.equal('Please provide options object as a primary parameter and then the callback. Check the docs.');
            done();
        });
    });
});

describe('Call a random function in the API with options parameter empty in wrong order', function(done) {
    it('should not be validated', function(done) {
        nodeSkanetrafiken.findStop({}, function(results, err) {
            expect(results).to.be.null;
            expect(err).to.equal('Options object can not be empty.');
            done();
        });
    });
});

describe('Call a random function in the API with correct parameters, but in wrong order', function(done) {
    it('should not be validated', function(done) {
        nodeSkanetrafiken.findStop(function(results, err) {
            expect(results).to.be.null;
            expect(err).to.equal('Please provide options object as a primary parameter and then the callback. Check the docs.');
            done();
        }, { name: 'Kristianstad' });
    });
});

describe('Call a random function in the API with options parameter empty in wrong order', function(done) {
    it('should not be validated', function(done) {
        nodeSkanetrafiken.findStop(function(results, err) {
            expect(results).to.be.null;
            expect(err).to.equal('Please provide options object as a primary parameter and then the callback. Check the docs.');
            done();
        }, {});
    });
});

describe('Call a random function in the API with two objects as parameters', function() {
    it('should not be validated', function() {
        expect(nodeSkanetrafiken.findStop({}, {})).to.equal('Please provide options object as a primary parameter and then the callback. Check the docs.');
    });
});
