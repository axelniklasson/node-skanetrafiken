var request = require('request');
var config = require('./config');

var querystation = require('./endpoints/querystation');
var querypage = require('./endpoints/querypage');
var neareststation = require('./endpoints/neareststation.js');
var stationresults = require('./endpoints/stationresults.js');

function validate(func, opts, cb) {
    if (opts && cb && typeof cb === 'function') {
        if (Object.keys(opts).length === 0) {
            return cb(null, 'Options object can not be empty.');
        }

        return func(opts, cb);
    } else {
        // Something wrong with the call
        if (opts && cb) {
            if (typeof opts === 'function') {
                return opts(null, 'Please provide options object as a primary parameter and then the callback. Check the docs.');
            } else if (typeof opts !== 'function' && typeof cb !== 'function') {
                return 'Please provide options object as a primary parameter and then the callback. Check the docs.'; // Cant call callback, since it is not a function. Just end it here.
            }
        } else if (opts) {
            if (typeof opts === 'function') {
                return opts(null, 'Please provide options object as a primary parameter and then the callback. Check the docs.');
            }
        }
    }
}

module.exports = {
    findStop: function(opts, cb) {
        return validate(querystation.findStop, opts, cb);
    },
    findStartAndStop: function(opts, cb) {
        return validate(querypage.findStartAndStop, opts, cb);
    },
    findNearestStops: function(opts, cb) {
        return validate(neareststation.findNearestStops, opts, cb);
    },
    getDepartures: function(opts, cb) {
        return validate(stationresults.getDepartures, opts, cb);
    }
};
