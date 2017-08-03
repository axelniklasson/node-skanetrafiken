var chai = require('chai');
var expect = chai.expect;
var nodeSkanetrafiken = require('../../lib/node_skanetrafiken');

/* getDepartures */
describe('Find departures from a given stop.', function() {
    it('Should successfully return upcoming departures, all from specified stop', function(done) {
        nodeSkanetrafiken.getDepartures({ stopID: 90042 }, function(results, err) {
            expect(results).to.not.be.null;
            expect(err).to.be.null;
            done();
        });
    });
});

describe('Find departures from a given stop, without specifying stopID.', function() {
    it('Should fail, since stopID is a mandatory parameter', function(done) {
        nodeSkanetrafiken.getDepartures({ foo: 'bar' }, function(results, err) {
            expect(results).to.be.null;
            expect(err).to.not.be.null;
            expect(err).to.equal('Parameter stopID must be specified.');
            done();
        });
    });
});

describe('Find departures from a given stop, when specifying date and time.', function() {
    it('Should return departures from a given stop, matching date and time', function(done) {
        nodeSkanetrafiken.getDepartures({ stopID: 90042, date: '170802', time: '1337' }, function(results, err) {
            expect(results).to.not.be.null;
            expect(err).to.be.null;
            done();
        });
    });
});

describe('Find departures from a given stop, when specifying date but not time.', function() {
    it('Should fail, since date and time both need to be specified if one is', function(done) {
        nodeSkanetrafiken.getDepartures({ stopID: 90042, date: '170802' }, function(results, err) {
            expect(results).to.be.null;
            expect(err).to.not.be.null;
            expect(err).to.equal('Parameters date and time must both be present.');
            done();
        });
    });
});

describe('Find departures from a given stop, when specifying time but not date.', function() {
    it('Should fail, since date and time both need to be specified if one is', function(done) {
        nodeSkanetrafiken.getDepartures({ stopID: 90042, time: '1337' }, function(results, err) {
            expect(results).to.be.null;
            expect(err).to.not.be.null;
            expect(err).to.equal('Parameters date and time must both be present.');
            done();
        });
    });
});

describe('Find arrivals from a given stop', function() {
    it('Should return arrivals from given stop', function(done) {
        nodeSkanetrafiken.getDepartures({ stopID: 90042, arrivals: true }, function(results, err) {
            expect(results).to.not.be.null;
            expect(err).to.be.null;
            done();
        });
    });
});
