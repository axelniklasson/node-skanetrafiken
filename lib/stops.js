var request = require('request');
var xmlParser = require('xml2js');
var config = require('./config');

/*
* Module containing all wrapper methods related to stops.
*/
module.exports = {
    /*
    * Finds all stops matching name.
    *
    * @param name string : string matching desired stop
    * @param cb function : callback function
    *
    * @returns an array of stops
    */
    findStop: function(opts, cb) {
        if (opts.name && typeof cb === 'function') {
            var reqString = config.baseURL + '/querystation.asp?inpPointfr=' + encodeURIComponent(opts.name);

            request(reqString, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    if (config.returnXML) {
                        return cb(body, null);
                    } else {
                        xmlParser.parseString(body, function (err, result) {
                            if (!err && result) {
                                return cb(result['soap:Envelope']['soap:Body'][0]['GetStartEndPointResponse'][0]['GetStartEndPointResult'][0]['StartPoints'][0]['Point'], null);
                            } else {
                                return cb(null, error);
                            }
                        });
                    }
                } else {
                    return cb(null, error);
                }
            });
        } else {
            return cb(null, 'Parameter name must be specified.');
        }
    },

    /*
    * Finds all department and arrival stops matching from and to.
    *
    * @param from string : string matching department stop
    * @param to string : string matching arrival stop
    * @param cb function : callback function
    *
    * @returns an array of from- and to-stops
    */
    findStartAndStop: function(opts, cb) {
        if (opts.from && opts.to && typeof cb === 'function') {
            var reqString = config.baseURL + '/querypage.asp?inpPointfr=' + encodeURIComponent(opts.from)
            + '&inpPointTo=' + encodeURIComponent(opts.to);

            request(reqString, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    if (config.returnXML) {
                        return cb(body, null)
                    } else {
                        xmlParser.parseString(body, function (err, result) {
                            if (!err && result) {
                                var resultObj = { from: [], to: [] };
                                resultObj.from = result['soap:Envelope']['soap:Body'][0]['GetStartEndPointResponse'][0]['GetStartEndPointResult'][0]['StartPoints'][0]['Point'];
                                resultObj.to = result['soap:Envelope']['soap:Body'][0]['GetStartEndPointResponse'][0]['GetStartEndPointResult'][0]['EndPoints'][0]['Point'];
                                return cb(resultObj, null);
                            } else {
                                return cb(null, error);
                            }
                        });
                    }

                } else {
                    return cb(null, error);
                }
            });
        } else {
            return cb(null, 'Parameters from and to must be specified.');
        }
    },

    /*
    * Finds all department and arrival stops within circle of a specified radius,
    * where center point of circle is specified
    *
    * @param x int : x coordinate in RT 90 system
    * @param x int : x coordinate in RT 90 system
    * @param radius int : radius in meters (optional)
    * @param cb function : callback function
    *
    * @returns an array of the nearest stops
    */
    findNearestStops: function(opts, cb) {
        if (opts.x && opts.y) {
            var reqString = config.baseURL + '/neareststation.asp?x=' + encodeURIComponent(opts.x)
            + '&y=' + encodeURIComponent(opts.y);

            if (opts.radius) {
                reqString += '&radius=' + encodeURIComponent(opts.radius);
            }

            request(reqString, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    if (config.returnXML) {
                        return cb(body, null);
                    } else {
                        xmlParser.parseString(body, function (err, result) {
                            if (!err && result) {
                                return cb(result['soap:Envelope']['soap:Body'][0]['GetNearestStopAreaResponse'][0]['GetNearestStopAreaResult'][0]['NearestStopAreas'][0]['NearestStopArea'], null);
                            } else {
                                return cb(null, err);
                            }
                        });
                    }

                } else {
                    return cb(null, error);
                }
            });
        } else {
            return cb(null, 'Parameters x and y must be specified.');
        }
    },

    /*
    * Finds all departures from a specified stop
    *
    * @param stopID int : id of the stop
    * @param inpDate date :	date for departure yymmdd (optional)
    * @param inpTime time :	time for departure hhmm (optional)
    * @param selDirection int :	direction - 0 for departures, 1 for arrivals (optional)
    * @param cb function : callback function
    *
    * @returns an array of departures from the specified stop
    */
    getDepartures: function(opts, cb) {
        if (opts.stopID) {
            var reqString = config.baseURL + '/stationresults.asp?selPointFrKey=' + encodeURIComponent(opts.stopID);

            if (opts.date && opts.time) {
                reqString += '&inpDate=' + encodeURIComponent(opts.date) + '&inpTime=' + encodeURIComponent(opts.time);
            }

            request(reqString, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    if (config.returnXML) {
                        return cb(body, null);
                    } else {
                        xmlParser.parseString(body, function (err, result) {
                            if (!err && result) {
                                return cb(result['soap:Envelope']['soap:Body'][0]['GetDepartureArrivalResponse'][0]['GetDepartureArrivalResult'][0]['Lines'][0].Line, null);
                            } else {
                                return cb(null, err);
                            }
                        });
                    }

                } else {
                    return cb(null, error);
                }
            });
        } else {
            return cb(null, 'Parameter stopID must be specified.');
        }
    }
};
