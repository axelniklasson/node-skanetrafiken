var request = require('request');
var config = require('./config');
var stops = require('./stops');

module.exports = {
    findStop: function(name) {
        return stops.findStop(name);
    },
    findStartAndStop: function(from, to) {
        return stops.findStartAndStop(from, to);
    }
};
