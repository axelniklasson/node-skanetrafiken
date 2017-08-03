var chai = require('chai');
var expect = chai.expect;
var nodeSkanetrafikenConfig = require('../lib/config');

/* baseURL */
describe('Get baseURL for API', function() {
    it('Should return correct baseURL', function() {
        expect(nodeSkanetrafikenConfig).to.not.be.empty;
        expect(nodeSkanetrafikenConfig.baseURL).to.equal('http://www.labs.skanetrafiken.se/v2.2');
    });
});
