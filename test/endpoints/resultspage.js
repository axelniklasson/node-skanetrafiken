var chai = require('chai');
var expect = chai.expect;
var nodeSkanetrafiken = require('../../lib/node_skanetrafiken');

/* getJourneys */
describe('Find journeys with correct parameters', function() {
    it('should successfully return journeys matching the query', function(done) {
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
    it('should successfully return journeys matching the query', function(done) {
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
    it('should fail to return journeys matching the query', function(done) {
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
    it('should fail tp return journeys matching the query', function(done) {
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
