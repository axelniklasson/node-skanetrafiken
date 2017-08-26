var request = require('request');
var config = require('./config');

var querystation = require('./endpoints/querystation');
var querypage = require('./endpoints/querypage');
var neareststation = require('./endpoints/neareststation');
var stationresults = require('./endpoints/stationresults');
var trafficmeans = require('./endpoints/trafficmeans');
var resultspage = require('./endpoints/resultspage');
var journeypath = require('./endpoints/journeypath');

function validate(func, opts, cb, emptyOptsOk) {
    if (opts && cb && typeof cb === 'function' && !emptyOptsOk) {
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
        } else if (opts && !emptyOptsOk) {
            if (typeof opts === 'function') {
                return opts(null, 'Please provide options object as a primary parameter and then the callback. Check the docs.');
            }
        } else if (!opts && emptyOptsOk) {
            return func(cb);
        }
    }
}

module.exports = {
    findStop: function(opts, cb) {
        return validate(querystation.findStop, opts, cb, false);
    },
    findStartAndStop: function(opts, cb) {
        return validate(querypage.findStartAndStop, opts, cb, false);
    },
    findNearestStops: function(opts, cb) {
        return validate(neareststation.findNearestStops, opts, cb, false);
    },
    getDepartures: function(opts, cb) {
        return validate(stationresults.getDepartures, opts, cb, false);
    },
    getTrafficMeans: function(cb) {
        return validate(trafficmeans.getTrafficMeans, null, cb, true);
    },
    getJourneys: function(opts, cb) {
        return validate(resultspage.getJourneys, opts, cb, false);
    },
    getJourneyPath: function(opts, cb) {
        return validate(journeypath.getJourneyPath, opts, cb, false);
    }
};
