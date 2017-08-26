var chai = require('chai');
var expect = chai.expect;
var nodeSkanetrafiken = require('../../lib/node_skanetrafiken');

/* getJourneys */
describe('Find journeys with correct parameters', function() {
    it('Should successfully return journeys matching the query', function(done) {
        nodeSkanetrafiken.getJourneys({
            from: { name: 'Malmö', id: 80000, type: 0 },
            to: { name: 'Landskrona', id: 82000, type: 0 },
            action: 'search'
        }, function(results, err) {
            expect(results).to.not.be.empty;
            expect(err).to.be.null;
            done();
        });
    });
});

describe('Find journeys without correct from parameter', function() {
    it('Should successfully return journeys matching the query', function(done) {
        nodeSkanetrafiken.getJourneys({
            from: { name: 'Malmö', type: 0 },
            to: { name: 'Landskrona', id: 82000, type: 0 },
            action: 'search'
        }, function(results, err) {
            expect(results).to.be.null;
            expect(err).to.not.be.null;
            expect(err).to.equal('Invalid opts.from object. Should have properties name, id and type.');
            done();
        });
    });
});

describe('Find journeys without correct to parameter', function() {
    it('Should fail to return journeys matching the query', function(done) {
        nodeSkanetrafiken.getJourneys({
            from: { name: 'Malmö', id: 80000, type: 0 },
            to: { name: 'Landskrona', type: 0 },
            action: 'search'
        }, function(results, err) {
            expect(results).to.be.null;
            expect(err).to.not.be.null;
            expect(err).to.equal('Invalid opts.to object. Should have properties name, id and type.');
            done();
        });
    });
});

describe('Find journeys without correct action parameter', function() {
    it('Should fail to return journeys matching the query', function(done) {
        nodeSkanetrafiken.getJourneys({
            from: { name: 'Malmö', id: 80000, type: 0 },
            to: { name: 'Landskrona', id: 82000, type: 0 },
            action: 'something wrong'
        }, function(results, err) {
            expect(results).to.be.null;
            expect(err).to.not.be.null;
            expect(err).to.equal('Invalid opts.action. Valid values are one of search, next or previous.');
            done();
        });
    });
});

describe('Find journeys without date but not time', function() {
    it('Should fail because both date and time need to be present if one is', function(done) {
        nodeSkanetrafiken.getJourneys({
            from: { name: 'Malmö', id: 80000, type: 0 },
            to: { name: 'Landskrona', id: 82000, type: 0 },
            action: 'search',
            date: '170727'
        }, function(results, err) {
            expect(results).to.be.null;
            expect(err).to.not.be.null;
            expect(err).to.equal('Parameters date and time must both be present.');
            done();
        });
    });
});

describe('Find journeys with date and time', function() {
    it('Should successfully return journeys matching date and time', function(done) {
        nodeSkanetrafiken.getJourneys({
            from: { name: 'Malmö', id: 80000, type: 0 },
            to: { name: 'Landskrona', id: 82000, type: 0 },
            action: 'search',
            date: '170727',
            time: '1337'
        }, function(results, err) {
            expect(results).to.not.be.null;
            expect(err).to.be.null;
            done();
        });
    });
});

describe('Find journeys and limit result', function() {
    it('Should successfully return [limit] amount of journeys', function(done) {
        nodeSkanetrafiken.getJourneys({
            from: { name: 'Malmö', id: 80000, type: 0 },
            to: { name: 'Landskrona', id: 82000, type: 0 },
            action: 'search',
            limit: '2'
        }, function(results, err) {
            expect(results).to.not.be.null;
            expect(results).to.have.lengthOf(2);
            expect(err).to.be.null;
            done();
        });
    });
});

describe('Find journeys in specified transport mode', function() {
    it('Should successfully return journeys', function(done) {
        nodeSkanetrafiken.getJourneys({
            from: { name: 'Malmö', id: 80000, type: 0 },
            to: { name: 'Landskrona', id: 82000, type: 0 },
            action: 'search',
            transportMode: 16
        }, function(results, err) {
            expect(results).to.not.be.null;
            expect(err).to.be.null;
            done();
        });
    });
});

describe('Find journeys with missing parameters', function() {
    it('Should fail to return journeys', function(done) {
        nodeSkanetrafiken.getJourneys({ from: {} }, function(results, err) {
            expect(results).to.be.null;
            expect(err).to.equal('Invalid opts object. Should have objects from and to and action.');
            done();
        });
    });
});
