var request = require('request');
var config = require('./config');
var stops = require('./stops');

module.exports = {
    findStop: function(name, cb) {
        return stops.findStop(name, cb);
    },
    findStartAndStop: function(from, to, cb) {
        return stops.findStartAndStop(from, to, cb);
    },
    findNearestStops: function(x, y, radius, cb) {
        return stops.findNearestStops(x, y, radius, cb);
    }
};
